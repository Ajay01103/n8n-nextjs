import { caller } from "@/trpc/server"

export default async function Page() {
  const users = await caller.users()

  return <div>Hello {JSON.stringify(users)}</div>
}
