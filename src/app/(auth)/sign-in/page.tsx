import { requireUnAuth } from "@/lib/server-auth-util"
import { SignInForm } from "@/modules/auth/components/sign-in-form"

const Page = async () => {
  await requireUnAuth()

  return <SignInForm />
}

export default Page
