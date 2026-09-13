# PhishGuard AI — Cyber Phishing Detection & Intelligence Platform

> **Final-Year B.Tech IT Project Concept**  
> An Explainable AI-Based Phishing Detection & Cyber Security Intelligence Platform for Real-Time Analysis of URLs, Emails, Homographs, Brand Impersonation, and Multi-Hop Redirect Chains.

---

## 📌 Project Overview

**PhishGuard AI** transforms conventional binary phishing classifiers into an explainable, multi-modular cybersecurity platform. Rather than outputting a simple "Phishing / Not Phishing" binary label, PhishGuard extracts **14+ lexical, domain, NLP sentiment, psychological urgency, and homograph features** to produce a transparent **0–100 Unified Risk Score** paired with **SHAP / LIME feature attributions**.

### Key Highlights
- 🔴 **0–100 Unified Risk Score**: Clear risk tiers (`0–30 Safe`, `31–60 Suspicious`, `61–80 High Risk`, `81–100 Critical Phishing`).
- 🎯 **Explainable AI (XAI)**: SHAP waterfall charts explaining *why* the system flagged a threat.
- ⚡ **Brand Impersonation & Homograph Engine**: String similarity (**Levenshtein Distance** & **Jaro-Winkler**) and visual character spoofing detection (`0` for `O`, `1` for `I/L`, `vv` for `W`).
- 🔄 **Multi-Hop Redirect Tracer**: Expands HTTP 301/302 shortlinks (Bitly, TinyURL) to reveal uncloaked target servers and raw IP endpoints.
- 📧 **NLP Email Phishing & Header Telemetry**: SPF, DKIM, DMARC validation and psychological urgency analysis.
- 🔊 **Voice Phishing (Vishing) Processing**: Librosa & NumPy MFCC spectral feature extraction for robocall threat defense.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend UI** | **React.js**, HTML5, Vanilla CSS3 (Custom Design System), JavaScript (ES6+) |
| **UI Design System** | **Figma** (Custom Glassmorphism Cyber Theme) |
| **Backend REST API** | **Python 3.11**, **FastAPI**, Uvicorn, Pydantic |
| **AI / Machine Learning** | **PyTorch** (DistilBERT), **Scikit-learn** (Random Forest, XGBoost, Logistic Regression) |
| **Audio Processing** | **Librosa** (MFCC Spectral Analysis), **NumPy** |
| **Database Storage** | **MySQL** (Relational Telemetry & Scans) + **MongoDB** (Campaign Threat Clusters) |
| **Authentication** | **JWT (JSON Web Tokens)** + bcrypt password hashing |
| **API Communication** | **REST API** (JSON payload endpoints over HTTP/HTTPS) |
| **Model Training Environment** | **Google Colab** (GPU T4 Accelerated Pipeline) |
| **Version Control** | **Git** + **GitHub** |
| **Deployment Targets** | **Vercel** (Frontend) + **Render / Railway** (FastAPI Backend API) |

---

## 📁 Repository Directory Structure

```
PhishGuard AI/
├── frontend/                         # React.js SPA (Vercel Deployment Target)
│   ├── src/
│   │   ├── components/               # Module Views
│   │   │   ├── Header.jsx            # Top Pill Navigation & Live Defense Badge
│   │   │   ├── Dashboard.jsx         # Enterprise Metrics & Threat Stream
│   │   │   ├── UrlAnalyzer.jsx       # Lexical Feature Extractor & XAI Score
│   │   │   ├── EmailPhishingAnalyzer.jsx # NLP Inspector & DistilBERT vs TF-IDF Benchmarks
│   │   │   ├── XaiDeepDive.jsx       # SHAP / LIME Waterfall Feature Explainer
│   │   │   ├── HomographBrandDetector.jsx # Jaro-Winkler & Levenshtein String Math
│   │   │   ├── RedirectTracer.jsx    # Multi-Hop HTTP 301/302 URL Uncloaker
│   │   │   ├── SimulatedInbox.jsx    # Webmail Client Sandbox with Threat Tags
│   │   │   ├── BrowserExtensionDemo.jsx # Chrome/Firefox Extension Overlay Popup
│   │   │   ├── AwarenessQuiz.jsx     # Cyber Awareness Training & Quiz
│   │   │   ├── DefenderSimulation.jsx# Gamified Threat Decision Game & Campaign Clusters
│   │   │   ├── SecurityReportModal.jsx # Printable PDF Audit Report Generator
│   │   │   └── AskAiModal.jsx        # AI Threat Assistant Interface
│   │   ├── utils/
│   │   │   └── urlAnalyzerEngine.js  # Heuristic & String Distance Engine
│   │   ├── data/
│   │   │   └── mockData.js           # Presets & Metric Data
│   │   ├── App.jsx                   # Main Router Container
│   │   ├── main.jsx                  # React DOM Entry
│   │   └── index.css                 # Custom CSS Design Token System
│   ├── index.html                    # Root HTML Container
│   ├── package.json                  # NPM Dependencies & Scripts
│   └── vite.config.js                # Vite Server Configuration (Port 3000)
│
├── backend/                          # Python FastAPI Server (Render/Railway Deployment Target)
│   ├── main.py                       # FastAPI Endpoints (/api/v1/analyze-url, /api/v1/analyze-email)
│   ├── auth.py                       # JWT Token Generation & Verification Middleware
│   ├── database.py                   # MySQL & MongoDB Connection Abstraction
│   └── requirements.txt              # FastAPI, PyJWT, Pydantic Dependencies
│
├── aiml/                             # ML Pipeline & Google Colab Training Workspace
│   ├── train_model.py                # Model Benchmark Comparison Pipeline
│   ├── feature_extractor.py          # Lexical Vector Extractor & Librosa Audio Vishing
│   ├── shap_explainer.py             # SHAP / LIME Feature Attribution Engine
│   ├── requirements.txt              # PyTorch, Scikit-learn, Librosa, SHAP
│   └── PhishGuard_AI_Training.ipynb  # Reference Google Colab Notebook
│
└── README.md                         # Project Documentation
```

---

## 🏗️ System Architecture

```
                    ┌─────────────────────────┐
                    │      USER INTERFACE     │
                    │   React.js Web App /    │
                    │    Browser Extension    │
                    └────────────┬────────────┘
                                 │
                                 ▼ (REST API / JWT Auth)
                    ┌─────────────────────────┐
                    │     FastAPI BACKEND     │
                    │      (Python 3.11)      │
                    └────────────┬────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐
│   URL Feature    │   │     NLP Email    │   │  Librosa Audio   │
│     Engine       │   │     Engine       │   │  Vishing Engine  │
└────────┬─────────┘   └────────┬─────────┘   └────────┬─────────┘
         │                      │                      │
         └──────────────────────┼──────────────────────┘
                                ▼
                    ┌─────────────────────────┐
                    │      AI / ML ENGINE     │
                    │ PyTorch (DistilBERT) +  │
                    │  XGBoost / Random Forest│
                    └────────────┬────────────┘
                                 │
                         ┌───────┴───────┐
                         ▼               ▼
                ┌────────────────┐ ┌──────────┐
                │   SHAP / LIME  │ │ MySQL /  │
                │   XAI Engine   │ │ MongoDB  │
                └───────┬────────┘ └──────────┘
                        │
                        ▼
            Unified Risk Score (0-100) 🔴
```

---

## ⚡ Quick Start & Installation

### 1. Run Frontend (React.js)
```bash
# Navigate to frontend folder
cd frontend

# Install Node dependencies
npm install --legacy-peer-deps

# Start Vite Development Server
npm run dev
```
👉 Access frontend on **`http://localhost:3000/`**

### 2. Run Backend (FastAPI)
```bash
# Navigate to backend folder
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start FastAPI Uvicorn server
uvicorn main:app --reload --port 8000
```
👉 Access API documentation on **`http://localhost:8000/docs`**

---

## 🚀 Deployment Guide

### Frontend Deployment (Vercel)
1. Push project repository to **GitHub**.
2. Connect repository to **Vercel**.
3. Set **Root Directory** to `frontend`.
4. Build Command: `npm run build`, Output Directory: `dist`.

### Backend Deployment (Render / Railway)
1. Connect repository to **Render** or **Railway**.
2. Set **Root Directory** to `backend`.
3. Build Command: `pip install -r requirements.txt`.
4. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`.

---

## 📄 License & Academic Attribution
Created for **Final-Year B.Tech IT Capstone Project Demonstration**.  
*PhishGuard AI — Advanced Cyber Threat Intelligence & Explainable AI Platform.*
