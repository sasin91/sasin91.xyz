export function Footer() {
    return (
        <footer className="py-12 border-t border-purple-100/50 dark:border-purple-900/20 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center text-sm text-secondary-foreground/60">
                &copy; {new Date().getFullYear()} Jonas Hansen. All rights reserved.
            </div>
        </footer>
    );
}
