"use client"

import {
  CreditCard,
  FolderOpen,
  History,
  Key,
  LogOut,
  Star,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"
import { useHasActiveSubscription } from "@/modules/subscriptions/hooks/use-subscription"
import { Button } from "./ui/button"

const menuItems = [
  {
    title: "Home",
    items: [
      {
        title: "Workflows",
        icon: FolderOpen,
        url: "/workflows",
      },
      {
        title: "Credentials",
        icon: Key,
        url: "/credentials",
      },
      {
        title: "Execution",
        icon: History,
        url: "/executions",
      },
    ],
  },
]

export const AppSidebar = () => {
  const router = useRouter()
  const pathname = usePathname()

  const { hasActiveSubscription, isLoading } = useHasActiveSubscription()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Image
                src="/logo.svg"
                alt="nodebase"
                width={36}
                height={36}
              />
              <Link
                href="/workflows"
                prefetch>
                <span className="font-semibold">Nodebase</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Link
                      href={item.url}
                      prefetch>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={
                          item.url === "/"
                            ? pathname === "/"
                            : pathname.startsWith(item.url)
                        }>
                        <item.icon />
                        {item.title}
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {!hasActiveSubscription && !isLoading && (
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Upgrade to pro"
                onClick={() => authClient.checkout({ slug: "Nodebase-Pro" })}>
                <Star className="size-4" />
                <span>Upgrade to pro</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Billing Portal"
              onClick={() => authClient.customer.portal()}>
              <CreditCard className="size-4" />
              <span>Billing Portal</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/sign-in")
                    },
                  },
                })
              }>
              <LogOut className="size-4" />
              <span>Logout</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
