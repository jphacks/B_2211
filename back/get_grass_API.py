from fastapi import FastAPI
from get_grass import getGrassNum
from starlette.exceptions import HTTPException
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

origins = [
    "http://localhost:8000",
    "http://localhost",
    "http://localhost:3000",
    "https://kusa.home.k1h.dev"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/grass/{username}")
def get_grassAPI(username: str, q: str = None):
    ret=getGrassNum(username)
    if ret==[(-1,-1)]:raise HTTPException(status_code=404,detail="user not found") 
    return ret