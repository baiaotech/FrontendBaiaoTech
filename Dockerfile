########################
# deps (cache de npm)
########################
FROM node:20-bookworm-slim AS deps
WORKDIR /app
COPY package*.json ./

# usa cache de dependências para builds rápidos
RUN --mount=type=cache,target=/root/.npm \
    npm ci --include=dev

########################
# build (Next standalone)
########################
FROM node:20-bookworm-slim AS builder
WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=8192"

RUN useradd -m nextjs && chown -R nextjs:nextjs /app
USER nextjs

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_FORM_LINK
ARG NEXT_PUBLIC_COMMUNITY_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_FORM_LINK=$NEXT_PUBLIC_FORM_LINK
ENV NEXT_PUBLIC_COMMUNITY_API_URL=$NEXT_PUBLIC_COMMUNITY_API_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN --mount=type=cache,target=/home/nextjs/.npm \
    npm run build

########################
# run (standalone)
########################
FROM node:20-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

RUN useradd -m nextjs && chown -R nextjs:nextjs /app
USER nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=20s \
  CMD node -e "require('http').get('http://127.0.0.1:3000',res=>process.exit(res.statusCode===200?0:1)).on('error',()=>process.exit(1))"

CMD ["node","server.js"]
