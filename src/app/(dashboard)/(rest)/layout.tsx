import { AppHeader } from "@/components/app-header"

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <AppHeader />
      <main className="flex-1">{children}</main>
    </>
  )
}

export default Layout
