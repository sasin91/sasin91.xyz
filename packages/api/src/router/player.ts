import { z } from "zod";

import { eq, schema } from "@sasin91/db";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const playerRouter = createTRPCRouter({
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) =>
      ctx.db.query.player.findFirst({
        where: eq(schema.player.id, input.id),
      }),
    ),

  create: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        name: z.string().nullable(),
        email: z.string().email().nullable(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.player).values(input);
    }),
});
