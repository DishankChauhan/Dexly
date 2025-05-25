#!/bin/bash
export DATABASE_URL="postgresql://postgres:password@localhost:5432/perps_db"
export JWT_SECRET="your-super-secret-jwt-key-change-in-production"
export JWT_EXPIRES_IN="7d"

npm start 