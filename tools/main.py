from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv

from .waitlist import add_to_waitlist, WaitlistRequest, WaitlistResponse
from .stripe_api import create_checkout_session, CheckoutRequest, CheckoutResponse

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/waitlist", response_model=WaitlistResponse)
def api_waitlist(req: WaitlistRequest):
    return add_to_waitlist(req)

@app.post("/api/checkout", response_model=CheckoutResponse)
def api_checkout(req: CheckoutRequest):
    return create_checkout_session(req)

# Mount the static site at root
app.mount("/", StaticFiles(directory=".", html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("tools.main:app", host="127.0.0.1", port=8000, reload=True)
