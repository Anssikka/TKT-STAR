#!/bin/bash
PROJECT_ROOT=$(pwd)

cd backend/application/ && rm -rf built_frontend/
cd ../../frontend/ && rm -rf build/
npm run build && cp -r build/ ../backend/application/ && cd ../backend/application/ && mv build/ built_frontend/ && cd $PROJECT_ROOT
cd backend/ && PYTHON_ENV=TEST python3 run.py
