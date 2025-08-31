import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface CopyLinkCardProps {
  messageUrl: string;
}

export function CopyLinkCard({ messageUrl }: CopyLinkCardProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(messageUrl);
    toast.success("Copied to clipboard");
  };

  return (
    <>
      <div className="mt-15">
        <div className="scroll-m-20 text-2xl font-semibold tracking-tight">Share Link</div>
        <Separator className="my-2" />
        <div>
          <Card className="w-full py-1 rounded-lg flex">
            <CardContent className="flex justify-between items-center">
              <p className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">{messageUrl}</p>
              <Button
                variant={"outline"}
                className="bg-gray-100 text-white dark:bg-neutral-900 bg-blur  rounded"
                onClick={copyToClipboard}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

{
  /* <CardHeader>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Link
          </CardTitle>
      </CardHeader> */
}


