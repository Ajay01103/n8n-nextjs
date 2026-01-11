import { requireAuth } from "@/lib/server-auth-util"

const Page = async () => {
  await requireAuth()

  return <div>Credentials Page</div>
}

export default Page
