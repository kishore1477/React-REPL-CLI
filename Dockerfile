# Use the latest Node.js Alpine image
FROM node:alpine

# Set working directory
WORKDIR /app

# Copy both backend and frontend code to the container
COPY ./backend/package.json ./backend/package-lock.json ./backend/
COPY ./frontend/package.json ./frontend/package-lock.json ./frontend/

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Install frontend dependencies
WORKDIR /app/frontend
RUN npm install

# # Build frontend (if needed)
# RUN npm run build

# Copy the rest of the backend and frontend code
COPY ./backend ./backend
COPY ./frontend ./frontend

# Expose ports
EXPOSE 3000
EXPOSE 5000

# Start both the frontend and backend applications concurrently
WORKDIR /app/backend
WORKDIR /app/frontend
CMD ["npm", "run", "start:both"]
