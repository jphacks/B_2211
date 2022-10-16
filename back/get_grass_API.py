from fastapi import FastAPI
from get_grass import getGrassNum
app = FastAPI()

@app.get("/grass/{username}")
def get_grassAPI(username: str, q: str = None):
    return getGrassNum(username)