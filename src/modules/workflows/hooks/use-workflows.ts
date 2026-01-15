/**
 *  Hook to fetch all workflows
 */

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useTRPC } from "@/trpc/client"
import { useWorkflowsParams } from "./use-workflows-params"

export const useSuspenseWorkflows = () => {
  const trpc = useTRPC()
  const [params] = useWorkflowsParams()

  return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params))
}

/**
 * Hook to create new workflow
 */
export const useCreateWorkflow = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const trpc = useTRPC()

  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: (data) => {
        toast.success(`workflow ${data.name} created`)
        router.push(`/workflows/${data.id}`)
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}))
      },
      onError: (error) => {
        toast.error(`Failed to create workflow: ${error.message}`)
      },
    }),
  )
}

/**
 * Hook to remove a workflow
 */
export const useRemoveWorkflow = () => {
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  return useMutation(
    trpc.workflows.remove.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow ${data.name} removed`)
        // Invalidate the list query so it refetches without the deleted workflow
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}))
        // Invalidate the single workflow query
        queryClient.invalidateQueries(
          trpc.workflows.getOne.queryOptions({ id: data.id }),
        )
      },
    }),
  )
}
