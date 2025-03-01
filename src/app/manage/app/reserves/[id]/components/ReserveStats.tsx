import { ReserveDetailDto } from '@/app/manage/api/reserve'
import GradientTitle from '@/components/common/GradientTitle'

const ReserveStats = ({ detail }: { detail: ReserveDetailDto | null }) => {
  return (
    <div>
      <GradientTitle title="고객과의 상담 통계" />
      <div className="text-zinc-900 text-xl font-bold ">
        총 {detail?.reserveCount}회,{' '}
        {Math.floor((detail?.reserveSeconds ?? 0) / 60)}분 진행
      </div>
    </div>
  )
}

export default ReserveStats
