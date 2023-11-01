FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV AUTH_URL="https://sasin91.xyz"
RUN --mount=type=secret,id=AUTH_SECRET \
  cat /run/secrets/AUTH_SECRET
RUN --mount=type=secret,id=DATABASE_URL \
  cat /run/secrets/DATABASE_URL
RUN --mount=type=secret,id=AUTH_DISCORD_ID \
  cat /run/secrets/AUTH_DISCORD_ID
RUN --mount=type=secret,id=AUTH_DISCORD_SECRET \
  cat /run/secrets/AUTH_DISCORD_SECRET

RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm --global install turbo
RUN turbo prune nextjs --docker
RUN pnpm run build

FROM base AS runtime
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/nextjs/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/nextjs/.next/static ./apps/nextjs/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/nextjs/public ./apps/nextjs/public
 
EXPOSE 8000
# CMD [ "pnpm", "start" ]
CMD node apps/nextjs/server.js