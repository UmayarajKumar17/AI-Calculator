"use client";

import { cn } from "@/lib/utils";

interface ColorPaletteProps {
  colors: string[];
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export default function ColorPalette({ colors, selectedColor, onColorChange }: ColorPaletteProps) {
  return (
    <div className="flex items-center gap-3 p-2 bg-card/80 border border-border/20 backdrop-blur-sm rounded-full shadow-lg">
      {colors.map((color) => (
        <button
          key={color}
          aria-label={`Select color ${color}`}
          onClick={() => onColorChange(color)}
          className={cn(
            "w-9 h-9 rounded-full border-2 transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary",
            selectedColor === color ? "scale-125 ring-2 ring-primary ring-offset-2 ring-offset-background" : "border-transparent"
          )}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}
