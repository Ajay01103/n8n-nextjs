import { requireAuth } from "@/lib/server-auth-util"

interface Props {
  params: Promise<{
    credentialId: string
  }>
}

const Page = async ({ params }: Props) => {
  await requireAuth()
  const { credentialId } = await params

  return <p>Credential {credentialId} Page</p>
}

export default Page
