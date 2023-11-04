import type { LabelHTMLAttributes, PropsWithChildren } from "react";

import { cn } from "~/utils/tailwind";

export default function InputLabel({
  children,
  className,
  ...rest
}: PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement>>) {
  return (
    <label
      {...rest}
      className={cn(
        "block text-sm font-medium leading-6 text-gray-900",
        className,
      )}
    >
      {children}
    </label>
  );
}
