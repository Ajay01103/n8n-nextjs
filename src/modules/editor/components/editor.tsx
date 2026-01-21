"use client"

import "@xyflow/react/dist/style.css"
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  type Connection,
  Controls,
  type Edge,
  type EdgeChange,
  MiniMap,
  type Node,
  type NodeChange,
  Panel,
  ReactFlow,
} from "@xyflow/react"
import { useCallback, useState } from "react"
import { AddNodeBUtton } from "@/components/add-node-button"
import { ErrorView, LoadingView } from "@/components/entity-components"
import { nodeComponents } from "@/constants"
import { useSuspenseWorkflow } from "@/modules/workflows/hooks/use-workflows"

interface Props {
  workflowId: string
}

export const Editor = ({ workflowId }: Props) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId)

  const [nodes, setNodes] = useState<Node[]>(workflow.nodes)
  const [edges, setEdges] = useState<Edge[]>(workflow.edges)

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  )
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  )
  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  )

  return (
    <div className="size-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeComponents}
        // proOptions={{
        //   hideAttribution: true,
        // }}
      >
        <Background />
        <Controls />
        <MiniMap />
        <Panel position="top-right">
          <AddNodeBUtton />
        </Panel>
      </ReactFlow>
    </div>
  )
}

export const EditorLoading = () => {
  return <LoadingView message="Loading Editor..." />
}

export const EditorError = () => {
  return <ErrorView message="Error Loading editor" />
}
