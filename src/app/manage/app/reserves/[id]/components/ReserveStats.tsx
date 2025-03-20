import { TeacherReserveHistoryDto } from '@/types/api'
import GradientTitle from '@/components/common/GradientTitle'

const ReserveStats = ({ detail }: { detail: TeacherReserveHistoryDto | undefined }) => {
  return (
    <div>
      <GradientTitle title="고객과의 상담 통계" />
      <div className="text-zinc-900 text-xl font-bold ">
        총 {detail?.totalConsultationCount}회,{' '}
        {detail?.totalConsultationMinutes}분 진행
      </div>
    </div>
  )
}

export default ReserveStats
