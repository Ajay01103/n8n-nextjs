"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { useTRPC } from "@/trpc/client"

export default function Page() {
  const { data } = authClient.useSession()

  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const { data: workflows } = useQuery(trpc.getWorkflows.queryOptions())

  const { mutate } = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("workflow created")
        queryClient.invalidateQueries(trpc.getWorkflows.queryOptions())
      },
    }),
  )
  return (
    <div>
      Hello
      {data && (
        <>
          <Button
            variant="destructive"
            onClick={() => authClient.signOut()}>
            Logout
          </Button>
          <Button
            variant="default"
            onClick={() => mutate()}>
            create workflow
          </Button>
        </>
      )}
      <br />
      {JSON.stringify(workflows)}
    </div>
  )
}
