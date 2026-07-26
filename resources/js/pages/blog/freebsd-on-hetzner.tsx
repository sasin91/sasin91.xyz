import { Head } from '@inertiajs/react';
import { TerminalIcon, TriangleAlertIcon } from "lucide-react";

import freebsdHeaderImg from '@/../images/blog/freebsd-on-hetzner/header.svg';
import { BackgroundBeams } from "@/components/ui/background-beams";
import { CodeBlock } from "@/components/ui/code-block";
import { Heading } from "@/components/ui/heading";
import { Underline } from "@/components/ui/underline";
import AppLayout from '@/layouts/app-layout';

export function FreeBsdHeader() {
  return (
    <div className="relative flex items-center rounded-xl">
      <BackgroundBeams />
      <img
        alt="FreeBSD 15.1 on root-on-ZFS, with the disk partition layout"
        src={freebsdHeaderImg}
        className="w-full object-fill rounded-xl shadow-sm"
      />
    </div>
  );
}

export default function BlogFreeBsdOnHetzner() {
  return (
    <AppLayout>
      <Head title="Blog :: FreeBSD on Hetzner" />

      <div className="px-6 py-16 text-center sm:py-24 lg:px-8">
        <article className="mx-auto max-w-3xl text-base leading-7 text-primary">
          <FreeBsdHeader />

          <Heading level={1} className="mt-8">
            Installing FreeBSD 15.1 on a Hetzner Cloud VPS
          </Heading>

          <section className="mt-10">
            <h2 className="text-xl font-bold tracking-tight text-primary">
              Hetzner has no FreeBSD image and their ISO library stops at 15.0.
              <br />
              You can still get <Underline active={true}>any</Underline> release on there, unattended, in about an hour.
            </h2>

            <figure className="mt-10 border-l border-indigo-600 pl-9 text-left">
              <blockquote className="font-semibold text-primary-900">
                <p>
                  The box runs AthletOS, a training app I am building. Predefined programs, session logging and tracking.
                </p>
              </blockquote>
              <figcaption className="mt-6 text-sm leading-6 text-left">
                I picked FreeBSD for ZFS boot environments and jails, so a bad deploy is a rollback instead of an incident.
              </figcaption>
            </figure>

            <p className="mt-10 text-left">
              This is the whole procedure, in order, with the things that went wrong and what fixed them.
              <br />
              I used FreeBSD's own ISO rather than a prebuilt image, so the checksum can be verified against the project's manifest.
            </p>
          </section>

          <section className="mt-10 text-left">
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              1. Create the server
            </h2>

            <p className="mt-4">
              A CX23 gives 2 vCPU and 4 GB, which is plenty. Firewall first, then the box.
            </p>

            <CodeBlock
              language="bash"
              filename="1-create-server.sh"
              viewTransitionName="freebsd-hetzner-1"
              code={`hcloud firewall create --name athletos
for p in 22 80 443; do
  hcloud firewall add-rule athletos --direction in --protocol tcp \\
    --port $p --source-ips 0.0.0.0/0 --source-ips ::/0
done

hcloud server create --name athletos --type cx23 --location hel1 \\
  --image debian-12 --ssh-key my-key --firewall athletos`}
            />

            <p className="mt-4 text-sm">
              The image is a throwaway. It only exists so the server boots at all.
            </p>
          </section>

          <section className="mt-10 text-left">
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              2. Boot into rescue
            </h2>

            <CodeBlock
              language="bash"
              filename="2-rescue.sh"
              viewTransitionName="freebsd-hetzner-2"
              code={`hcloud server enable-rescue athletos --ssh-key my-key
hcloud server reset athletos

ssh root@<ip>          # linux rescue, ~1.9GB overlay in RAM`}
            />
          </section>

          <section className="mt-10 text-left">
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              3. Fetch and verify the ISO
            </h2>

            <p className="mt-4">
              Take <u>bootonly</u>, not disc1. The rescue root is a small RAM overlay and a 1.3 GB ISO plus its extraction plus the rebuild will not fit.
            </p>

            <CodeBlock
              language="bash"
              filename="3-fetch-iso.sh"
              viewTransitionName="freebsd-hetzner-3"
              code={`B=https://download.freebsd.org/releases/amd64/amd64/ISO-IMAGES/15.1
I=FreeBSD-15.1-RELEASE-amd64-bootonly.iso

curl -fsSL -o CHECKSUM $B/CHECKSUM.SHA256-FreeBSD-15.1-RELEASE-amd64
curl -fsSL -o $I $B/$I

E=$(grep -E "\\($I\\)" CHECKSUM | sed 's/.*= //')
A=$(sha256sum $I | cut -d' ' -f1)
[ "$E" = "$A" ] && echo "verified" || echo "STOP"`}
            />
          </section>

          <section className="mt-10 text-left">
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              4. Remaster the ISO
            </h2>

            <p className="mt-4">
              Three edits: a serial console, an unattended install script, and one line that the installer will otherwise stop on.
            </p>

            <CodeBlock
              language="bash"
              filename="4-remaster.sh"
              viewTransitionName="freebsd-hetzner-4"
              code={`apt-get install -y xorriso qemu-system-x86

mkdir -p isowork isomnt
mount -o loop,ro $I isomnt && cp -a isomnt/. isowork/ && umount isomnt
chmod -R u+w isowork

# append, never replace: the original carries vfs.root.mountfrom
cat >> isowork/boot/loader.conf <<'EOF'
console="comconsole"
comconsole_speed="115200"
boot_serial="YES"
vfs.root.mountfrom="cd9660:/dev/iso9660/FREEBSD_INSTALL"
EOF

# the serial path asks for a terminal type with an unconditional read
sed -i 's/^\\([[:space:]]*\\)read TERM$/\\1:/' \\
    isowork/usr/libexec/bsdinstall/startbsdinstall

# a scripted install never configures the network
sed -i 's|^mkdir /tmp/bsdinstall_etc$|&\\nifconfig vtnet0 inet 10.0.2.15/24 up\\nroute add default 10.0.2.2\\necho "nameserver 10.0.2.3" > /tmp/bsdinstall_etc/resolv.conf|' \\
    isowork/etc/rc.local`}
            />

            <figcaption className="mt-6 flex gap-x-2 text-sm leading-6 text-primary">
              <TriangleAlertIcon
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 flex-none text-primary"
              />
              <span>
                <strong>What went wrong.</strong> I replaced loader.conf instead of appending, which threw away{' '}
                <u>vfs.root.mountfrom</u> and left it at a mountroot prompt.
                <br />
                Then it hung at "Console type [vt100]:" because that <u>read</u> runs before the script is ever looked for.
                <br />
                Then distfetch died on DNS, because the interactive path exports BSDINSTALL_CONFIGCURRENT and the scripted path does not.
              </span>
            </figcaption>
          </section>

          <section className="mt-10 text-left">
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              5. Write the unattended install script
            </h2>

            <CodeBlock
              language="bash"
              filename="isowork/etc/installerconfig"
              viewTransitionName="freebsd-hetzner-5"
              code={`PARTITIONS=DEFAULT
DISTRIBUTIONS="kernel.txz base.txz"
export ZFSBOOT_VDEV_TYPE=stripe
export ZFSBOOT_DISKS=vtbd0
export ZFSBOOT_SWAP_SIZE=2g
export ZFSBOOT_CONFIRM_LAYOUT=0
export nonInteractive=YES
export BSDINSTALL_DISTSITE=http://10.0.2.2:8000

#!/bin/sh
sysrc hostname="athletos"
sysrc ifconfig_vtnet0="DHCP"
sysrc sshd_enable="YES"
sysrc zfs_enable="YES"

# ARC takes half of RAM by default. On a 4GB box that is 2GB it does not
# need, and it turns up later looking like a database problem.
echo 'vfs.zfs.arc_max="512M"' >> /boot/loader.conf

mkdir -p /root/.ssh && chmod 700 /root/.ssh
echo 'ssh-ed25519 AAAA... you@host' > /root/.ssh/authorized_keys
chmod 600 /root/.ssh/authorized_keys`}
            />

            <p className="mt-4">
              10.0.2.2 is QEMU's host address. Serving the distribution sets from rescue skips DNS entirely and is quicker than fetching them twice.
            </p>

            <CodeBlock
              language="bash"
              filename="5-serve-dist.sh"
              viewTransitionName="freebsd-hetzner-6"
              code={`mkdir -p dist && cd dist
B=https://download.freebsd.org/releases/amd64/15.1-RELEASE
for f in MANIFEST base.txz kernel.txz; do curl -fsSL -O $B/$f; done

while read -r name sha rest; do
  [ -f "$name" ] || continue
  [ "$(sha256sum "$name" | cut -d' ' -f1)" = "$sha" ] && echo "OK $name"
done < MANIFEST

setsid nohup python3 -m http.server 8000 >/dev/null 2>&1 &`}
            />
          </section>

          <section className="mt-10 text-left">
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              6. Build the ISO and wipe the disk
            </h2>

            <p className="mt-4">
              Delete the source ISO before building, or you run out of space in the overlay.
            </p>

            <CodeBlock
              language="bash"
              filename="6-build-and-wipe.sh"
              viewTransitionName="freebsd-hetzner-7"
              code={`rm -f $I
xorriso -as mkisofs -r -V FREEBSD_INSTALL -b boot/cdboot -no-emul-boot \\
        -o athletos-install.iso isowork/
rm -rf isowork

# zfs labels sit at both ends of the device, so wipefs alone is not enough
SECTORS=$(blockdev --getsz /dev/sda)
MIB=$(( SECTORS / 2048 ))
wipefs -a /dev/sda
dd if=/dev/zero of=/dev/sda bs=1M count=64 conv=fsync
dd if=/dev/zero of=/dev/sda bs=1M seek=$(( MIB - 64 )) count=64 conv=fsync`}
            />

            <figcaption className="mt-6 flex gap-x-2 text-sm leading-6 text-primary">
              <TriangleAlertIcon
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 flex-none text-primary"
              />
              <span>
                <strong>What went wrong.</strong> An earlier attempt got far enough to create a zroot pool before failing.
                <br />
                The next run found it and stopped to ask for a different pool name, which is another dialog nobody is there to answer. Wipe both ends between attempts.
              </span>
            </figcaption>
          </section>

          <section className="mt-10 text-left">
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              7. Run the installer under QEMU
            </h2>

            <p className="mt-4">
              Hetzner Cloud has no nested virtualisation, so there is no /dev/kvm and this runs under TCG emulation.
              <br />
              It takes roughly half an hour. Nothing to do but watch the log.
            </p>

            <CodeBlock
              language="bash"
              filename="7-install.sh"
              viewTransitionName="freebsd-hetzner-8"
              code={`qemu-system-x86_64 -accel tcg,thread=multi -m 2048 -smp 2 \\
  -drive file=/dev/sda,format=raw,if=virtio,cache=writeback \\
  -cdrom athletos-install.iso -boot d \\
  -netdev user,id=n0 -device virtio-net-pci,netdev=n0 \\
  -display none -monitor none -serial file:/root/install.log -daemonize

grep -aoE "Running installation step: [a-z]+" /root/install.log | uniq
# zfsboot mount distfetch checksum distextract bootconfig config
# entropy umount script`}
            />

            <p className="mt-4 text-sm">
              Kill QEMU once the script step finishes, or it reboots straight back into the installer.
            </p>
          </section>

          <section className="mt-10 text-left">
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              8. Boot it, and fix fstab
            </h2>

            <CodeBlock
              language="bash"
              filename="8-boot.sh"
              viewTransitionName="freebsd-hetzner-9"
              code={`hcloud server disable-rescue athletos
hcloud server reset athletos

ssh root@<ip>

# the installer ran under qemu virtio (vtbd0), hetzner presents da0.
# the pool is fine because zfs scans devices. swap is not.
printf '/dev/gpt/swap0\\tnone\\tswap\\tsw\\t0\\t0\\n' > /etc/fstab
swapon -a`}
            />

            <figcaption className="mt-6 flex gap-x-2 text-sm leading-6 text-primary">
              <TriangleAlertIcon
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 flex-none text-primary"
              />
              <span>
                <strong>What went wrong.</strong> The generated fstab pointed at /dev/vtbd0p2, which does not exist on the real machine.
                <br />
                It booted with no swap and said nothing about it. Refer to it by GPT label and the device name stops mattering.
              </span>
            </figcaption>
          </section>

          <section className="mt-10 text-left">
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              Result
            </h2>

            <CodeBlock
              language="bash"
              filename="athletos"
              viewTransitionName="freebsd-hetzner-10"
              code={`FreeBSD athletos 15.1-RELEASE ... GENERIC amd64

zroot            658M / 34.2G      all pools are healthy
/dev/gpt/swap0   2.0G                     0% used
vfs.zfs.arc_max  536870912                (512 MiB)

1  gptboot0   512 KiB   A501  freebsd-boot
2  swap0      2.0 GiB   A502  freebsd-swap
3  zfs0      36.1 GiB   A504  freebsd-zfs`}
            />

            <figcaption className="mt-6 flex gap-x-2 text-sm leading-6 text-primary">
              <TerminalIcon
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 flex-none text-primary"
              />
              15.1 on root-on-ZFS, a release the ISO library does not carry, from media you can verify.
            </figcaption>

            <p className="mt-10">
              The same steps work for any release. Change the version in step 3 and the rest follows.
            </p>

            <p className="mt-6 text-sm italic underline decoration-wavy text-primary">
              Every command above ran against a real CX23 in hel1.
            </p>
          </section>

          <div className="mt-16" />
        </article>
      </div>
    </AppLayout>
  );
}
