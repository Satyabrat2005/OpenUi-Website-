import sqlite3
import os
from pydantic import BaseModel, EmailStr
from fastapi import HTTPException

# Ensure .tmp exists
os.makedirs(".tmp", exist_ok=True)
DB_PATH = ".tmp/waitlist.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS waitlist (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL
        )
    """)
    conn.commit()
    conn.close()

class WaitlistRequest(BaseModel):
    email: EmailStr

class WaitlistResponse(BaseModel):
    status: str
    message: str

def add_to_waitlist(req: WaitlistRequest) -> WaitlistResponse:
    init_db()
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("INSERT INTO waitlist (email) VALUES (?)", (req.email,))
        conn.commit()
        conn.close()
        return WaitlistResponse(status="success", message="Added to waitlist")
    except sqlite3.IntegrityError:
        return WaitlistResponse(status="success", message="Already on waitlist")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
