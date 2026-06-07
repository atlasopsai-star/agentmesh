"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type MeshSceneProps = {
  className?: string;
  intensity?: "hero" | "panel";
};

type Dot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export function MeshScene({ className, intensity = "hero" }: MeshSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    const pointer = { x: 0.5, y: 0.5 };
    const dotCount = intensity === "hero" ? 34 : 22;
    const dots: Dot[] = Array.from({ length: dotCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0015,
      vy: (Math.random() - 0.5) * 0.0015,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const movePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = (event.clientY - rect.top) / rect.height;
    };

    const draw = () => {
      frame += 1;
      context.clearRect(0, 0, width, height);

      const gradient = context.createRadialGradient(
        width * pointer.x,
        height * pointer.y,
        0,
        width * pointer.x,
        height * pointer.y,
        Math.max(width, height) * 0.6,
      );
      gradient.addColorStop(0, "rgba(84, 152, 255, 0.18)");
      gradient.addColorStop(0.45, "rgba(92, 65, 221, 0.12)");
      gradient.addColorStop(1, "rgba(3, 7, 18, 0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      for (const dot of dots) {
        dot.x += dot.vx;
        dot.y += dot.vy;
        if (dot.x <= 0 || dot.x >= 1) dot.vx *= -1;
        if (dot.y <= 0 || dot.y >= 1) dot.vy *= -1;
      }

      for (let i = 0; i < dots.length; i += 1) {
        for (let j = i + 1; j < dots.length; j += 1) {
          const a = dots[i];
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const threshold = intensity === "hero" ? 0.24 : 0.28;
          if (distance > threshold) continue;
          const opacity = (1 - distance / threshold) * (intensity === "hero" ? 0.45 : 0.28);
          context.strokeStyle = `rgba(126, 163, 255, ${opacity})`;
          context.lineWidth = distance < threshold * 0.45 ? 1.15 : 0.8;
          context.beginPath();
          context.moveTo(a.x * width, a.y * height);
          context.lineTo(b.x * width, b.y * height);
          context.stroke();
        }
      }

      dots.forEach((dot, index) => {
        const pulse = 1 + Math.sin(frame * 0.025 + index) * 0.4;
        const px = dot.x * width;
        const py = dot.y * height;
        context.beginPath();
        context.arc(px, py, intensity === "hero" ? 1.5 * pulse : 1.15 * pulse, 0, Math.PI * 2);
        context.fillStyle = index % 5 === 0 ? "rgba(192, 214, 255, 0.95)" : "rgba(132, 92, 255, 0.8)";
        context.fill();
      });

      const routeY = height * (0.25 + Math.sin(frame * 0.008) * 0.05 + pointer.y * 0.2);
      context.strokeStyle = "rgba(98, 226, 196, 0.9)";
      context.lineWidth = intensity === "hero" ? 2.2 : 1.5;
      context.beginPath();
      context.moveTo(0, routeY);
      context.bezierCurveTo(
        width * 0.24,
        routeY - height * 0.15,
        width * 0.58,
        routeY + height * 0.15,
        width,
        routeY - height * 0.02,
      );
      context.stroke();

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", movePointer);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", movePointer);
    };
  }, [intensity]);

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]", className)}>
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_35%),linear-gradient(180deg,rgba(2,6,23,0.04),rgba(2,6,23,0.72))]" />
    </div>
  );
}
