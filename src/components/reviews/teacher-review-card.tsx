'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { TeacherReviewDetails } from '@/types/review';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Textarea } from '@/components/ui/textarea';
import { Button, BUTTON_TYPE } from '@/components/common/Button';
import { basicTeacherPost } from '@/app/manage/api/base';
import { queryClient } from '@/lib/query/queryClient';

// Extend dayjs with duration plugin
dayjs.extend(duration);

interface TeacherReviewCardProps extends TeacherReviewDetails {
  className?: string;
  reload: () => void;
}

export function TeacherReviewCard({ 
  className,
  reload,
  ...data
}: TeacherReviewCardProps) {
  const formattedDate = dayjs(data.date).format('YYYY.MM.DD');
  const starRating = data.rating / 2;
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const existsComments = data.comments.length > 0;
  
  return (
    <div className={cn("py-4 px-4 w-full bg-white border-y border-gray-100", className)}>
      <div className="flex items-center flex-1 gap-x-4">
        <div className="flex flex-col justify-between w-full">
          <div className="flex gap-x-2 items-center">
              <span className="text-[18px] font-bold">{data.userName}</span>
              <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-xl">
                  {star <= Math.floor(starRating) ? '★' : 
                   star === Math.ceil(starRating) && starRating % 1 !== 0 ? '★' : '☆'}
              </span>
            ))}
          </div>
          </div>
          <div className="flex">
            <span className="font-semibold">{data.timeRange}</span>
          </div>
    </div>

      <section className="flex flex-col justify-center">
          <div className="text-sm text-gray-400">
            {formattedDate}
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

      {!existsComments && (
      <section className="mt-4 flex justify-end w-full border-t border-gray-100 pt-4">
        {!showReplyForm ? (
          <Button
            buttonType={BUTTON_TYPE.ghost}
            className="w-[140px] h-[42px] self-end"
            label="답글등록"
            onClick={() => setShowReplyForm(true)}
          />
        ) : (
          <div className="w-full flex flex-col gap-4">
            <Textarea 
              placeholder="답글 내용을 입력해주세요."
              className="min-h-[100px] border-gray-300 resize-none"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <div className="flex gap-2">
              <Button
                buttonType={BUTTON_TYPE.ghost}
                className="flex-1 h-[42px]"
                label="취소"
                onClick={() => {
                  setShowReplyForm(false);
                  setReplyText('');
                }}
              />
              <Button
                buttonType={BUTTON_TYPE.primary}
                className="flex-1 h-[42px]"
                label="등록하기"
                onClick={async () => {
                  await basicTeacherPost(`/reviews/${data.id}/comments`, {
                    content: replyText,
                  });
                  // TODO: Implement reply submission
                  alert('답글이 등록되었습니다.');
                  setShowReplyForm(false);
                  setReplyText('');
                  await queryClient.refetchQueries({
                    queryKey: ['replyable', 'completed'],
                    exact: true,
                  });
                  reload();
                }}
              />
            </div>
          </div>
        )}
      </section>
      )}

      <section>
        {existsComments && (
          <div className="mt-4 flex justify-end w-full border-t border-gray-100 pt-4">
            <div className="w-full flex flex-col gap-4">
              <p className="text-sm text-gray-700 whitespace-pre-line">{data.latestComment?.content}</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default TeacherReviewCard;
