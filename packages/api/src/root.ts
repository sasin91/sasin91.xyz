import { authRouter } from "./router/auth";
import { contactRouter } from "./router/contact";
import { playerRouter } from "./router/player";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  contact: contactRouter,
  player: playerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
