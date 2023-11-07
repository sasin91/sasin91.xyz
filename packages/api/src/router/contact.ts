import { z } from "zod";

import { schema } from "@sasin91/db";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const contactRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        companyName: z.string().max(255),
        contactPerson: z.string().max(255),
        email: z.string().max(255).email(),
        phone: z.string().max(255),
        message: z.string().max(65534),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.contactRequest).values(input);
    }),
});
