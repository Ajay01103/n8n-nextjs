import { requireAuth } from "@/lib/server-auth-util"

interface Props {
  params: Promise<{
    executionId: string
  }>
}

const Page = async ({ params }: Props) => {
  await requireAuth()
  const { executionId } = await params

  return <div>Exection {executionId} Page</div>
}

export default Page
