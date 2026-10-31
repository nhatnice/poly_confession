# ==========================================
# Stage 1: Build React Frontend
# ==========================================
FROM node:18-alpine AS frontend-builder

WORKDIR /app

# Install dependencies first for Docker caching
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

# Copy frontend source files
COPY config-overrides.js .babelrc jsconfig.json ./
COPY public/ ./public/
COPY src/ ./src/

# Build optimized static bundle
ENV NODE_OPTIONS=--openssl-legacy-provider
ENV SKIP_PREFLIGHT_CHECK=true
ENV REACT_APP_SERVER_URL=
RUN npm run build

# ==========================================
# Stage 2: Backend Runtime & Static Serving
# ==========================================
FROM node:18-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=8002

# Copy server package definitions and install dependencies
COPY server/package.json server/package-lock.json* ./server/
WORKDIR /app/server
RUN npm install --omit=dev --legacy-peer-deps

# Copy server code
COPY server/ ./

# Ensure uploads directory exists
RUN mkdir -p /app/server/public/media

# Copy built frontend from stage 1
COPY --from=frontend-builder /app/build /app/build

EXPOSE 8002

CMD ["node", "index.js"]
