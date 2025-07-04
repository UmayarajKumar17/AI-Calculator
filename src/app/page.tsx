"use client";

import { useRef, useState } from "react";
import { Loader2, Eraser, PenLine } from "lucide-react";

import { solveQuestion } from "@/ai/flows/solve-math-expression";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ColorPalette from "@/components/math-canvas-solver/color-palette";
import MathCanvas, { type MathCanvasHandle } from "@/components/math-canvas-solver/math-canvas";
import ResultDialog from "@/components/math-canvas-solver/result-dialog";
import { Toaster } from "@/components/ui/toaster";


export default function MathCanvasSolverPage() {
  const [selectedColor, setSelectedColor] = useState<string>("#FFFFFF");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const canvasRef = useRef<MathCanvasHandle>(null);
  const { toast } = useToast();

  const colors = ['#FFFFFF', '#FFD700', '#00FFFF', '#FF00FF', '#39FF14'];

  const handleRun = async () => {
    if (!canvasRef.current) return;
    
    const photoDataUri = canvasRef.current.getCanvasAsDataURL();
    if (!photoDataUri) {
      toast({
        variant: "destructive",
        title: "Canvas is empty",
        description: "Please draw a question before running.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await solveQuestion({ photoDataUri });
      setResult(response.result);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Could not solve the question. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    canvasRef.current?.clearCanvas();
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background font-body">
      <header className="absolute top-0 left-1/2 -translate-x-1/2 z-10 p-4">
        <ColorPalette colors={colors} selectedColor={selectedColor} onColorChange={setSelectedColor} />
      </header>

      <MathCanvas ref={canvasRef} color={selectedColor} lineWidth={8} />
      
      <div className="absolute bottom-6 right-6 z-10 flex items-center gap-4">
        <Button variant="outline" size="icon" className="bg-card/80 backdrop-blur-sm rounded-full w-14 h-14 shadow-lg" onClick={handleClear} aria-label="Clear Canvas">
          <Eraser className="h-6 w-6" />
        </Button>
        <Button size="lg" className="font-headline bg-accent text-accent-foreground hover:bg-accent/90 rounded-full h-16 w-32 text-xl shadow-xl" onClick={handleRun} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              Solving
            </>
          ) : (
            "Run"
          )}
        </Button>
      </div>

      <ResultDialog result={result} onOpenChange={(open) => !open && setResult(null)} />
      <Toaster />
    </div>
  );
}
