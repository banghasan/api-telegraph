FROM denoland/deno:alpine-1.43.5 AS base

WORKDIR /app

# Copy source
COPY . .

# Cache dependencies (optional but speeds up cold start)
RUN deno cache main.ts

EXPOSE 8000
ENV PORT=8000

# Run Fresh server (loads env via main.ts -> dotenv)
CMD ["deno", "run", "-A", "main.ts"]
