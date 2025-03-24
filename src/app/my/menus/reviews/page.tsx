'use client'

import { useRouter } from "next/navigation"
import Image from 'next/image'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewCard from "@/components/reviews/review-card";
import { useQuery } from "@tanstack/react-query";
import { Reviewable } from "@/types/review";
import { basicGet } from "@/api/base";
import { useState } from "react";

export const getReviewables = async () => basicGet("/reviews/reviewable-reservations") as unknown as Promise<Reviewable[]>;

enum TabType {
  WRITABLE = 'WRITABLE',
  COMPLETED = 'COMPLETED',
}

export default function Page() {
  const router = useRouter();
  const { data: reviewables = [] } = useQuery({
    queryKey: ['reviewable-list'],
    queryFn: getReviewables,
  });
  const [tab, setTab] = useState(TabType.WRITABLE);

  const writableCount = reviewables.length;
  const completionCount = 0;

  const onClickBack = () => router.push('/my');

  return (
    <div className="w-full flex flex-col">
      <header className="h-[64px] w-full px-4 flex items-center bg-sinsata-blue">
        <button className="flex gap-x-1" onClick={onClickBack}>
          <Image src="/images/left-arrow-white.svg" alt="back" width={28} height={28} />
          <span className="text-white pt-[3px]">나의 상담후기</span>
        </button>
      </header>

      <section className="w-full">
        <Tabs className="w-full" defaultValue={tab} onValueChange={(value) => setTab(value as TabType)}>
          <TabsList className="w-full">
            <TabsTrigger value={TabType.WRITABLE} className="flex-[0.5]">
              작성 가능 후기
              <span className="!text-xs pl-1">({writableCount})</span>
              </TabsTrigger>
            <TabsTrigger value={TabType.COMPLETED} className="flex-[0.5]">
              작성 완료 후기
              <span className="!text-xs pl-1">({completionCount})</span>
              </TabsTrigger>
          </TabsList>
        </Tabs>
      </section>

      <section className="w-full flex flex-col gap-y-3">
        {reviewables.map((reviewable) => (
          <ReviewCard
            key={reviewable.reservationId}
            {...reviewable}
          />
        ))}
      </section>
    </div>
  )
}
