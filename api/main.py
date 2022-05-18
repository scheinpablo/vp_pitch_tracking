from typing import Union
import json

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from scipy import signal
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
        _DF_cache_dict[(t, lag)] = ACF_cache(f, W, t, 0) + \
            ACF_cache(f, W, t+lag, 0) - (2*ACF_cache(f, W, t, lag))
    return _DF_cache_dict[(t, lag)]


def CMNDF_cache(f, W, t, lag):

    if lag == 0:
        return 1

    if (lag, t) not in _CMNDF_cache_dict:
        _CMNDF_cache_dict[(lag, t)] = DF_cache(f, W, t, lag) / \
            np.sum([DF_cache(f, W, t, j+1) for j in range(lag)])*lag
    return _CMNDF_cache_dict[(lag, t)]


def detect_pitch_cmndf_cache(f, W, t, sample_rate, bounds, thresh=0.1):
    print("detect cache")
    CMNDF_vals = [CMNDF_cache(f, W, t, i) for i in range(*bounds, 10)]
    sample = None
    for i, val in enumerate(CMNDF_vals):
        if val < thresh:
            sample = i+bounds[0]
            break
    if sample is None:
        sample = np.argmin(CMNDF_vals)+bounds[0]
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
        clear_cache_dicts()

        for i in range(data.shape[0] // (window_size+3)):
            pitches.append(
                detect_pitch_cmndf_cache(
                    data,
                    window_size,
                    i*window_size,
                    sample_rate,
                    bounds
                ))
        print("end")
        clear_cache_dicts()
        # Data to be written
        res = {
            "message": "Successfuly uploaded",
            "pitches": pitches,
            "sample_rate": sample_rate
        }

        # Serializing json
        json_object = json.dumps(res, indent=4)
        print(json_object)
        return json_object

    except Exception:
        return {"message": "There was an error uploading the file"}

    return {"message": f"Successfuly uploaded {file.filename}"}
