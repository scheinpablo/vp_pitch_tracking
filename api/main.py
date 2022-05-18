from typing import Union
import json

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import scipy.signal as ss
import numpy as np
from scipy.io import wavfile

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def optimized_calculations(f, W, t, sample_rate, bounds, th=0.1, p_energy=0, p_freq=1):
    energy_array = np.array(f[t:t+W+bounds[1]+1] *
                            f[t:t+W+bounds[1]+1], dtype=float).cumsum()
    energy_2_array = np.array([energy_array[W+i]-energy_array[i]
                              for i in range(1, bounds[1]+1)]).cumsum()
    interes_signal = f[t:t+W+bounds[1]]
    autocorrelation = ss.correlate(
        interes_signal, interes_signal, mode='full', method='fft')[W+bounds[1]-1:]
    autocorr_sum = autocorrelation[1:].cumsum()

    def calc_df(lag):
        return (energy_array[W] - energy_array[0]) + (energy_array[W+lag] - energy_array[lag]) - 2 * autocorrelation[lag]

    def calc_dmndf(lag):
        # [calc_df(1) + calc_df(2) + ... + calc_df(lag)]
        return calc_df(lag) / ((energy_array[W] - energy_array[0]) + energy_2_array[lag]/lag - 2 * autocorr_sum[lag]/lag)

    CMNDF_vals = [calc_dmndf(i) for i in range(*bounds)]
    sample = None
    for i, val in enumerate(CMNDF_vals):
        if val < th:  # Get first sample below threshold (first octave)
            sample = i  # Check for min near sample.
            subsample = sample
            max_samp = min(int(sample/0.8) - sample, len(CMNDF_vals)-sample-1)
            for j in range(0,  max_samp):
                if (CMNDF_vals[sample + j] < CMNDF_vals[subsample]):
                    subsample = sample + j  # New min.
            sample = subsample + bounds[0]
            no_speach = False
            break
    if sample is None:
        #posible = np.argmin(CMNDF_vals)+bounds[0]
        sample = sample_rate  # if no_speach else posible # Absolute min
    # energy if (prev_w_energy != 0) and not no_speach else 0
    return sample_rate/sample


@app.post("/uploadfile")
async def upload(file: UploadFile = File(...)):
    try:
        sample_rate, data = wavfile.read(file.file)
        data = data.astype(np.float64)
        min_freq = 200
        max_freq = 400
        window_size = int(sample_rate // min_freq * 1.2)

        min_bound = sample_rate // max_freq
        max_bound = sample_rate // min_freq
        bounds = [min_bound, max_bound]

        pitches = []

        for i in range(data.shape[0] // (window_size+3)):
            pitches.append(
                optimized_calculations(
                    data,
                    window_size,
                    i*window_size,
                    sample_rate,
                    bounds
                ))
        print("end")
        # Data to be written
        res = {
            "message": "Successfuly uploaded",
            "pitches": pitches,
            "sample_rate": sample_rate,
            "window_size": window_size
        }

        # Serializing json
        json_object = json.dumps(res, indent=4)
        print(json_object)
        return json_object

    except Exception:
        return {"message": "There was an error uploading the file"}

    return {"message": f"Successfuly uploaded {file.filename}"}
