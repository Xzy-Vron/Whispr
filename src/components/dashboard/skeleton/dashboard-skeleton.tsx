import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import { Copy, RotateCcw } from "lucide-react"
import MessageCardSkeleton from "./message-card-skeleton"

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      <div className="p-6 space-y-15">
        {/* User Dashboard Card */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-32" />
            </div>
            <Skeleton className="h-9 w-16 rounded-md" />
          </CardHeader>
        </Card>

        {/* Share Link Section */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-20" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 flex-1 rounded-md" />
            <Button variant="ghost" size="icon" className="shrink-0">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Feedbacks Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-20" />
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <RotateCcw className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-8 rounded-full" />
                <Skeleton className="h-4 w-6" />
              </div>
            </div>
          </div>

          {/* Message Card Skeleton */}
          <div className="flex flex-wrap  gap-8">
          <MessageCardSkeleton  />
          <MessageCardSkeleton  />
          <MessageCardSkeleton  />

          </div>
        </div>
      </div>
    </div>
  )
}
