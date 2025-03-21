import { TeacherReserveHistoryDto } from '@/types/api'
import GradientTitle from '@/components/common/GradientTitle'
import moment from 'moment'
import { Button, BUTTON_TYPE } from '@/components/common/Button'

const ReserveSummary = ({ detail }: { detail: TeacherReserveHistoryDto | undefined }) => {
  moment.locale('ko')
  return (
    <div className="px-5 inline-flex flex-col gap-5 w-full">
      <div className="w-full  justify-start items-start gap-2 inline-flex">
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
          <GradientTitle title={detail?.customerName + ' 고객'} />
          <div className="text-zinc-900 text-xl font-bold ">
            {moment(detail?.consultationStartTime).format('YYYY년 MM월 DD일')}
            <br />
            {moment(detail?.consultationStartTime).format('a hh시 mm분')} -{' '}
            {moment(detail?.consultationEndTime).format('a hh시 mm분')}
          </div>
        </div>
        <div className="p-2 bg-red-600/10 rounded-full justify-center items-center gap-1 flex">
          <div className="text-red-600 text-base font-bold  leading-tight">
            {detail?.type == 'CHAT' ? '채팅 상담' : '전화 상담'}
          </div>
        </div>
      </div>
      {detail?.type == 'CHAT' && (
        <Button buttonType={BUTTON_TYPE.primary} label="채팅 내역 보기" />
      )}
    </div>
  )
}

export default ReserveSummary
