import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

type EntityHeaderProps = {
  title: string
  description?: string
  newButtonLabel: string
  disabled?: boolean
  isCreating?: boolean
} & (
  | { onNew: () => void; newButtonHref?: never }
  | { newButtonHref: string; onNew?: never }
  | { onNew?: never; newButtonHref?: never }
)

export const EntityHeader = ({
  title,
  description,
  onNew,
  newButtonHref,
  disabled,
  isCreating,
  newButtonLabel,
}: EntityHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between gap-x-4">
      <div className="flex flex-col">
        <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
        {description && (
          <p className="text-xs md:text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {onNew && !newButtonHref && (
        <Button
          disabled={isCreating || disabled}
          size="sm" // disabled if needed
          onClick={onNew}>
          <Plus className="size-4" />
          {newButtonLabel}
        </Button>
      )}
      {newButtonHref && !onNew && (
        <Button
          size="sm" // disabled if needed
        >
          <Link
            href={newButtonHref}
            prefetch>
            <Plus className="size-4" />
            {newButtonLabel}
          </Link>
          {newButtonLabel}
        </Button>
      )}
    </div>
  )
}

type EntityContainerProps = {
  children: React.ReactNode
  header?: React.ReactNode
  search?: React.ReactNode
  pagination?: React.ReactNode
}

export const EntityContainer = ({
  children,
  header,
  pagination,
  search,
}: EntityContainerProps) => {
  return (
    <div className="p-4 md:px-10 md:py-6 h-full">
      <div className="mx-auto max-w-7xl w-full flex flex-col gap-y-6 h-full">
        {header}
        <div className="flex flex-col gap-y-4 h-full">
          {search}

          {children}
        </div>
        {pagination}
      </div>
    </div>
  )
}

interface EntitySearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const EntitySearch = ({
  onChange,
  value,
  placeholder = "Search",
}: EntitySearchProps) => {
  return (
    <div className="relative ml-auto">
      <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      <Input
        className="max-w-50 bg-background shadow-none border-border pl-8"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

interface EntityPaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  disabled?: boolean
}

export const EntityPagination = ({
  onPageChange,
  page,
  totalPages,
  disabled,
}: EntityPaginationProps) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {page} of {totalPages || 1}
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          disabled={page === 1 || disabled}
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, page - 1))}>
          Previous
        </Button>
        <Button
          disabled={page === totalPages || totalPages === 0 || disabled}
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}>
          Next
        </Button>
      </div>
    </div>
  )
}
