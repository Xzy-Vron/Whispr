import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function MessageCardSkeleton() {
  return (
    <Card className="bg-card border-border w-100">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-32 mt-4" />
          </div>
          <Skeleton className="h-9 w-9 rounded-md shrink-0" />
        </div>
      </CardContent>
    </Card>
  );
}
