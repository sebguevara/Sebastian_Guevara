# ---- Build stage: Bun ----
FROM oven/bun:1.3-alpine AS build
WORKDIR /app

# Install dependencies first (cached layer)
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Build the static site
COPY . .
RUN bun run build

# ---- Runtime stage: nginx ----
FROM nginx:alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ >/dev/null || exit 1
