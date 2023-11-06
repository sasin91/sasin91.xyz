import type { PropsWithChildren } from "react";

import type { Props } from "~/app/types/Props";

export default function GameLayout({ children }: PropsWithChildren<Props>) {
  return (
    <main className="absolute isolate m-0 h-full w-full overscroll-none bg-black p-0">
      {children}
    </main>
  );
}
