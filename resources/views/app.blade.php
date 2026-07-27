<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="dark">

    {{-- Inline style to set the HTML background color to match our theme in app.css --}}
    <style>
        html {
            background-color: oklch(0.05 0.05 300);
        }
    </style>

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <link rel="icon" href="/favicon.png" sizes="any">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased to-magenta-100/20 bg-linear-to-br from-background via-cyan-100/5">
    @inertia
</body>

</html>