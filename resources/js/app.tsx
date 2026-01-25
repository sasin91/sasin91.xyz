import '../css/app.css';

import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { toast } from 'sonner';

import { Toaster } from '@/components/ui/sonner';

import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <App {...props} />
                <Toaster />
            </StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

router.on('flash', (event) => {
    const flash = event.detail.flash as Record<string, string> | undefined;

    if (!flash) return;

    Object.entries(flash).forEach(([type, message]) => {
        if (message && type in toast && typeof toast[type as keyof typeof toast] === 'function') {
            const toastFn = toast[type as keyof typeof toast] as (message: string) => void;
            toastFn(message);
        }
    });
});

// This will set light / dark mode on load...
initializeTheme();
