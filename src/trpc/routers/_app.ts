import { prisma } from "@/db"
import { baseProcedure, createTRPCRouter } from "../init"
export const appRouter = createTRPCRouter({
  users: baseProcedure.query(async () => {
    return await prisma.user.findMany()
  }),
})
// export type definition of API
export type AppRouter = typeof appRouter
