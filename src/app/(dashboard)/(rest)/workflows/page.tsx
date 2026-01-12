import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { requireAuth } from "@/lib/server-auth-util"
import {
  WorkflowsContainer,
  WorkflowsList,
} from "@/modules/workflows/components/workflows"
import { prefetchWorkflows } from "@/modules/workflows/server/prefetch"
import { HydrateClient } from "@/trpc/server"

const Page = async () => {
  await requireAuth()
  prefetchWorkflows()

  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<p>Error!!</p>}>
          <Suspense fallback={<p>Loading...</p>}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  )
}

export default Page
