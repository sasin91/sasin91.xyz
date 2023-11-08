FROM --platform=linux/amd64 node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV AUTH_URL="https://sasin91.xyz"
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

ARG DATABASE_URL
ARG AUTH_SECRET
ARG AUTH_DISCORD_ID
ARG AUTH_DISCORD_SECRET
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ARG CLOUDINARY_API_KEY
ARG CLOUDINARY_API_SECRET

RUN corepack enable
COPY . /usr/src/app
WORKDIR /usr/src/app

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=@sasin91/nextjs --prod /var/www/sasin91

FROM base AS nextjs
COPY --from=build --chown=nextjs:nodejs /var/www/sasin91 /var/www/sasin91
WORKDIR /var/www/sasin91
ENV NEXT_TELEMETRY_DISABLED 0
ENV NODE_ENVIRONMENT production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
EXPOSE 3000
CMD ["node", ".next/standalone/apps/nextjs/server.js"]