# ============================================================
# Dependencies
# ============================================================

FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

# Use npm install temporarily so deployment is not blocked
# by the current package-lock mismatch.
RUN npm install --no-audit --no-fund


# ============================================================
# Build
# ============================================================

FROM node:20-alpine AS builder

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build


# ============================================================
# Production
# ============================================================

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=4030

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs


EXPOSE 4030

CMD ["npm", "run", "serve", "--", "-p", "4030"]