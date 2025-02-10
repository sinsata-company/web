import { ReserveDto } from '@/app/api/data'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const ReserveItem = ({
  teacherId,
  thumbnail,
  userName,
  startAt,
  endAt,
  reserveType,
}: ReserveDto) => {
  const nav = useRouter()
  return (
    <div
      onClick={() => {
        nav.push('/teacher/' + teacherId)
      }}
      className="w-full grow h-28 p-4 bg-neutral-50 rounded-2xl border border-zinc-100 justify-start items-center gap-3 inline-flex"
    >
      <Image
        style={{
          objectFit: 'cover',
        }}
        className=" rounded-xl w-20 h-20"
        src={thumbnail || '/logo.jpg'}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==" // 추가
        width={80}
        height={80}
        alt="profile"
      />
      <div className="grow flex-col justify-center items-start gap-2 inline-flex overflow-hidden">
        <div className=" text-zinc-900 text-base font-bold font-['Pretendard Variable']">
          {userName}
        </div>
        <div className=" text-zinc-900 text-base text-xs font-['Pretendard Variable']">
          {moment(startAt).format('YYYY-MM-DD HH:mm')} -
          {moment(endAt).format('YYYY-MM-DD HH:mm')}
        </div>
      </div>
      <div className=" text-gradient text-base font-bold font-['Pretendard Variable']">
        {reserveType == 'CALL' ? '전화 상담' : '채팅 상담'}
      </div>
    </div>
  )
}

export default ReserveItem
