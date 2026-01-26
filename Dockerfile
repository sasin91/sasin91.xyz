FROM node:22-alpine AS assets

WORKDIR /app

ENV WAYFINDER_COMMAND=true

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/root/.cache \
    npm ci

COPY resources ./resources
COPY public ./public
COPY components.json vite.config.ts tsconfig.json ./

RUN npm run build

FROM dunglas/frankenphp:latest

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Needed for composer to install dist archives.
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl git unzip \
    && rm -rf /var/lib/apt/lists/*

# Install system deps (optional but common)
RUN install-php-extensions \
    pdo \
    pdo_pgsql \
    pdo_mysql \
    opcache \
    pcntl \
    redis

WORKDIR /app

# Copy composer files first for better caching
COPY composer.json composer.lock ./
RUN --mount=type=cache,target=/root/.composer/cache \
    composer install --no-dev --prefer-dist --no-interaction --optimize-autoloader --no-scripts

# Copy the rest of the app
COPY . .

COPY --from=assets /app/public/build /app/public/build


ARG APP_UID=10001
ARG APP_GID=10001
RUN groupadd -g ${APP_GID} app \
    && useradd -u ${APP_UID} -g app -m -s /bin/bash app \
    && chown -R app:app /app /app/storage /app/bootstrap/cache

USER app

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8000/up || exit 1

CMD ["php","artisan","octane:frankenphp","--host=0.0.0.0","--port=8000"]
