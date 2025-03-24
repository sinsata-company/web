'use client';

import React from 'react';
import Image from 'next/image';
import { Reviewable } from '@/types/review';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';

interface ReviewCardProps extends Reviewable {
  className?: string;
}

export function ReviewCard({ className, startAt, teacherProfileImage, teacherName, teacherPinNumber }: ReviewCardProps) {
  
  const formattedDate = dayjs(startAt).format('YYYY.MM.DD HH:mm');
  
  return (
    <button className={cn("w-full bg-white rounded-lg overflow-hidden", className)}>
      {/* Header with profile and rating */}
      <div className="flex items-center p-4 border-b border-gray-100">
        <div className="flex items-center flex-1 gap-x-4">

          <div className="w-[153.33px] h-[100.88px] rounded-sm overflow-hidden">
            <Image 
              src={teacherProfileImage} 
              alt={teacherName}
              width={153.33}
              height={100.88}
              className="object-cover h-full"
            />
          </div>
          
          {/* Name and date */}
          <div className="flex flex-col">
            <div className="flex gap-x-2 items-center">
                <span className="text-[18px] font-bold">{teacherName}</span>
                <span className="text-neutral-300 font-extrabold text-base">|</span>
                <span className="text-indigo-500 text-sm">{teacherPinNumber}번</span>
            </div>

            <div className="flex items-center text-sm text-gray-400">
              <span>{formattedDate}&nbsp;(통화10분이상)</span>
            </div>
          </div>
        </div>

      </div>
    </button>
  );
}

export default ReviewCard;