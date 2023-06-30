<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="keywords" content="" />
    <meta name="author" content="" />
    <meta name="robots" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="F&B" />
    <meta property="og:title" content="Prima Rasa Selaras" />
    <meta property="og:description" content="F&B System Terbaik" />
    <meta property="og:image" content="/assets/logo/prs.png" />
    <meta name="format-detection" content="telephone=085320003950">
    <link rel="icon" href="/assets/logo/prs.png" />

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @inertiaHead
</head>

<body>
    @inertia
</body>

</html>
