import React from "react";
import {
  Card,
  CardAction,
  CardContent,
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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { MailX } from "lucide-react";
import { Message } from "@/models/User";
import { toast } from "sonner";
import axios from "axios";

type messageCardProps = {
  message : Message,
  onMessageDelete : (messageId : any) => void
};

export default function MessageCard({ message, onMessageDelete }: messageCardProps) {

  const handleDeleteConfirm = async () => {
    const response = await axios.delete(`/api/delete-message/${message._id}`);
    toast.success("Deleted your Message successfully!");
    onMessageDelete(message._id);
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>
          <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">< MailX  size={15}/></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            message.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={(() => handleDeleteConfirm())}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
        </CardAction>
      </CardHeader>
      {/* <CardContent>
      </CardContent>
      <CardFooter>
      </CardFooter> */}
    </Card>
  );
}