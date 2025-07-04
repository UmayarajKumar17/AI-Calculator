"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { CheckCircle2 } from "lucide-react";

interface ResultDialogProps {
  result: string | null;
  onOpenChange: (open: boolean) => void;
}

export default function ResultDialog({ result, onOpenChange }: ResultDialogProps) {
  return (
    <AlertDialog open={!!result} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="items-center text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
          <AlertDialogTitle className="font-headline text-3xl pt-2">
            Solution Found!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground text-base pt-2">
            The result of your question is:
            <div className="text-6xl font-bold font-headline text-foreground mt-4 bg-accent/20 p-6 rounded-lg">
              {result}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="pt-4">
          <AlertDialogAction className="w-full text-lg" onClick={() => onOpenChange(false)}>
            Awesome!
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
