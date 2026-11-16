@echo off
cd /d "%~dp0"
if not exist .venv (python -m venv .venv)
call .venv\Scripts\activate
python -m pip install --upgrade pip
pip install -r backend\requirements.txt
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
