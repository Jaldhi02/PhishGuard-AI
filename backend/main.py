"""
PhishGuard AI — FastAPI REST API Backend
"""

from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from auth import generate_jwt_token, verify_jwt_token
from database import mysql_db, mongo_db

app = FastAPI(
    title="PhishGuard AI — Cybersecurity Intelligence API",
    description="REST API Backend for URL Feature Extraction, NLP Email Phishing Analysis, SHAP XAI Scoring, and Brand Impersonation Detection.",
    version="2.4.0"
)

# Enable CORS for React Frontend (Localhost & Vercel deployment)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Request Models
class UrlAnalysisRequest(BaseModel):
    url: str

class EmailAnalysisRequest(BaseModel):
    sender: str
    subject: str
    body: str

class LoginRequest(BaseModel):
    email: str
    password: str

# Endpoints
@app.get("/")
def root():
    return {
        "status": "online",
        "service": "PhishGuard AI Backend API",
        "version": "2.4.0",
        "docs": "/docs"
    }

@app.post("/api/v1/auth/login")
def login(req: LoginRequest):
    if req.email and req.password:
        token = generate_jwt_token(user_id="USR-902", email=req.email)
        return {
            "status": "success",
            "token": token,
            "user": {"email": req.email, "role": "Security Analyst"}
        }
    raise HTTPException(status_code=400, detail="Invalid credentials")

@app.post("/api/v1/analyze-url")
def analyze_url_endpoint(req: UrlAnalysisRequest):
    url = req.url.strip()
    if not url:
        raise HTTPException(status_code=400, detail="URL cannot be empty")
    
    # Calculate mock heuristic scoring
    is_phishing = "g00gle" in url or "paypa1" in url or "xyz" in url or "192.168" in url
    score = 94 if is_phishing else 12

    return {
        "url": url,
        "risk_score": score,
        "classification": "Phishing" if score > 80 else "Safe",
        "tier": "🔴 Likely Phishing" if score > 80 else "🟢 Safe",
        "xai_contributions": [
            {"feature": "Homograph Spoofing", "impact": 25},
            {"feature": "Brand Impersonation", "impact": 22}
        ] if is_phishing else [
            {"feature": "Verified Infrastructure", "impact": -15}
        ]
    }

@app.post("/api/v1/analyze-email")
def analyze_email_endpoint(req: EmailAnalysisRequest):
    has_urgency = "URGENT" in req.subject or "suspended" in req.body.lower()
    score = 96 if has_urgency else 8
    
    return {
        "sender": req.sender,
        "subject": req.subject,
        "phishing_probability": score,
        "classification": "Phishing" if score > 80 else "Safe",
        "nlp_indicators": [
            {"name": "Urgency & Threat", "score": "+28 Risk"},
            {"name": "Sender-Domain Mismatch", "score": "+22 Risk"}
        ] if has_urgency else []
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
