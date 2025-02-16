import Image from 'next/image'

export enum MembershipLevel {
  LEVEL1 = '신의불씨',
  LEVEL2 = '사주의비밀',
  LEVEL3 = '타로의빛',
  LEVEL4 = '심리의정령',
  LEVEL5 = '신사타의전설',
}

const Membership = ({ level }: { level: string }) => {
  return (
    <div className="p-4 flex justify-between items-center ">
      <div className="self-stretch text-zinc-900 text-2xl font-bold font-['Pretendard Variable']">
        나의 멤버십 등급
      </div>
      <div className="flex items-center">
        <Image
          src={`/images/membership/${level}.png`}
          alt="level"
          width={36}
          height={36}
        />
        <span className="text-zinc-900 text-lg font-bold font-['Pretendard Variable']">
          {MembershipLevel[level as keyof typeof MembershipLevel]}
        </span>
      </div>
    </div>
  )
}

export default Membership
