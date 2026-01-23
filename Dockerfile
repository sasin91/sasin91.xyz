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
RUN composer install --no-dev --prefer-dist --no-interaction --no-scripts

# Copy the rest of the app
COPY . .

RUN composer dump-autoload --optimize \
    && php artisan package:discover --ansi

CMD ["php","artisan","octane:frankenphp","--host=0.0.0.0","--port=8000"]
