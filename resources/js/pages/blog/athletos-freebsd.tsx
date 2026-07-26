import { Head } from '@inertiajs/react';

import architectureImg from '@/../images/blog/athletos-freebsd/architecture.svg';
import deployTimelineImg from '@/../images/blog/athletos-freebsd/deploy-timeline.svg';
import footprintImg from '@/../images/blog/athletos-freebsd/footprint.svg';
import { BackgroundBeams } from "@/components/ui/background-beams";
import BlogLink from "@/components/ui/blog-link";
import { CodeBlock } from "@/components/ui/code-block";
import { Heading } from "@/components/ui/heading";
import { Underline } from "@/components/ui/underline";
import AppLayout from '@/layouts/app-layout';

export function AthletosArchitecture() {
  return (
    <div className="relative flex items-center rounded-xl">
      <BackgroundBeams />
      <img
        alt="One FreeBSD box: Caddy in front of two always-running jails, with Postgres on the host"
        src={architectureImg}
        className="w-full object-fill rounded-xl shadow-sm"
      />
    </div>
  );
}

export default function BlogAthletosFreeBsd() {
  return (
    <AppLayout>
      <Head title="Blog :: AthletOS on FreeBSD" />

      <div className="px-6 py-16 text-center sm:py-24 lg:px-8">
        <article className="mx-auto max-w-3xl text-base leading-7 text-primary">
          <AthletosArchitecture />

          <Heading level={1} className="mt-8">
            One box, two jails and a five second deploy
          </Heading>

          <section className="mt-10 text-left">
            <h2 className="text-xl font-bold tracking-tight text-primary">
              The essence is simple &amp; efficient.
              <br />
              That&rsquo;s exactly why I chose{' '}
              <BlogLink href="/blog/freebsd-on-hetzner">FreeBSD</BlogLink> as the foundation and{' '}
              <a
                href="https://github.com/sasin91/athletos.app/tree/main/backend"
                rel="noreferrer"
                target="_blank"
                className="text-blue-200 hover:text-blue-500 underline"
              >
                Rust
              </a>{' '}
              as the base.
            </h2>

            <figure className="mt-10 border-l border-indigo-600 pl-9">
              <blockquote className="font-semibold text-primary-900">
                <p>
                  AthletOS picks a program, prescribes the weights, and records what you actually lifted next to what it asked for.
                </p>
              </blockquote>
              <figcaption className="mt-6 text-sm leading-6">
                The gap between those two numbers is the entire product. I do not need a motivational chart, I need to be told 100 kg and not talk myself into 120.
              </figcaption>
            </figure>

            <p className="mt-10">
              One Hetzner CX23, about €7 a month. FreeBSD 15.1, root-on-ZFS, two jails, Caddy, Postgres.
            </p>
          </section>

          <section className="mt-10 text-left">
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              Why not Docker
            </h2>

            <p className="mt-6">
              While Docker is great, well supported and convenient, it is also additional complexity and overhead that I do not need.
              <br />
              With <BlogLink href="/blog/freebsd-on-hetzner">FreeBSD</BlogLink> I have everything I need to ensure smooth rollouts and consistent performance with <Underline active={true}>minimal</Underline> overhead and tooling.
            </p>
          </section>

          <section className="mt-10 text-left">
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              Rollouts
            </h2>

            <p className="mt-6">
              Two jails, blue and green, both running all the time and both registered with Caddy.
              <br />
              A deploy takes one out, swaps a symlink, waits for it to answer, and only then touches the other.
            </p>

            <div className="relative mt-8 flex items-center">
              <img
                alt="Rolling deploy timeline: five seconds, always at least one healthy backend"
                src={deployTimelineImg}
                className="w-full object-fill rounded-xl shadow-sm"
              />
            </div>

            <p className="mt-8">
              Five seconds, and never a moment without a healthy backend.
              <br />
              The same machinery covers a crash at 3am: Caddy marks the jail down and the other one serves until I look.
            </p>

            <p className="mt-6 text-sm italic underline decoration-wavy text-primary">
              Tip: two releases are briefly live against one database, so a migration has to be backward compatible with the one before it.
            </p>
          </section>

          <section className="mt-10 text-left">
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              Certificates
            </h2>

            <p className="mt-6">
              Certificate lifetimes are dropping to <Underline active={true}>47 days</Underline>, which turns renewal into eight chances a year for a hook to fail quietly.
              <br />
              Caddy just does it. No certbot, no timer, nothing to forget.
            </p>

            <CodeBlock
              language="caddy"
              filename="Caddyfile"
              viewTransitionName="athletos-freebsd-1"
              code={`{$APP_DOMAIN} {
	encode zstd gzip
	reverse_proxy 10.0.0.2:3000 10.0.0.3:3000 {
		lb_policy       least_conn
		health_uri      /login
		health_interval 5s
	}
}`}
            />
          </section>

          <section className="mt-10 text-left">
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              Efficiency
            </h2>

            <div className="relative mt-8 flex items-center">
              <img
                alt="Memory footprint: 2.19 GB free of 3.86 GB with everything running"
                src={footprintImg}
                className="w-full object-fill rounded-xl shadow-sm"
              />
            </div>

            <p className="mt-8">
              The efficiency speaks for itself. Plenty of room &mdash; likely more than I will ever need for this app.
            </p>

            <p className="mt-6">
              The API answers in under a millisecond. Everything else in the numbers below is the distance to Helsinki and a fresh handshake per sample.
            </p>

            <CodeBlock
              language="bash"
              filename="latency, from my desk in Denmark"
              viewTransitionName="athletos-freebsd-2"
              code={`api, loopback inside the box      p50  0.0 ms   p95  0.6 ms
https://api.athletos.app/health   p50  136 ms   p95  143 ms
https://athletos.app/login        p50  136 ms   p95  247 ms`}
            />
          </section>

          <section className="mt-10 text-left">
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              Backups
            </h2>

            <p className="mt-6">
              The backup story is refreshingly stable and efficient, with{' '}
              <a
                href="https://github.com/jimsalterjrs/sanoid"
                rel="noreferrer"
                target="_blank"
                className="text-blue-200 hover:text-blue-500 underline"
              >
                sanoid
              </a>{' '}
              taking snapshots on a timer and syncoid piggybacking on ZFS to move them offsite.
              <br />
              Jails ensure a reproducible and reliable runtime environment. There is little left for me to desire at this scale.
            </p>

            <CodeBlock
              language="bash"
              filename="zfs list -t snapshot"
              viewTransitionName="athletos-freebsd-3"
              code={`zroot/data/pgdata@autosnap_2026-07-26_17:24:00_hourly
zroot/data/pgdata@autosnap_2026-07-26_17:24:00_daily
zroot/data/pgdata@autosnap_2026-07-26_17:24:00_monthly`}
            />
          </section>

          <section className="mt-10 text-left">
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              Was it worth it
            </h2>

            <p className="mt-6">
              Absolutely. Stable, reliable &amp; predictable.
              <br />
              I can trust this to keep running.
            </p>
          </section>

          <section className="mt-16 text-left border-t border-primary/20 pt-8">
            <h3 className="text-sm font-semibold tracking-tight text-primary">
              Footnotes
            </h3>

            <p className="mt-4 text-sm text-primary/80">
              <strong>1.</strong> Five things broke on first contact with a real box. Four were ordinary. The fifth was worth remembering:{' '}
              <u>${'{'}name{'}'}_user</u> is a reserved rc.subr variable, and rc.subr wraps your command in <u>su -m</u> before it runs. My rc script named a variable athletos_api_user thinking it was mine, so daemon(8) was already running as that user when it tried to drop privileges to that user. Two privilege drops fighting, and <u>-r</u> retried it forever. The error it prints is &ldquo;failed to set user environment&rdquo;, which sounds like login.conf and is not.
            </p>

            <p className="mt-4 text-sm text-primary/80">
              <strong>2.</strong> CI builds inside a FreeBSD VM and runs the test suite there before producing a binary. Rust is a Tier 2 platform on FreeBSD &mdash; the project builds it but does not test it &mdash; so building and testing on the release you actually deploy to is doing work nobody upstream does for you.
            </p>

            <p className="mt-4 text-sm text-primary/80">
              <strong>3.</strong> ARC takes half your RAM unless told otherwise. On a 4 GB box that is 2 GB it does not need, and it shows up later looking like a database problem. <code>vfs.zfs.arc_max=&quot;512M&quot;</code> in loader.conf, on day one.
            </p>

            <p className="mt-6 text-sm italic underline decoration-wavy text-primary">
              Every number above was measured on the box, not estimated.
            </p>
          </section>

          <div className="mt-16" />
        </article>
      </div>
    </AppLayout>
  );
}
