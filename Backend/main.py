from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


origins = [
    "http://localhost:3000",
]


app.add_middleware(CORSMiddleware,
                   allow_origins=origins,
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"])


@app.get('/api')
async def root():
    return {'message': "hello world"}


@app.post('/api/setInfo')
async def set_info(input1, input2, slider):
    result = input1 + input2 + slider
    return {'message': "Combined: " + result}
