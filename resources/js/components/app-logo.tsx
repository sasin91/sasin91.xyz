import { cn } from '@/lib/utils';
import AppLogoIcon from './app-logo-icon';

export default function AppLogo({ className }: React.ComponentProps<'div'>) {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <div className="flex items-center justify-center p-1 rounded-lg">
                <AppLogoIcon className="size-8" />
            </div>
            <div className="grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-bold text-lg bg-clip-text text-transparent bg-linear-to-r from-purple-500 via-pink-500 to-cyan-400">
                    Jonas Hansen
                </span>
            </div>
        </div>
    );
}
