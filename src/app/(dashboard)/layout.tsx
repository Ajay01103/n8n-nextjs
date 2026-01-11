import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-accent/10">{children}</SidebarInset>
    </SidebarProvider>
  )
}

export default Layout
