import ReviewItem from '@/components/common/ReviewItem'

export default function TeacherReview() {
  return (
    <div className="flex-col justify-start items-start gap-4 inline-flex">
      <div className="self-stretch text-yellow-400 text-base font-bold ">
        상담사 리뷰
      </div>
      <ReviewItem />
    </div>
  )
}
