'use client';

import React from 'react';
import Image from 'next/image';
import { ReviewCompletion } from '@/types/review';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

// Extend dayjs with duration plugin
dayjs.extend(duration);

interface ReviewCompletionCardProps extends ReviewCompletion {
  className?: string;
}

export function ReviewCompletionCard({ 
  className, 
  teacherName, 
  rating, 
  category, 
  userName,
  style, 
  content, 
  startAt,
  endAt,
  createdAt,
  type,
  teacherProfileUrl,
  pinNumber
}: ReviewCompletionCardProps) {
  const formattedDate = dayjs(createdAt).format('YYYY.MM.DD');
  
  // Calculate star rating (convert from 10-point scale to 5-star display)
  const starRating = rating / 2;
  
  // Calculate time difference in minutes
  const start = dayjs(startAt);
  const end = dayjs(endAt);
  const diffMinutes = end.diff(start, 'minute');
  const reservationType = type === 'CALL' ? '통화' : '채팅';
  
  // Determine time label based on the difference
  let timeLabel = '';
  if (diffMinutes <= 15) {
    timeLabel = '15분';
  } else if (diffMinutes <= 30) {
    timeLabel = '15분 ~ 30분';
  } else if (diffMinutes <= 60) {
    timeLabel = '30분 ~ 60분';
  } else {
    timeLabel = '60분 이상';
  }
  
  return (
    <div className={cn("w-full bg-white rounded-lg overflow-hidden", className)}>
      <div className="flex items-center flex-1 gap-x-4">
        <div className="min-w-[153.33px] max-w-[153.33px] h-[100.88px] rounded-sm overflow-hidden flex-shrink-0">
          <Image 
            src={teacherProfileUrl} 
            alt={teacherName}
            width={153.33}
            height={100.88}
            className="object-cover h-[100.88px] w-full"
            style={{ height: '100.88px' }}
          />
        </div>
        <div className="flex flex-col justify-between w-full">
          <div className="flex gap-x-2 items-center">
              <span className="text-[18px] font-bold">{teacherName}</span>
              <span className="text-neutral-300 font-extrabold text-base">|</span>
              <span className="text-indigo-500 text-sm">{pinNumber}번</span>
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
          <span>{userName}</span>
      </div>
    </div>

      <section className="flex flex-col justify-center">
          <div className="text-sm text-gray-400">
            {formattedDate}
          </div>
          <div className="text-sm text-gray-600 w-full text-center">
            ({reservationType} {timeLabel})
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
              {category}
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-1/3 py-3 px-4 text-sm font-medium text-gray-500 border-r border-r-gray-200">
              상담 스타일
            </div>
            <div className="w-2/3 py-3 px-4 text-sm font-semibold">
              {style}
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-4 mt-8">
        <p className="text-sm text-gray-700 whitespace-pre-line">{content}</p>
      </div>
    </div>
  );
}

export default ReviewCompletionCard;
