'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { StarRating } from './star-rating';

interface RatingSystemProps {
  averageRating?: number;
  totalRatings?: number;
  onRatingChange?: (rating: number) => void;
  showAverageRating?: boolean;
  className?: string;
  readOnly?: boolean;
}

export function RatingSystem({
  averageRating = 0,
  totalRatings = 0,
  onRatingChange,
  showAverageRating = true,
  className,
  readOnly = false,
}: RatingSystemProps) {
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
    if (onRatingChange) {
      onRatingChange(rating);
    }
  };

  return (
    <div className={cn("w-full flex flex-col items-center", className)}>
      {/* Star rating */}
      <div className="flex flex-col items-center justify-center">
        {showAverageRating && (
          <div className="text-center mb-2">
            <div className="text-3xl font-bold">{averageRating.toFixed(1)}</div>
            <div className="text-sm text-gray-500">총 {totalRatings}개의 평가</div>
          </div>
        )}
        
        <StarRating 
          rating={readOnly ? averageRating : selectedRating}
          onChange={handleRatingChange}
          size="lg"
          readOnly={readOnly}
          showScore={!readOnly}
          maxRating={10}
        />
      </div>
    </div>
  );
}

// Example usage component with both selection and display modes
export function RatingExample() {
  const [userRating, setUserRating] = useState<number>(0);
  
  return (
    <div className="space-y-8 p-4">
      <div>
        <h2 className="text-xl font-bold mb-4">평점 선택</h2>
        <RatingSystem
          onRatingChange={setUserRating}
          showAverageRating={false}
          readOnly={false}
        />
        {userRating > 0 && (
          <p className="mt-4">선택한 평점: {userRating}</p>
        )}
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-4">평점 통계</h2>
        <RatingSystem
          averageRating={8.7}
          totalRatings={46}
          readOnly={true}
        />
      </div>
    </div>
  );
}
