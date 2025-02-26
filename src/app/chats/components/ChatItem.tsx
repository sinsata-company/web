import { CashHistoryDto, ChatDto } from '@/app/api/data'
import ChatStatus from './ChatStatus'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import TeacherTypeLabel from '@/components/common/TeacherTypeLabel'

export default function ChatItem(props: ChatDto) {
  const {
    teacherName,
    teacherProfile,
    lastMsg,
    startAt,
    endAt,
    status,
    roomId,
    teacherType,
  } = props
  const router = useRouter()
  return (
    <div
      onClick={() => {
        router.push(`/chats/private/${roomId}`)
      }}
      className="w-full h-32 p-4 bg-white border rounded-xl justify-center items-start gap-3 inline-flex"
    >
      <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
        <ChatStatus status={status} />
        <div className="self-stretch h-14 flex-col justify-start items-start gap-1 flex">
          <div className="self-stretch h-10 flex-col justify-start items-start gap-0.5 flex">
            <div className="self-stretch text-zinc-900 text-base font-bold font-['Pretendard Variable']">
              {teacherName}
            </div>
            <div className="self-stretch text-neutral-500 text-sm font-normal font-['Pretendard'] leading-tight">
              {lastMsg ? lastMsg : '메시지가 없습니다.'}
            </div>
          </div>
          <div className="self-stretch text-zinc-400 text-xs font-normal font-['Pretendard']">
            {moment(startAt).format('yyyy-MM-DD HH:mm')}
            {status != 'REQUEST'
              ? ` - ${moment(endAt).format('yyyy-MM-DD HH:mm')}`
              : ''}
          </div>
        </div>
      </div>
      <div className="w-32 h-20 bg-white rounded-xl relative">
        <TeacherTypeLabel teacherType={teacherType} />
        <img
          src={teacherProfile}
          alt="profile"
          className="w-32 h-20 rounded-xl"
        />
      </div>
    </div>
  )
}
