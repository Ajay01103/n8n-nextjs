import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { requireAuth } from "@/lib/server-auth-util"
import {
  Editor,
  EditorError,
  EditorLoading,
} from "@/modules/editor/components/editor"
import { EditorHeader } from "@/modules/editor/components/edtor-header"
import { prefetchWorkflow } from "@/modules/workflows/server/prefetch"
import { HydrateClient } from "@/trpc/server"

interface Props {
  params: Promise<{
    workflowId: string
  }>
}

const Page = async ({ params }: Props) => {
  await requireAuth()
  const { workflowId } = await params
  prefetchWorkflow(workflowId)

  return (
    <div className="flex h-screen flex-col">
      <HydrateClient>
        <ErrorBoundary fallback={<EditorError />}>
          <Suspense fallback={<EditorLoading />}>
            <EditorHeader workflowId={workflowId} />
            <main className="flex-1">
              <Editor workflowId={workflowId} />
            </main>
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </div>
  )
}

export default Page
