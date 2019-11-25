#!/bin/bash
PROJECT_ROOT=$(pwd)

cd backend/application/ && rm -rf static/
cd ../../frontend/ && rm -rf build/
npm run build && cp -r build/ ../backend/application/ && cd ../backend/application/ && mv build/ static/ && cd $PROJECT_ROOT
cd backend/ && python3 run.py