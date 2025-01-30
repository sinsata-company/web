import GradientTitle from '@/components/common/GradientTitle'
import ReviewItem from '@/components/common/ReviewItem'

const ReserveReview = () => {
  return (
    <div className="flex-col justify-start items-start gap-2 inline-flex">
      <GradientTitle title="상담 고객 리뷰" />
      <ReviewItem />
    </div>
  )
}

export default ReserveReview
