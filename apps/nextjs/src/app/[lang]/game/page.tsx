import type { Session } from "@sasin91/auth";
import { signIn } from "@sasin91/auth";

import Game from "~/app/_components/game/game";
import GameUI from "~/app/_components/game/game-ui";
import { useTranslation } from "~/app/i18n";
import type { Props } from "~/app/types/Props";

export default async function GamePage({ params }: Props) {
  const { t } = await useTranslation(params.lang);

  const session: Session = {
    user: { id: "1", name: "testing" },
    expires: "never",
  };
  // const session = await auth();

  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center">
        <form
          action={async () => {
            "use server";
            await signIn("discord");
          }}
        >
          <button className="group rounded-full bg-gradient-to-r from-indigo-200 via-violet-400 to-cyan-200 px-4 text-lg font-semibold leading-8 tracking-tight text-black hover:underline">
            {t("projects.game.login.discord")}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full" id="container">
      <Game />
      <GameUI session={session} />
    </div>
  );
}
