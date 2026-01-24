import type { NodeProps } from "@xyflow/react"
import { PlusIcon } from "lucide-react"
import { memo } from "react"
import { PlaceholderNode } from "./react-flow/placeholder-node"
import { WorkflowNode } from "./workflow-node"

export const initialNode = memo((props: NodeProps) => {
  return (
    <WorkflowNode showToolbar={true}>
      <PlaceholderNode
        {...props}
        onClick={() => {}}>
        <div className="cursor-pointer flex items-center justify-center">
          <PlusIcon className="size-4" />
        </div>
      </PlaceholderNode>
    </WorkflowNode>
  )
})

initialNode.displayName = "InitialNode"
