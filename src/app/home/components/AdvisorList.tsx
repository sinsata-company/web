'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { TeacherDetailDto, TeacherListDto } from '@/app/api/data'
import { forwardRef, useEffect, useRef } from 'react'
import { teacherTypeConverter } from '@/utils/teacherTypeConverter'

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
    {
      summary,
      name,
      teacherType,
      id,
      hashtag,
      thumbnail,
      canCall,
      canChat,
      status,
    },
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
          className="rounded-xl w-25 h-18"
          src={thumbnail || '/logo.jpg'}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==" // 추가
          width={100}
          height={75}
          alt="profile"
        />
        <div className="grow flex-col justify-center items-start gap-2 inline-flex overflow-hidden">
          <div className="h-2.5 flex gap-2 items-baseline leading-tight">
            <div className="text-primary leading-tight font-extrabold font-['Pretendard Variable'] leading-none">
              {name}
            </div>
            <p className="text-sm text-primary leading-tight">
              {' '}
              | {teacherTypeConverter(teacherType.toLowerCase())}
            </p>
          </div>
          <div className="inline-flex gap-2">
            {hashtag &&
              hashtag.split('#').map((tag, idx) => {
                if (tag === '') return null
                return (
                  <p
                    className="leadig-none text-primary"
                    key={'hash-' + idx}
                    style={{
                      fontWeight: 300,
                    }}
                  >
                    #{tag.trim()}{' '}
                  </p>
                )
              })}
          </div>
          <div className="inline-flex justify-between text-black text-sm font-bold font-['Pretendard Variable'] w-full overflow-hidden whitespace-nowrap text-ellipsis truncate">
            <p>선불 1200원</p>
            <p>15분 25,000원</p>
          </div>
        </div>
        <Image
          className="rounded-xl w-25 h-8"
          src={`/images/status_${
            status == 0 ? 'live' : status == 1 ? 'calling' : 'notlive'
          }.png`}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==" // 추가
          width={100}
          height={28}
          alt="profile"
        />
      </div>
    )
  }
)

export { AdvisorItem }
