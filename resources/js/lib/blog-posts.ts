import { InertiaLinkProps } from '@inertiajs/react';

import athletosArchImg from '@/../images/blog/athletos-freebsd/architecture.svg';
import freebsdHeaderImg from '@/../images/blog/freebsd-on-hetzner/header.svg';
import theFrameworkImg from '@/../images/blog/trongate/the_framework.webp';
import viewTransitionsImg from '@/../images/blog/trongate/view_transitions.png';
import {
    athletosFreebsd,
    freebsdOnHetzner,
    mxTransition,
    trongate,
} from '@/wayfinder/routes/blog';

export type BlogPost = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    /** ISO date. Drives the index ordering, so it has to match the post. */
    publishedAt: string;
    description: string;
    image: { src: string; alt: string };
};

/**
 * Every post that should appear on the index. Adding one here is the only step;
 * the index sorts by `publishedAt`, so entries can go in any order. Posts that
 * share a date keep the order they have in this list.
 */
const posts: BlogPost[] = [
    {
        title: 'Trongate PHP',
        href: trongate(),
        publishedAt: '2024-09-14',
        description:
            'Trongate is often misunderstood and gets a bad reputation because it breaks with common standards and takes a journey back to its roots. In this article, I will explore and highlight this rough diamond that deserves a spot in the limelight.',
        image: {
            src: theFrameworkImg,
            alt: "Trongate: The framework they don't want you to know about",
        },
    },
    {
        title: 'Trongate mx-transition attribute',
        href: mxTransition(),
        publishedAt: '2025-03-03',
        description:
            'MX transition provides an easy and intuitive way to add animations to items and the whole page.',
        image: {
            src: viewTransitionsImg,
            alt: 'CSS View transitions',
        },
    },
    {
        title: 'One box, two jails and a five second deploy',
        href: athletosFreebsd(),
        publishedAt: '2026-07-26',
        description:
            'AthletOS runs on a single €7 FreeBSD box. Two jails that are always up, Caddy handling certificates on its own, and a rolling deploy that never leaves zero healthy backends. What the boring choices bought, measured rather than estimated.',
        image: {
            src: athletosArchImg,
            alt: 'Caddy in front of two always-running jails on one FreeBSD box',
        },
    },
    {
        title: 'FreeBSD on a Hetzner Cloud VPS',
        href: freebsdOnHetzner(),
        publishedAt: '2026-07-26',
        description:
            'Hetzner has no FreeBSD image, and the installer everyone recommends never verifies what it downloads before handing it root. In this article I install 15.1 on root-on-ZFS the honest way, and walk through the five things that broke on the way there.',
        image: {
            src: freebsdHeaderImg,
            alt: 'FreeBSD 15.1 on root-on-ZFS',
        },
    },
];

/**
 * Newest first. Array#sort is stable, so same-day posts fall back to the order
 * they are declared in above — hence the list is oldest to newest.
 */
export const blogPosts: readonly BlogPost[] = [...posts].sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
);
