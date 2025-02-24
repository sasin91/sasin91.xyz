import { cn } from "~/utils/tailwind";

type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
} & React.ComponentPropsWithoutRef<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">;

export function Heading({ className, level = 1, ...props }: HeadingProps) {
  let Element: `h${typeof level}` = `h${level}`;

  return (
    <Element
      {...props}
      className={cn(
        className,
        "text-2xl/8 font-semibold text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-pink-300 sm:text-xl/8"
      )}
    />
  );
}

export function Subheading({ className, level = 2, ...props }: HeadingProps) {
  let Element: `h${typeof level}` = `h${level}`;

  return (
    <Element
      {...props}
      className={cn(
        className,
        "text-base/7 font-semibold text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-pink-300 sm:text-sm/6"
      )}
    />
  );
}
