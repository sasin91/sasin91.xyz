import { AppWindowIcon, ClipboardCheckIcon, CogIcon, DatabaseIcon, HistoryIcon, LockIcon, RefreshCwIcon, ShieldCheckIcon, UploadCloudIcon } from "lucide-react";
import type { HTMLProps } from "react";

type Feature = { name: string; description: string; icon: React.ReactNode };

function FeatureCard(feature: Feature) {
    return (
        <div className="pt-6">
            <div className="flow-root h-full px-6 pb-8 rounded-lg shadow-lg shadow-sky-200 dark:shadow-purple-500 dark:bg-purple-50/10 bg-sky-100/10">
                <div className="-mt-6">
                    <div>
                        <span className="inline-flex items-center justify-center p-3 shadow-lg bg-secondary rounded-xl">
                            {feature.icon}
                        </span>
                    </div>
                    <h3 className="mt-8 text-lg font-semibold leading-8 tracking-tight text-primary">
                        {feature.name}
                    </h3>
                    <p className="mt-5 text-base leading-7 text-secondary-foreground">
                        {feature.description}
                    </p>
                </div>
            </div>
        </div>
    );
}

export function FeatureSection(props: HTMLProps<HTMLDivElement>) {
    return (
        <div {...props} className="pb-8 mt-32 overflow-hidden sm:mt-40">
            <div className="max-w-md px-6 mx-auto text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
                <h2 className="text-lg font-semibold text-sky-400">
                    Get in the air safely and quickly
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                    With me on the team, you have a teammate who can lift a bit of everything
                </p>
                <div className="mt-20">
                    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                        <FeatureCard
                            name="Servers"
                            description="I have experience with many different Linux distros, and can set up a server or a cluster from scratch."
                            icon={<UploadCloudIcon className="w-8 h-8 text-primary" />}
                        />
                        <FeatureCard
                            name="Security 🛡️"
                            description="I have, among other things, worked with setting up secured VPN networks and has experience in making secure web applications."
                            icon={<LockIcon className="w-8 h-8 text-primary" />}
                        />
                        <FeatureCard
                            name="Backend API development ⚙️"
                            description="I have experience in creating APIs in Laravel, and have, among other things, made an API for a video streaming platform and a ticket booking platform."
                            icon={<CogIcon className="w-8 h-8 text-primary" />}
                        />
                        <FeatureCard
                            name="Automated testing"
                            description="I have experience doing automated tests in Laravel and Symfony with PHPUnit, I make use of TDD as far and as possible."
                            icon={<ShieldCheckIcon className="w-8 h-8 text-primary" />}
                        />
                        <FeatureCard
                            name="Databases 🍩"
                            description="I have extensive experience with MySQL, MariaDB"
                            icon={<DatabaseIcon className="w-8 h-8 text-primary" />}
                        />
                        <FeatureCard
                            name="Frontend development ✨"
                            description="I have experience in creating frontends in Vue, React and Laravel blade Livewire."
                            icon={<RefreshCwIcon className="w-8 h-8 text-primary" />}
                        />
                        <FeatureCard
                            name="App development 📱"
                            description="I have experience in making apps in React Native incl. native modules in Java/Kotlin"
                            icon={<AppWindowIcon className="w-8 h-8 text-primary" />}
                        />
                        <FeatureCard
                            name="Version Control"
                            description="I have experience with Git and have, among other things, used it to keep track of my own projects as well as projects at work."
                            icon={<ClipboardCheckIcon className="w-8 h-8 text-primary" />}
                        />
                        <FeatureCard
                            name="Backups 💾"
                            description="I have learned how important it is to have backups of one's data, and have experience in making backups of databases and files."
                            icon={<HistoryIcon className="w-8 h-8 text-primary" />}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
