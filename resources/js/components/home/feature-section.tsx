import { AppWindowIcon, ClipboardCheckIcon, CogIcon, DatabaseIcon, HistoryIcon, LockIcon, RefreshCwIcon, ShieldCheckIcon, UploadCloudIcon } from "lucide-react";
import type { HTMLProps } from "react";

type Feature = { name: string; description: string; icon: React.ReactNode };

function FeatureCard(feature: Feature) {
    return (
        <div className="pt-6 h-full">
            <div className="flow-root h-full px-6 pb-8 rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 ring-1 ring-black/5">
                <div className="-mt-6">
                    <div>
                        <span className="inline-flex items-center justify-center p-3 shadow-lg rounded-xl bg-linear-to-br from-purple-500/10 via-pink-400/10 to-cyan-400/10 ring-1 ring-white/20 backdrop-blur-sm">
                            {feature.icon}
                        </span>
                    </div>
                    <h3 className="mt-8 text-lg font-bold leading-8 tracking-tight text-primary">
                        {feature.name}
                    </h3>
                    <p className="mt-5 text-base leading-7 text-secondary-foreground/90">
                        {feature.description}
                    </p>
                </div>
            </div>
        </div>
    );
}

export function FeatureSection(props: HTMLProps<HTMLDivElement>) {
    return (
        <section {...props} className="py-24 sm:py-32">
            <div className="max-w-7xl px-6 mx-auto lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-cyan-500 uppercase tracking-wide">
                        My Skillset
                    </h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        A versatile developer for your team
                    </p>
                    <p className="mt-6 text-lg leading-8 text-secondary-foreground">
                        I bring a diverse set of skills to the table, ready to tackle challenges across the full stack.
                    </p>
                </div>

                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        <FeatureCard
                            name="Servers"
                            description="I have experience with many different Linux distros, and can set up a server or a cluster from scratch."
                            icon={<UploadCloudIcon className="w-6 h-6 text-purple-500" />}
                        />
                        <FeatureCard
                            name="Security 🛡️"
                            description="I have, among other things, worked with setting up secured VPN networks and has experience in making secure web applications."
                            icon={<LockIcon className="w-6 h-6 text-pink-500" />}
                        />
                        <FeatureCard
                            name="Backend API development ⚙️"
                            description="I have experience in creating APIs in Laravel, and have, among other things, made an API for a video streaming platform and a ticket booking platform."
                            icon={<CogIcon className="w-6 h-6 text-cyan-500" />}
                        />
                        <FeatureCard
                            name="Automated testing"
                            description="I have experience doing automated tests in Laravel and Symfony with PHPUnit, I make use of TDD as far and as possible."
                            icon={<ShieldCheckIcon className="w-6 h-6 text-purple-400" />}
                        />
                        <FeatureCard
                            name="Databases 🍩"
                            description="I have extensive experience with MySQL, MariaDB"
                            icon={<DatabaseIcon className="w-6 h-6 text-pink-400" />}
                        />
                        <FeatureCard
                            name="Frontend development ✨"
                            description="I have experience in creating frontends in Vue, React and Laravel blade Livewire."
                            icon={<RefreshCwIcon className="w-6 h-6 text-cyan-400" />}
                        />
                        <FeatureCard
                            name="App development 📱"
                            description="I have experience in making apps in React Native incl. native modules in Java/Kotlin"
                            icon={<AppWindowIcon className="w-6 h-6 text-purple-500" />}
                        />
                        <FeatureCard
                            name="Version Control"
                            description="I have experience with Git and have, among other things, used it to keep track of my own projects as well as projects at work."
                            icon={<ClipboardCheckIcon className="w-6 h-6 text-pink-500" />}
                        />
                        <FeatureCard
                            name="Backups 💾"
                            description="I have learned how important it is to have backups of one's data, and have experience in making backups of databases and files."
                            icon={<HistoryIcon className="w-6 h-6 text-cyan-500" />}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
