FROM dunglas/frankenphp:latest

# Install system deps (optional but common)
RUN install-php-extensions \
    pdo \
    pdo_pgsql \
    pdo_mysql \
    opcache \
    redis

WORKDIR /app

# Copy composer files first for better caching
COPY composer.json composer.lock ./
RUN composer install --no-dev --prefer-dist --no-interaction

# Copy the rest of the app
COPY . .

CMD ["php","artisan","octane:frankenphp","--host=0.0.0.0","--port=8000"]
