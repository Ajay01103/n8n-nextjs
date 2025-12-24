"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

export default function Page() {
  const { data } = authClient.useSession()

  return (
    <div>
      Hello {JSON.stringify(data)}
      {data && (
        <Button
          variant="destructive"
          onClick={() => authClient.signOut()}>
          Logout
        </Button>
      )}
    </div>
  )
}
