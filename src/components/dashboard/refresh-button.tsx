import React, { useContext } from 'react'
import { Button } from '../ui/button';
import { Loader, RefreshCcw } from 'lucide-react';
import { useRefreshContext } from '@/context/context';

export default function RefreshButton() {
  
  const { fetchMessage, isLoading } = useRefreshContext();

  return (
    <div>
      <Button
            className="mt-4"
            variant={"outline"}
            onClick={(e) => {
              e.preventDefault();
              fetchMessage(true);
            }}
          >
            {isLoading ? (
              <Loader className=" h-4 w-4 animate-spin" />
            ) : (
              <RefreshCcw className=" h-4 w-4" />
            )}
          </Button>
    </div>
  )
}
