import type { NodeTypes } from "@xyflow/react"
import { initialNode } from "@/components/initial-node"
import { NodeType } from "@/db/generated/enums"

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 5,
  MAX_PAGE_SIZE: 100,
  MIN_PAGE_SIZE: 1,
}

export const nodeComponents = {
  [NodeType.INITIAL]: initialNode,
} as const satisfies NodeTypes

export type RegisterNodeType = keyof typeof nodeComponents
