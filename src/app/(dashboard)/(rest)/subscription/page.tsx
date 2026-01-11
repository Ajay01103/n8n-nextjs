"use client"

import { useQuery } from "@tanstack/react-query"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useTRPC } from "@/trpc/client"

export default function SubscriptionTestPage() {
  const trpc = useTRPC()
  const { data, error } = useQuery(trpc.checkPremium.queryOptions())

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Premium Subscription Test</CardTitle>
          <CardDescription>
            Click the button below to test if you have an active premium
            subscription
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* <Button
            onClick={handleTestPremium}
            disabled={checkPremiumMutation.isFetching}
            className="w-full">
            {checkPremiumMutation.isFetching
              ? "Checking..."
              : "Test Premium Status"}
          </Button> */}

          {JSON.stringify(data)}
          {JSON.stringify(error?.message)}
        </CardContent>
      </Card>
    </div>
  )
}
