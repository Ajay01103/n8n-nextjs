import { requireUnAuth } from "@/lib/server-auth-util"
import { SignUpForm } from "@/modules/auth/components/sign-up-form"

const Page = async () => {
  await requireUnAuth()

  return <SignUpForm />
}

export default Page
