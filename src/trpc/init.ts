import { initTRPC, TRPCError } from "@trpc/server"
import { headers } from "next/headers"
import { cache } from "react"
import superjson from "superjson"
import { auth } from "@/lib/auth"
import { polarClient } from "@/lib/polar"

export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return {
    session,
    userId: session?.user?.id,
  }
})

type Context = Awaited<ReturnType<typeof createTRPCContext>>

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
})
// Base router and procedure helpers
export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory
export const baseProcedure = t.procedure

export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "needs sign in or register",
    })
  }

  return await next({ ctx: { ...ctx, session: ctx.session } })
})

export const premiumProcedure = protectedProcedure.use(
  async ({ ctx, next }) => {
    const customer = await polarClient.customers.getStateExternal({
      externalId: ctx.session.user.id,
    })

    if (
      !customer.activeSubscriptions ||
      customer.activeSubscriptions.length === 0
    ) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Active subscription required",
      })
    }

    return next({ ctx: { ...ctx, customer } })
  },
)
