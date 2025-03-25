'use client';

import Btb from '@/components/common/Btb';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { basicGet } from '@/api/base';
import { TeacherReviewDetails } from '@/types/review';
import UserReviewCard from '@/components/reviews/user-review-card';

export default function Page() {
    const router = useRouter();
    const pathname = usePathname();
    const teacherId = pathname.split('/')[2].replace('/', '') as string;
    console.log({ teacherId });
  
    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews', teacherId],
        queryFn: () => basicGet(`/reviews/${teacherId}`) as unknown as Promise<TeacherReviewDetails[]>,
    });

    console.log({ reviews });

    const onClickBack = () =>  router.back();

    return (
        <div className="w-full flex flex-col h-[100dvh] overflow-hidden bg-[#f9fafb]">
        <header className="h-[64px] w-full px-4 flex items-center bg-sinsata-blue">
          <button className="flex gap-x-1" onClick={onClickBack}>
            <Image src="/images/left-arrow-white.svg" alt="back" width={28} height={28} />
            <span className="text-white pt-[3px]">전체 후기</span>
          </button>
        </header>

        <section className="w-full flex-1 flex flex-col gap-y-3 pb-[64px] overflow-y-auto">
          {reviews.map((review) => (
            <UserReviewCard
              key={review.id}
              {...review}
            />
          ))}
        </section>

        <Btb />
        </div>
    );
}
