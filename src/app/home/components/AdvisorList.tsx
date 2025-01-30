'use client'

import { IAdvisor } from '@/dummy/dummyTeacher'
import { getAllAdvisor } from '@/services/advisor'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { getTeacherList, SearchType } from '@/app/api/teacher'
import { TeacherListDto } from '@/app/api/data'

export default function AdvisorList({
  advisorList,
}: {
  advisorList: TeacherListDto[]
}) {
  return (
    <div className="inline-flex flex-col gap-2.5 w-full">
      {advisorList.map((item, idx) => (
        <AdvisorItem {...item} key={idx} />
      ))}

      <div className="h-32"></div>
    </div>
  )
}

export function AdvisorItem({
  summary,
  name,
  teacherType,
  id,
  hashtag,
  thumbnail,
}: TeacherListDto) {
  const nav = useRouter()
  return (
    <div
      onClick={() => {
        nav.push('/teacher/' + id)
      }}
      className="w-full h-28 p-4 bg-neutral-50 rounded-2xl border border-zinc-100 justify-start items-center gap-3 inline-flex"
    >
      <Image
        style={{
          objectFit: 'cover',
        }}
        className=" rounded-xl w-20 h-20"
        src={thumbnail}
        width={80}
        height={80}
        alt="profile"
      />
      <div className="flex-col justify-center items-start gap-2 inline-flex">
        <div className="w-56 text-zinc-900 text-base font-bold font-['Pretendard Variable']">
          {name}
          <br />#{teacherType == 'taro' ? '타로' : '신점'}
        </div>
        <div className="justify-start items-center gap-1 inline-flex">
          {/* <div className="w-4 h-4 relative" /> */}
          <div className="text-yellow-400 text-sm font-bold font-['Pretendard Variable'] leading-tight">
            {summary}
          </div>
        </div>
      </div>
    </div>
  )
}
