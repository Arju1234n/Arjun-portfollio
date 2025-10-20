import React, { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

const ThemeScroll: React.FC = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = 60;
    canvas.height = 60;
    
    // Animation variables
    let animationFrame: number;
    let rotation = 0;
    
    // Colors based on theme
    const colors = theme === 'dark' 
      ? ['#6366f1', '#8b5cf6', '#d946ef', '#f472b6'] // Dark theme colors
      : ['#818cf8', '#a78bfa', '#e879f9', '#f9a8d4']; // Light theme colors
    
    const drawStar = (x: number, y: number, radius: number, spikes: number, color: string) => {
      let rotation = Math.PI / 2 * 3;
      let step = Math.PI / spikes;
      
      ctx.beginPath();
      ctx.fillStyle = color;
      
      for (let i = 0; i < spikes; i++) {
        const outerX = x + Math.cos(rotation) * radius;
        const outerY = y + Math.sin(rotation) * radius;
        ctx.lineTo(outerX, outerY);
        rotation += step;
        
        const innerX = x + Math.cos(rotation) * (radius * 0.4);
        const innerY = y + Math.sin(rotation) * (radius * 0.4);
        ctx.lineTo(innerX, innerY);
        rotation += step;
      }
      
      ctx.closePath();
      ctx.fill();
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background circle
      ctx.beginPath();
      ctx.arc(30, 30, 25, 0, Math.PI * 2);
      ctx.fillStyle = theme === 'dark' ? '#1f2937' : '#f3f4f6';
      ctx.fill();
      
      // Draw stars with rotation
      rotation += 0.01;
      
      // Draw multiple stars with different rotations and sizes
      drawStar(30, 30, 20, 8, colors[0]);
      
      ctx.save();
      ctx.translate(30, 30);
      ctx.rotate(rotation);
      ctx.translate(-30, -30);
      drawStar(30, 30, 15, 5, colors[1]);
      ctx.restore();
      
      ctx.save();
      ctx.translate(30, 30);
      ctx.rotate(-rotation * 1.5);
      ctx.translate(-30, -30);
      drawStar(30, 30, 10, 6, colors[2]);
      ctx.restore();
      
      ctx.save();
      ctx.translate(30, 30);
      ctx.rotate(rotation * 2);
      ctx.translate(-30, -30);
      drawStar(30, 30, 5, 4, colors[3]);
      ctx.restore();
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [theme]);
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <canvas 
        ref={canvasRef} 
        width={60} 
        height={60} 
        className="cursor-pointer rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
        title={`Current theme: ${theme}`}
      />
    </div>
  );
};

export default ThemeScroll;