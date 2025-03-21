'use'

import { TeacherReviewDto } from '@/types/api'
import moment from 'moment'
import { useState } from 'react';

const ReviewItem = ({
  contents,
  star, 
  createdAt,
  reviewerName,
}: TeacherReviewDto) => {
  const [more, setMore] = useState(false);
  const date = moment(createdAt).format('YYYY.MM.DD');
  const isLong = contents?.length > 20;
  const preview = isLong ? contents.slice(0, 20) + '...' : contents;

  return (
    <div className="self-stretch h-32 p-4 bg-neutral-50 rounded-2xl flex-col justify-start items-start gap-2 flex">
      <div className="self-stretch justify-start items-center gap-2 inline-flex">
        {/* <img
          className="w-12 h-12 rounded-full border border-zinc-100"
          src="https://via.placeholder.com/52x52"
        /> */}
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
          <div className="self-stretch text-zinc-900 text-base font-bold ">
            {reviewerName}
          </div>
          <div className="self-stretch text-zinc-400 text-sm font-medium ">
            {date}
          </div>
        </div>
      </div>
      <div className="justify-start items-center gap-1 inline-flex">
        <div className="w-3 h-3 flex-col justify-start items-start gap-2.5 inline-flex" />
        <div className="text-zinc-900 text-sm font-bold  leading-tight">
          {star} 만족해요
        </div>
      </div>
      <div className="self-stretch text-neutral-500 text-sm font-medium  leading-tight">
        {more ? contents : preview}
      </div>

      {isLong && (
      <div className="text-zinc-400 text-sm font-bold " onClick={() => setMore(!more)}>{more ? '접기' : '더보기'}</div>
      )}
    </div>
  )
}

export default ReviewItem
