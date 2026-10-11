<?php
/**
 * Every blog post's details, keyed by the view under views/posts that holds
 * its body. `path` is the URL, deliberately not derived from the key, which is
 * what keeps /blog/trongate/mx-transition nested. Content::posts() reads this
 * and lists the posts newest first, whatever order they are in here.
 */
return [
    'recruiter' => [
        'path' => 'blog/trongate/recruiter',
        'title' => 'Recruiter: see how your CV matches a job post',
        'date' => '2026-10-09',
        'description' => 'Recruiter matches a CV against every requirement in a job post and shows why: met, partly met or missing, with the line from the CV that decided it. A Trongate app that dogfoods trongate.cloud.',
        'ask' => [
            'What does Recruiter do?',
            'What problem does it solve?',
            'How does cv_match work?',
            'Is it free?',
            'Which AI model does it use?',
            'Why build it on trongate.cloud?',
            'How accurate is it?',
        ],
    ],
    'trongate-benchmarks' => [
        'path' => 'blog/trongate/benchmarks',
        'title' => 'trongate.cloud: you push, we deploy your Trongate app',
        'date' => '2026-10-04',
        'description' => 'Hosting for Trongate apps on Kubernetes. You push, we deploy: HTTPS, a database and room to grow, with nothing to configure. Tailored for Trongate first, proven by running our own control panel on it, and backed by benchmarks.',
        'ask' => [
            'How do I deploy my app?',
            'Do I need to manage servers?',
            'Does it scale with me?',
            'Is it built for Trongate?',
            'Is it a proven platform?',
            'What did the benchmarks find?',
            'What is the lazy session fix?',
        ],
    ],
    'running-things-on-your-own-hardware' => [
        'path' => 'blog/running-things-on-your-own-hardware',
        'title' => 'Where to start with self-hosting',
        'date' => '2026-08-04',
        'description' => 'I set up Kubernetes to learn it, then packaged the second cluster so it would launch in an afternoon. What the kit costs, what it uses before your own code runs, and where k3s is genuinely stronger than the simple options.',
        'series' => 'self-hosting',
        'part' => 0,
    ],
    'k3s-platform-kit' => [
        'path' => 'blog/k3s-platform-kit',
        'title' => 'K3s starter kit on Hetzner cloud',
        'date' => '2026-08-04',
        'description' => 'A fork-and-edit k3s platform for Hetzner Cloud: GitOps delivery, encrypted secrets, certificates, per-tenant isolation and observability. What is in it, what it costs to run, and the one thing it does that three FreeBSD boxes or Docker Swarm cannot.',
        'hero' => '/images/k3s-platform-kit/architecture.svg',
        'hero_alt' => 'Inside a k3s cluster: a git fork reconciled by Flux, a visitor request arriving through Traefik to a tenant application, and telemetry from both flowing to a collector and on to VictoriaMetrics, VictoriaLogs and Tempo',
        'series' => 'self-hosting',
        'part' => 1,
    ],
    'what-a-game-world-server-needs' => [
        'path' => 'blog/what-a-game-world-server-needs',
        'title' => 'What a game world server actually needs',
        'date' => '2026-08-04',
        'description' => 'Hosting a WoW emulator: the world daemon\'s tick runs on one thread, so clock speed buys you everything and core count buys you almost nothing. What that means for what you buy, why the gaming chip is the wrong pick, and the routing gotcha that catches everyone.',
        'series' => 'self-hosting',
        'part' => 2,
    ],
    'athletos-freebsd' => [
        'path' => 'blog/athletos-freebsd',
        'title' => 'One box, two jails and a five second deploy',
        'date' => '2026-07-26',
        'description' => 'AthletOS runs on a single €7 FreeBSD box. Two jails that are always up, Caddy handling certificates on its own, and a rolling deploy that never leaves zero healthy backends. What the boring choices bought, measured rather than estimated.',
        'hero' => '/images/athletos-freebsd/architecture.svg',
        'hero_alt' => 'One FreeBSD box: Caddy in front of two always-running jails, with Postgres on the host',
    ],
    'freebsd-on-hetzner' => [
        'path' => 'blog/freebsd-on-hetzner',
        'title' => 'FreeBSD on a Hetzner Cloud VPS',
        'date' => '2026-07-26',
        'description' => 'Hetzner has no FreeBSD image, and the installer everyone recommends never verifies what it downloads before handing it root. In this article I install 15.1 on root-on-ZFS the honest way, and walk through the five things that broke on the way there.',
        'hero' => '/images/freebsd-on-hetzner/header.svg',
        'hero_alt' => 'FreeBSD 15.1 on root-on-ZFS, with the disk partition layout',
        'card' => '/images/freebsd-on-hetzner/card.png',
        'card_alt' => 'Bar chart of mean latency for a fresh TLS connection at 100, 250 and 500 connections a second: FreeBSD 4.9, 4.7 and 4.0 milliseconds, Ubuntu 5.7, 5.0 and 5.2',
    ],
    'mx-transition' => [
        'path' => 'blog/trongate/mx-transition',
        'title' => 'Trongate mx-transition attribute',
        'date' => '2025-03-03',
        'description' => 'MX transition provides an easy and intuitive way to add animations to items and the whole page.',
    ],
    'trongate' => [
        'path' => 'blog/trongate',
        'title' => 'Trongate PHP',
        'date' => '2024-09-14',
        'description' => 'Trongate is often misunderstood and gets a bad reputation because it breaks with common standards and takes a journey back to its roots. In this article, I will explore and highlight this rough diamond that deserves a spot in the limelight.',
    ],
];
