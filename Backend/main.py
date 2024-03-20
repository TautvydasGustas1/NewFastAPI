from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from InferenceModel import inference_model


app = FastAPI()


origins = [
    "http://localhost:3000",
    "http://35.233.114.141:3000"
]


app.add_middleware(CORSMiddleware,
                   allow_origins=origins,
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"])


def convert_numpy(obj):
    if isinstance(obj, np.generic):
        return obj.item()
    elif isinstance(obj, np.ndarray):
        return obj.tolist()
    else:
        return obj


@app.get('/api')
async def root():
    return {'message': "hello world"}


@app.get('/api/inference/calc')
async def calculate_sentiment_return(input_sentence: str = "I hate vegetables"):
    results = inference_model.calculate_sentiment(
        input_sentence)

    # Apply conversion to each item in the dictionary
    results_converted = {k: convert_numpy(v) for k, v in results.items()}

    return {'results': results_converted}
