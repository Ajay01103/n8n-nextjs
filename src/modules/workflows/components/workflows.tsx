"use client"

import { useRouter } from "next/navigation"
import { EntityContainer, EntityHeader } from "@/components/entity-components"
import { useUpgradeModal } from "@/hooks/use-upgrade-modal"
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows"

export const WorkflowsList = () => {
  const Workflows = useSuspenseWorkflows()

  return (
    <div className="flex-1 flex justify-center items-center">
      {JSON.stringify(Workflows.data, null, 2)}
    </div>
  )
}

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const router = useRouter()
  const createWorkflow = useCreateWorkflow()
  const { handleError, modal } = useUpgradeModal()

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`)
      },
      onError: (error) => {
        handleError(error)
      },
    })
  }

  return (
    <>
      {modal}
      <EntityHeader
        title="Workflows"
        description="Create and manage your workflows"
        onNew={handleCreate}
        newButtonLabel="New Workflow"
        disabled={disabled}
        isCreating={createWorkflow.isPending}
      />
    </>
  )
}

export const WorkflowsContainer = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<></>}
      pagination={<></>}>
      {children}
    </EntityContainer>
  )
}
