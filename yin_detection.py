import numpy as np

_CMNDF_cache_dict = {}
_DF_cache_dict = {} 
_ACF_cache_dict = {}

def clear_cache_dicts():
    global _CMNDF_cache_dict
    global _DF_cache_dict  
    global _ACF_cache_dict 

    _CMNDF_cache_dict.clear()
    _DF_cache_dict.clear() 
    _ACF_cache_dict.clear()
    
def ACF_cache(f, W, t, lag):
    if (t, lag) not in _ACF_cache_dict:
        _ACF_cache_dict[(t, lag)] = np.sum(f[t: t+W] * f[lag+t:lag+t+W])
    return _ACF_cache_dict[(t, lag)]


def DF_cache(f, W, t, lag):
    if (t, lag) not in _DF_cache_dict:
        _DF_cache_dict[(t, lag)] = ACF_cache(f, W, t, 0)+ACF_cache(f, W, t+lag, 0) - (2*ACF_cache(f, W, t, lag))
    return _DF_cache_dict[(t, lag)]


def CMNDF_cache(f, W, t, lag):
    if lag == 0:
        return 1
    if (lag, t) not in _CMNDF_cache_dict:
        _CMNDF_cache_dict[(lag, t)] = DF_cache(f, W, t, lag) / np.sum([DF_cache(f, W, t, j+1) for j in range(lag)])*lag
    return _CMNDF_cache_dict[(lag, t)]

def optimized_calculaitons(f, W, t, sample_rate, bounds, th=0.1, p_energy=0, p_freq=1):
    energy_array = np.array(f[t:t+W+bounds[1]+1]*f[t:t+W+bounds[1]+1], dtype=float).cumsum()
    energy_2_array = np.array([energy_array[W+i]-energy_array[i] for i in range(1,bounds[1]+1)]).cumsum()
    interes_signal = f[t:t+W+bounds[1]]
    autocorrelation = ss.correlate(interes_signal , interes_signal, mode='full', method='fft')[W+bounds[1]-1:] 
    autocorr_sum = autocorrelation[1:].cumsum()

    def calc_df(lag):
        return (energy_array[W] - energy_array[0]) + (energy_array[W+lag] - energy_array[lag]) - 2 * autocorrelation[lag] 
    
    def calc_dmndf(lag):
        return calc_df(lag) /  ((energy_array[W] - energy_array[0]) + energy_2_array[lag]/lag - 2 * autocorr_sum[lag]/lag) #[calc_df(1) + calc_df(2) + ... + calc_df(lag)]
    
    CMNDF_vals = [calc_dmndf(i) for i in range(*bounds)]
    sample = None
    for i, val in enumerate(CMNDF_vals):
        if val < th: # Get first sample below threshold (first octave)
            sample = i # Check for min near sample.
            subsample = sample
            max_samp = min(int(sample/0.8) - sample, len(CMNDF_vals)-sample-1)           
            for j in range(0,  max_samp):
                if (CMNDF_vals[sample + j]  < CMNDF_vals[subsample]):
                    subsample = sample + j # New min.
            sample = subsample + bounds[0]
            no_speach = False
            break
    if sample is None:
        #posible = np.argmin(CMNDF_vals)+bounds[0]
        sample = sample_rate #if no_speach else posible # Absolute min
    return sample_rate/sample, 0#energy if (prev_w_energy != 0) and not no_speach else 0

def detect_pitch_cmndf_cache(f, W, t, sample_rate, bounds, thresh=0.3, prev_w_energy=0, prev_sample=1):
    energy = np.sum(f[t:t+W]**2)/W
    no_speach = True
    if prev_w_energy != 0:
        no_speach = energy < prev_w_energy * 0.5
        energy = prev_w_energy if no_speach else energy
    
    CMNDF_vals = [CMNDF_cache(f, W, t, i) for i in range(*bounds)]
    sample = None
    for i, val in enumerate(CMNDF_vals):
        if val < thresh: # Get first sample below threshold (first octave)
            sample = i
            # Check for min near sample.
            subsample = sample
            max_samp = min(int(sample/0.8) - sample, len(CMNDF_vals)-sample-1)             
            for j in range(0,  max_samp):
                if (CMNDF_vals[sample + j]  < CMNDF_vals[subsample]):
                    subsample = sample + j # New min.
            sample = subsample + bounds[0]
            no_speach = False
            break
    if sample is None:
        posible = np.argmin(CMNDF_vals)+bounds[0]
#         if prev_sample*0.7 < posible < prev_sample*1.3:
#             sample = posible
#         else:
#             sample = sample_rate
        sample = sample_rate if no_speach else posible # Absolute min
    return sample_rate/sample, energy if (prev_w_energy != 0) and not no_speach else 0
    
