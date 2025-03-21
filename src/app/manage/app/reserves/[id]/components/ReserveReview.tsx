import { TeacherReserveHistoryDto } from '@/types/api'
import GradientTitle from '@/components/common/GradientTitle'
import ReviewItem from '@/components/common/ReviewItem'

const ReserveReview = ({ detail }: { detail: TeacherReserveHistoryDto | undefined  }) => {
  const reviews = (detail?.reviews ?? []).reverse();
  return (
    <div className="flex-col justify-start items-start gap-2 inline-flex">
      <GradientTitle title="상담 고객 리뷰" />
      {reviews.map((review, index) => (
        <ReviewItem key={index} {...review} />
      ))}
    </div>
  )
}

export default ReserveReview;
