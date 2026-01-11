import { prisma } from "@/db"
import { inngest } from "@/inngest/client"
import { createTRPCRouter, premiumProcedure, protectedProcedure } from "../init"

export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(async ({ ctx }) => {
    return prisma.workflow.findMany()
  }),
  createWorkflow: protectedProcedure.mutation(() => {
    return prisma.workflow.create({
      data: {
        name: "test-workflow",
      },
    })
  }),
  testAI: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "execute/ai",
    })

    return { success: true }
  }),
  checkPremium: premiumProcedure.query(({ ctx }) => {
    return {
      isPremium: true,
      subscriptions: ctx.customer.activeSubscriptions,
      message: "You have an active premium subscription!",
    }
  }),
})

// export type definition of API
export type AppRouter = typeof appRouter
