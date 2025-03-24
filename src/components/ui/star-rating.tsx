'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface StarRatingProps {
  rating?: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  showScore?: boolean;
  className?: string;
}

export function StarRating({
  rating = 0,
  size = 'md',
  onChange,
  readOnly = false,
  showScore = false,
  className,
}: StarRatingProps) {
  const [currentRating, setCurrentRating] = useState<number>(rating);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);
  
  // Update internal state when prop changes
  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);

  // Convert rating to stars (5 stars max, each star = 2 points, half star = 1 point)
  const displayRating = hoverRating !== null ? hoverRating : currentRating;
  
  // Size classes
  const sizeClasses = {
    sm: { container: "gap-1", star: "w-4 h-4" },
    md: { container: "gap-2", star: "w-6 h-6" },
    lg: { container: "gap-3", star: "w-8 h-8" },
  };

  // Calculate rating based on pointer position
  const calculateRating = (clientX: number): number => {
    const container = containerRef.current;
    if (!container) return 0;
    
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const totalWidth = rect.width;
    
    // Calculate which star position we're at (1-10)
    let position = Math.ceil((x / totalWidth) * 10);
    position = Math.max(1, Math.min(position, 10)); // Clamp between 1-10
    
    return position;
  };

  // Handle click on a star
  const handleClick = (newRating: number) => {
    if (readOnly) return;
    
    setCurrentRating(newRating);
    
    if (onChange) {
      onChange(newRating);
    }
  };

  // Start dragging
  const handlePointerDown = (event: React.PointerEvent) => {
    if (readOnly) return;
    
    isDragging.current = true;
    
    // Set initial rating based on where the user clicked
    const newRating = calculateRating(event.clientX);
    setHoverRating(newRating);
    
    // Capture pointer to track movement outside the component
    if (containerRef.current) {
      containerRef.current.setPointerCapture(event.pointerId);
    }
  };

  // Handle mouse/touch movement for dragging
  const handlePointerMove = (event: React.PointerEvent) => {
    if (readOnly || !isDragging.current) return;
    
    const newRating = calculateRating(event.clientX);
    setHoverRating(newRating);
  };

  // End dragging
  const handlePointerUp = (event: React.PointerEvent) => {
    if (readOnly || !isDragging.current) return;
    
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(event.pointerId);
    }
    
    isDragging.current = false;
    
    if (hoverRating !== null) {
      setCurrentRating(hoverRating);
      if (onChange) {
        onChange(hoverRating);
      }
    }
    
    setHoverRating(null);
  };

  // Cancel dragging if pointer leaves
  const handlePointerLeave = () => {
    if (!isDragging.current) {
      setHoverRating(null);
    }
  };

  // Render stars
  const renderStars = () => {
    const stars = [];
    
    // Always render 5 stars
    for (let i = 1; i <= 5; i++) {
      // Calculate star values (each star is worth 2 points)
      const fullStarValue = i * 2;
      const halfStarValue = fullStarValue - 1;
      
      // Determine if the star should be filled, half-filled, or empty
      const isFilled = displayRating >= fullStarValue;
      const isHalfFilled = !isFilled && displayRating >= halfStarValue;
      
      stars.push(
        <div 
          key={i}
          className={cn(
            "relative select-none",
            !readOnly && "cursor-pointer",
            sizeClasses[size].star
          )}
          onClick={() => handleClick(isFilled ? fullStarValue : isHalfFilled ? halfStarValue : fullStarValue)}
        >
          {/* Empty star (background) */}
          <Image
            src="/images/star-empty.svg"
            alt="Empty star"
            width={24}
            height={24}
            className="w-full h-full pointer-events-none"
            draggable="false"
          />
          
          {/* Filled star (overlay) */}
          {isFilled && (
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <Image
                src="/icons/star.svg"
                alt="Filled star"
                width={24}
                height={24}
                className="w-full h-full pointer-events-none"
                draggable="false"
              />
            </div>
          )}
          
          {/* Half-filled star (overlay) */}
          {isHalfFilled && (
            <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
              <Image
                src="/icons/half-star.svg"
                alt="Half star"
                width={24}
                height={24}
                className="w-full h-full pointer-events-none"
                draggable="false"
              />
            </div>
          )}
        </div>
      );
    }
    
    return stars;
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div 
        ref={containerRef}
        className={cn("flex items-center select-none", sizeClasses[size].container)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        style={{ touchAction: 'none' }} // Prevent scrolling while dragging on touch devices
      >
        {renderStars()}
      </div>
      
      {showScore && (
        <div className="mt-2 text-center">
          <span className="font-bold text-lg">{displayRating}</span>
          <span className="text-gray-500 text-sm ml-1">/ 10</span>
        </div>
      )}
    </div>
  );
}
