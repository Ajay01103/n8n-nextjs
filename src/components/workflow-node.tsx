"use client"

import { NodeToolbar, Position } from "@xyflow/react"
import { Settings, Trash } from "lucide-react"
import { Button } from "./ui/button"

interface Props {
  children: React.ReactNode
  showToolbar?: boolean
  onDelete?: () => void
  onSettings?: () => void
  name?: string
  description?: string
}

export function WorkflowNode({
  children,
  description,
  name,
  onDelete,
  onSettings,
  showToolbar,
}: Props) {
  return (
    <>
      {showToolbar && (
        <NodeToolbar>
          <Button
            size="sm"
            variant="ghost"
            onClick={onSettings}>
            <Settings className="size-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onDelete}>
            <Trash />
          </Button>
        </NodeToolbar>
      )}
      {children}
      {name && (
        <NodeToolbar
          position={Position.Bottom}
          isVisible
          className="max-w-50 text-center">
          <p className="font-medium">{name}</p>
          {description && (
            <p className="text-muted-foreground truncate text-sm">
              {description}
            </p>
          )}
        </NodeToolbar>
      )}
    </>
  )
}
