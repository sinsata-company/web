'use client';

import React, { useState, useEffect } from 'react';
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
  maxRating = 10,
  size = 'md',
  onChange,
  readOnly = false,
  showScore = false,
  className,
}: StarRatingProps) {
  const [currentRating, setCurrentRating] = useState<number>(rating);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  
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

  // Handle click on a star
  const handleClick = (index: number) => {
    if (readOnly) return;
    
    const newRating = index;
    setCurrentRating(newRating);
    
    if (onChange) {
      onChange(newRating);
    }
  };

  // Render stars
  const renderStars = () => {
    // Calculate how many full and half stars to display
    const fullStars = Math.floor(displayRating / 2);
    const hasHalfStar = displayRating % 2 === 1;
    
    const stars = [];
    
    // Render full stars
    for (let i = 1; i <= fullStars; i++) {
      const starValue = i * 2;
      
      stars.push(
        <div 
          key={`full-${i}`}
          className={cn(
            "relative cursor-pointer transition-transform",
            !readOnly && "hover:scale-110",
            sizeClasses[size].star
          )}
          onClick={() => handleClick(starValue)}
          onMouseEnter={() => !readOnly && setHoverRating(starValue)}
          onMouseLeave={() => !readOnly && setHoverRating(null)}
        >
          <Image
            src="/icons/star.svg"
            alt="Filled star"
            width={24}
            height={24}
            className="w-full h-full"
          />
        </div>
      );
    }
    
    // Render half star if needed
    if (hasHalfStar) {
      const halfStarValue = fullStars * 2 + 1;
      
      stars.push(
        <div 
          key="half"
          className={cn(
            "relative cursor-pointer transition-transform",
            !readOnly && "hover:scale-110",
            sizeClasses[size].star
          )}
          onClick={() => handleClick(halfStarValue + 1)} // Click on half star gives full star
          onMouseEnter={() => !readOnly && setHoverRating(halfStarValue + 1)}
          onMouseLeave={() => !readOnly && setHoverRating(null)}
        >
          <Image
            src="/icons/half-star.svg"
            alt="Half star"
            width={24}
            height={24}
            className="w-full h-full"
          />
        </div>
      );
      
      // Add half-star clickable area
      if (!readOnly) {
        const halfStarArea = (
          <div 
            key="half-area"
            className={cn(
              "absolute cursor-pointer",
              sizeClasses[size].star,
              "left-0 w-1/2 h-full z-10"
            )}
            style={{ left: `${fullStars * 100}%` }}
            onClick={() => handleClick(halfStarValue)}
            onMouseEnter={() => setHoverRating(halfStarValue)}
            onMouseLeave={() => setHoverRating(null)}
          />
        );
        stars.push(halfStarArea);
      }
    }
    
    return (
      <div className="relative">
        <div className="flex">
          {stars.filter(star => star.key !== "half-area")}
        </div>
        {!readOnly && hasHalfStar && (
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="flex">
              {stars.filter(star => star.key === "half-area")}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className={cn("flex items-center", sizeClasses[size].container)}>
        {renderStars()}
      </div>
      
      {showScore && (
        <div className="mt-2 text-center">
          <span className="font-bold text-lg">{displayRating}</span>
          <span className="text-gray-500 text-sm ml-1">/ {maxRating}</span>
        </div>
      )}
    </div>
  );
}
