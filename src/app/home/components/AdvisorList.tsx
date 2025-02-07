'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { TeacherDetailDto, TeacherListDto } from '@/app/api/data'
import { forwardRef, useEffect, useRef } from 'react'

export default function AdvisorList({
  advisorList,
  lastAdvisorElementRef,
}: {
  advisorList: TeacherListDto[]
  lastAdvisorElementRef?: (node: HTMLDivElement | null) => void
}) {
  return (
    <div className="inline-flex flex-col gap-2.5 w-full">
      {advisorList.map((item, idx) => {
        if (idx === advisorList.length - 1) {
          return <AdvisorItem {...item} key={idx} ref={lastAdvisorElementRef} />
        } else {
          return <AdvisorItem {...item} key={idx} />
        }
      })}

      <div className="h-32"></div>
    </div>
  )
}

const AdvisorItem = forwardRef<HTMLDivElement, TeacherListDto>(
  function AdvisorItem(
    { summary, name, teacherType, id, hashtag, thumbnail },
    ref
  ) {
    const nav = useRouter()
    return (
      <div
        ref={ref}
        onClick={() => {
          nav.push('/teacher/' + id)
        }}
        className="w-full grow h-28 p-4 bg-neutral-50 rounded-2xl border border-zinc-100 justify-start items-center gap-3 inline-flex"
      >
        <Image
          style={{
            objectFit: 'cover',
          }}
          className=" rounded-xl w-20 h-20"
          src={thumbnail || '/logo.jpg'}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==" // 추가
          width={80}
          height={80}
          alt="profile"
        />
        <div className="grow flex-col justify-center items-start gap-2 inline-flex overflow-hidden">
          <div className=" text-zinc-900 text-base font-bold font-['Pretendard Variable']">
            {name}

            <div className="flex">
              {hashtag &&
                hashtag.split('#').map((tag, idx) => {
                  if (tag === '') return null
                  return <p key={'hash-' + idx}>#{tag.trim()} </p>
                })}
            </div>
          </div>
          <div className="inline-block text-gradient text-sm font-bold font-['Pretendard Variable'] w-full overflow-hidden whitespace-nowrap text-ellipsis truncate">
            {summary}
          </div>
        </div>
      </div>
    )
  }
)

export { AdvisorItem }
