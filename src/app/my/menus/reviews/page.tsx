'use client'

import { useRouter } from "next/navigation"
import Image from 'next/image'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ReviewCard from "@/components/reviews/review-card";
import ReviewCompletionCard from "@/components/reviews/review-completion-card";
import { useQuery } from "@tanstack/react-query";
import { Reviewable, ReviewCompletion } from "@/types/review";
import { basicGet } from "@/api/base";
import { useEffect, useState } from "react";
import BTB from '@/components/common/Btb'

export const getReviewables = async () => basicGet("/reviews/reviewable-reservations") as unknown as Promise<Reviewable[]>;

enum TabType {
  WRITABLE = 'WRITABLE',
  COMPLETED = 'COMPLETED',
}

export default function Page() {
  const router = useRouter();
  const { data: reviewables = [], refetch: rvl } = useQuery({
    queryKey: ['reviewable-list'],
    queryFn: getReviewables,
  });
  const { data: reviews = [], refetch: rr } = useQuery({
    queryKey: ['review-list'],
    queryFn: () => basicGet("/reviews") as unknown as Promise<ReviewCompletion[]>,
  });

  console.log({ reviews });

  const [tab, setTab] = useState(TabType.WRITABLE);

  const writableCount = reviewables.length;
  const completionCount = reviews.length;

  const onClickBack = () => router.push('/my');

  useEffect(() => {
    rvl(); rr();
  }, []);

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
          
          <TabsContent value={TabType.WRITABLE}>
            <section className="w-full flex flex-col gap-y-3 p-4">
              {reviewables.map((reviewable) => (
                <ReviewCard
                  key={reviewable.reservationId}
                  {...reviewable}
                />
              ))}
              {reviewables.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  작성 가능한 후기가 없습니다.
                </div>
              )}
            </section>
          </TabsContent>
          
          <TabsContent value={TabType.COMPLETED}>
            <section className="w-full flex flex-col gap-y-3 p-4">
              {reviews.map((review) => (
                <ReviewCompletionCard
                  key={review.id}
                  {...review}
                />
              ))}
              {reviews.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  작성한 후기가 없습니다.
                </div>
              )}
            </section>
          </TabsContent>
        </Tabs>
      </section>

      <article className="flex flex-1">
      </article>
      <BTB/>
    </div>
  )
}
