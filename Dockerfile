FROM --platform=linux/amd64 node:21-slim AS base
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
WORKDIR /var/www/sasin91
# copy the public folder from the project as this is not included in the build process
COPY --from=build --chown=nextjs:nextjs /var/www/sasin91/public ./public
# copy the standalone folder inside the .next folder generated from the build process 
COPY --from=build --chown=nextjs:nextjs /var/www/sasin91/.next/standalone ./
# copy the static folder inside the .next folder generated from the build process 
COPY --from=build --chown=nextjs:nextjs /var/www/sasin91/.next/static ./apps/nextjs/.next/static
COPY --from=build --chown=nextjs:nextjs /var/www/sasin91/.next/static ./apps/nextjs/.next/static
# COPY --from=build --chown=nextjs:nodejs /var/www/sasin91 ./full
ENV NEXT_TELEMETRY_DISABLED 0
ENV NODE_ENVIRONMENT production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
EXPOSE 3000
CMD ["node", "apps/nextjs/server.js"]