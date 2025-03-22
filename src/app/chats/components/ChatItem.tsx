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
    unreadCount = 0
  } = props
  const router = useRouter()
  const showNoti = unreadCount > 0;
  const notiCount = unreadCount > 99 ? '99+' : unreadCount;

  return (
    <div
      onClick={() => {
        router.push(`/chats/private/${roomId}`)
      }}
      className="w-full h-32 p-4 bg-white border rounded-xl justify-center items-start gap-3 inline-flex relative"
    >
      {showNoti && (
        <div className="absolute top-2 right-2 bg-red-500 min-w-[24px] z-30 h-[24px] rounded-full flex items-center justify-center">
          <span className="text-white text-[12px] font-bold">
            {notiCount}
          </span>
        </div>
      )}
      <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
        <ChatStatus status={status} />
        <div className="self-stretch h-14 flex-col justify-start items-start gap-1 flex">
          <div className="self-stretch h-10 flex-col justify-start items-start gap-0.5 flex">
            <div className="self-stretch text-zinc-900 text-base font-bold  overflow-hidden">
              {teacherName.replaceAll('선생님', '')}
            </div>
            <div className="self-stretch text-neutral-500 text-sm font-normal  leading-tight">
              {lastMsg ? lastMsg : '메시지가 없습니다.'}
            </div>
          </div>
          <div className="self-stretch text-zinc-400 text-xs font-normal ">
            {startAt == null
              ? '상담 시작 전입니다.'
              : moment(startAt).format('yyyy-MM-DD HH:mm')}
            {status != 'REQUEST' && endAt
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
