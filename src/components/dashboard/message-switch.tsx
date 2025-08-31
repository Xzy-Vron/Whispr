import React from "react";
import { Switch } from "../ui/switch";
import { useAcceptMessageContext } from "@/context/useContext";
import { Card } from "../ui/card";


export default function MessageSwitch() {

  const { register, acceptMessages, handleSwitchChange, isSwitchLoading } = useAcceptMessageContext();

  return (
    <Card className="flex-row w-25 py-2 gap-1 rounded-sm px-4">
      <Switch
        className="mt-0.5"
        {...register("acceptMessages")}
        checked={acceptMessages}
        onCheckedChange={handleSwitchChange}
        disabled={isSwitchLoading}
      />
      <span className="leading-none font-medium flex items-center text-sm">
        {acceptMessages ? " ON" : " OFF"}
      </span>
    </Card>
  );
}
