'use client';

import React from 'react';
import Image from 'next/image';
import { TeacherReviewDetails } from '@/types/review';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

// Extend dayjs with duration plugin
dayjs.extend(duration);

interface UserReviewCardProps extends TeacherReviewDetails {
  className?: string;
}

export function UserReviewCard({ 
  className,
  ...data
}: UserReviewCardProps) {
  const formattedDate = dayjs(data.date).format('YYYY.MM.DD');
  // Calculate star rating (convert from 10-point scale to 5-star display)
  const starRating = data.rating / 2;
  
  return (
    <div className={cn("py-4 px-4 w-full bg-white border-y border-gray-100", className)}>
      <div className="flex items-center flex-1 gap-x-4">
        <div className="flex flex-col justify-between w-full">
          <div className="flex gap-x-2 items-center">
              <span className="text-[18px] font-bold">{data.userName}</span>
          </div>
          <div className="flex items-center text-sm gap-x-2 font-semibold">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-xl">
                  {star <= Math.floor(starRating) ? '★' : 
                   star === Math.ceil(starRating) && starRating % 1 !== 0 ? '★' : '☆'}
              </span>
            ))}
          </div>
          <span>{data.userName}</span>
      </div>
    </div>

      <section className="flex flex-col justify-center">
          <div className="text-sm text-gray-400">
            {formattedDate}
          </div>
          <div className="text-sm text-gray-600 w-full text-center">
            ({data.timeRange})
          </div>
      </section>
    </div>

      <div className="pb-4 mt-4">
        <div className="w-full border-t border-b border-gray-200">
          <div className="flex w-full border-b border-b-gray-200">
            <div className="w-1/3 py-3 px-4 text-sm font-medium text-gray-500 border-r border-r-gray-200">
              상담 분야
            </div>
            <div className="w-2/3 py-3 px-4 text-sm font-semibold">
              {data.category}
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-1/3 py-3 px-4 text-sm font-medium text-gray-500 border-r border-r-gray-200">
              상담 스타일
            </div>
            <div className="w-2/3 py-3 px-4 text-sm font-semibold">
              {data.style}
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-8 flex flex-col">
        <p className="text-sm text-gray-700 whitespace-pre-line">{data.content}</p>
        {data?.imageUrl && (
          <img
            src={data.imageUrl}
            alt="Review Image"
            className="mt-2 w-full"
          />
        )}
      </div>
    </div>
  );
}

export default UserReviewCard;
