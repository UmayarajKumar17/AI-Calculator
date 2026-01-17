"use client";

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { cn } from "@/lib/utils";

interface MathCanvasProps {
  color?: string;
  lineWidth?: number;
  className?: string;
}

export interface MathCanvasHandle {
  clearCanvas: () => void;
  getCanvasAsDataURL: () => string | null;
}

const MathCanvas = forwardRef<MathCanvasHandle, MathCanvasProps>(
  ({ color = '#000000', lineWidth = 5, className }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const isDrawing = useRef(false);
    const hasDrawn = useRef(false);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const context = canvas.getContext('2d');
      if (!context) return;

      context.lineCap = 'round';
      context.lineJoin = 'round';
      contextRef.current = context;

      const resizeCanvas = () => {
        const { width, height } = canvas.getBoundingClientRect();
        if (canvas.width !== width || canvas.height !== height) {
          const tempCanvas = document.createElement('canvas');
          const tempCtx = tempCanvas.getContext('2d');
          tempCanvas.width = canvas.width;
          tempCanvas.height = canvas.height;
          if (tempCtx && hasDrawn.current) {
              tempCtx.drawImage(canvas, 0, 0);
          }
          canvas.width = width;
          canvas.height = height;
          if (contextRef.current) {
            contextRef.current.lineCap = 'round';
            contextRef.current.lineJoin = 'round';
            contextRef.current.strokeStyle = color;
            contextRef.current.lineWidth = lineWidth;
            if(hasDrawn.current) {
                contextRef.current.drawImage(tempCanvas, 0, 0);
            }
          }
        }
      };
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }, [color, lineWidth]);

    useEffect(() => {
      if (contextRef.current) {
        contextRef.current.strokeStyle = color;
        contextRef.current.lineWidth = lineWidth;
      }
    }, [color, lineWidth]);

    const getCoords = (event: MouseEvent | TouchEvent): { x: number; y: number } | null => {
      if (!canvasRef.current) return null;
      const rect = canvasRef.current.getBoundingClientRect();
      if (event instanceof MouseEvent) {
        return { x: event.clientX - rect.left, y: event.clientY - rect.top };
      }
      if (event.touches && event.touches.length > 0) {
        return { x: event.touches[0].clientX - rect.left, y: event.touches[0].clientY - rect.top };
      }
      return null;
    };

    const startDrawing = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      const coords = getCoords(event);
      if (!coords || !contextRef.current) return;
      isDrawing.current = true;
      hasDrawn.current = true;
      contextRef.current.beginPath();
      contextRef.current.moveTo(coords.x, coords.y);
    };

    const draw = (event: MouseEvent | TouchEvent) => {
      if (!isDrawing.current) return;
      event.preventDefault();
      const coords = getCoords(event);
      if (!coords || !contextRef.current) return;
      contextRef.current.lineTo(coords.x, coords.y);
      contextRef.current.stroke();
    };

    const stopDrawing = () => {
      if (!contextRef.current) return;
      contextRef.current.closePath();
      isDrawing.current = false;
    };
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleStop = () => stopDrawing();

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', handleStop);
        canvas.addEventListener('mouseleave', handleStop);

        canvas.addEventListener('touchstart', startDrawing, { passive: false });
        canvas.addEventListener('touchmove', draw, { passive: false });
        canvas.addEventListener('touchend', handleStop);
        canvas.addEventListener('touchcancel', handleStop);

        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', handleStop);
            canvas.removeEventListener('mouseleave', handleStop);
            
            canvas.removeEventListener('touchstart', startDrawing);
            canvas.removeEventListener('touchmove', draw);
            canvas.removeEventListener('touchend', handleStop);
            canvas.removeEventListener('touchcancel', handleStop);
        };
    }, []);

    useImperativeHandle(ref, () => ({
      clearCanvas: () => {
        const canvas = canvasRef.current;
        const context = contextRef.current;
        if (canvas && context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          hasDrawn.current = false;
        }
      },
      getCanvasAsDataURL: () => {
        if (!hasDrawn.current) return null;
        const canvas = canvasRef.current;
        if (canvas) {
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;
            const tempCtx = tempCanvas.getContext('2d');
            if (tempCtx) {
                // Use the page's background color for the canvas background
                tempCtx.fillStyle = '#1a1b1e';
                tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
                tempCtx.drawImage(canvas, 0, 0);
                return tempCanvas.toDataURL('image/png');
            }
        }
        return canvas?.toDataURL('image/png') || null;
      },
    }));

    return (
      <canvas
        ref={canvasRef}
        className={cn("w-full h-full cursor-crosshair", className)}
      />
    );
  }
);

MathCanvas.displayName = 'MathCanvas';

export default MathCanvas;
