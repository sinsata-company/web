'use client'

import { getQna, updateQna } from '@/app/manage/api/mypage'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import Input from '@/components/common/Input'
import Modal from '@/components/common/Modal'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import router from 'next/router'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from '@tanstack/react-query'
import { basicTeacherGet } from '@/app/manage/api/base'
import Btb from '@/components/common/Btb'
import { TeacherReviewDetails } from '@/types/review'
import TeacherReviewCard from '@/components/reviews/teacher-review-card'

export interface QNAItemProps {
  question: string
  answer: string
  id: number
}

enum TabType {
  WRITABLE = 'WRITABLE',
  COMPLETED = 'COMPLETED',
}

export default function Page() {
  const router = useRouter();
  const [tab, setTab] = useState(TabType.WRITABLE);
  const { data: writables = [], refetch: refetchW } = useQuery({
    queryKey: ['replyable'],
    queryFn: () => basicTeacherGet("/reviews/need-comments") as unknown as Promise<TeacherReviewDetails[]>,
  });
  const { data: completed = [], refetch: refetchC } = useQuery({
    queryKey: ['completed'],
    queryFn: () => basicTeacherGet("/reviews/with-comments") as unknown as Promise<TeacherReviewDetails[]>,
  });

  const reload = () => {
    refetchW();
    refetchC();
  };

  const writableCount = writables.length;
  const completionCount = completed.length;
  const onClickBack = () => router.push('/manage/app/main/my');

  return (
    <div className="w-full h-[100dvh] flex flex-col">
      <header className="min-h-[64px] w-full px-4 flex items-center bg-sinsata-blue">
        <button className="flex gap-x-1" onClick={onClickBack}>
          <Image src="/images/left-arrow-white.svg" alt="back" width={28} height={28} />
          <span className="text-white pt-[3px]">후기관리</span>
        </button>
      </header>

      <section className="w-full">
        <Tabs className="w-full" defaultValue={tab} onValueChange={(value) => setTab(value as TabType)}>
          <TabsList className="w-full">
            <TabsTrigger value={TabType.WRITABLE} className="flex-[0.5]">
              답글 필요 후기
              <span className="!text-xs pl-1">({writableCount})</span>
            </TabsTrigger>
            <TabsTrigger value={TabType.COMPLETED} className="flex-[0.5]">
              답글 완료 후기
              <span className="!text-xs pl-1">({completionCount})</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </section>

      <section className="w-full flex-1 flex flex-col gap-y-3 bg-[#f5f5f5] pb-[64px] overflow-y-auto">


          {tab === TabType.WRITABLE && (
            <section className="w-full flex flex-col items-center gap-y-2 py-6 justify-center">
              <span className="text-center">
                상담후기에 답글을 등록하면
              </span>
              <span className="text-center mb-4">
                고객 만족도가 더욱 높아집니다.
              </span>
              {writables.map((review) => (
                <TeacherReviewCard
                  key={review.id}
                  {...review}
                  reload={reload}
                />
              ))}
            </section>
          )}

          {tab === TabType.COMPLETED && (
            <section className="w-full flex flex-col items-center gap-y-2 py-6 justify-center">
              {completed.map((review) => (
                <TeacherReviewCard
                  key={review.id}
                  {...review}
                  reload={reload}
                />
              ))}
            </section>
          )}
      </section>

      <Btb />
    </div>
  );
}
