"use client"

import { Plus } from "lucide-react"
import { memo } from "react"
import { Button } from "./ui/button"

export const AddNodeBUtton = memo(() => {
  return (
    <Button
      onClick={() => {}}
      size="icon"
      variant="outline"
      className="bg-background">
      <Plus />
    </Button>
  )
})

AddNodeBUtton.displayName = "AddNodeButton"
