import React from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { MailX } from "lucide-react";
import { Message } from "@/models/User";
import { toast } from "sonner";
import axios from "axios";

type messageCardProps = {
  message: Message;
  onMessageDelete: (messageId: any) => void;
};

export default function MessageCard({
  message,
  onMessageDelete,
}: messageCardProps) {
  const handleDeleteConfirm = async () => {
    const promise = axios.delete(`/api/delete-message/${message._id}`);
    toast.promise(promise, {
      loading: "Deleting message...",
      success: (res) => {
        return res.data.message;
      },
      error: (res) => {
        return res.data.message;
      },
    });
    onMessageDelete(message._id);
  };

  const options  = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Asia/Kolkata", // IST timezone
  } as const;

  const formatter = new Intl.DateTimeFormat("en-GB", options);
  let formattedDate = formatter.format(new Date(message.createdAt));

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>{message.content}</CardTitle>
        <CardAction>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="cursor-pointer" variant="destructive">
                <MailX size={15} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your message.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDeleteConfirm()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardAction>
      </CardHeader>
      {/* <CardContent>
      </CardContent> */}
      <CardFooter>
        <CardDescription className="text-sm text-muted-foreground">
          {formattedDate}
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
