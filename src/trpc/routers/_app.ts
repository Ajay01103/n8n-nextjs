import { prisma } from "@/db"
import { createTRPCRouter, protectedProcedure } from "../init"

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
})

// export type definition of API
export type AppRouter = typeof appRouter
