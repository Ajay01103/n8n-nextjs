import { requireAuth } from "@/lib/server-auth-util"

interface Props {
  params: Promise<{
    workflowId: string
  }>
}

const Page = async ({ params }: Props) => {
  await requireAuth()
  const { workflowId } = await params

  return <div>Execution {workflowId} Page</div>
}

export default Page
