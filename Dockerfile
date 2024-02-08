# Stage 1: Build React frontend
FROM node:16 as react-build
WORKDIR /app
COPY Frontend/app/package.json Frontend/app/package-lock.json ./
RUN npm install
COPY Frontend/app ./
RUN npm run build

# Stage 2: Build FastAPI backend
FROM python:3.9
WORKDIR /app
# Copy the React build from the previous stage
COPY --from=react-build /app/build /app/frontend/build
# Install FastAPI and any other dependencies
COPY Backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY Backend/ .


# Start the FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]