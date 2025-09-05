
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface NameCardProps {
  username: string
  messageAcceptance: boolean
}

export function NameCard({username, messageAcceptance}: NameCardProps) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4  *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs  @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>User Dashboard</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Hello, {username}
          </CardTitle>
          <CardAction>
            {messageAcceptance? (
              <Badge variant="secondary" className="bg-green-500 w-20 text-white dark:bg-green-900">
                Open
              </Badge>
            ) : (
              <Badge variant="destructive" className="w-20">
                Closed
              </Badge>
            )}
          </CardAction>
        </CardHeader>
        {/* <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter> */}
      </Card>
    </div>
  )
}
