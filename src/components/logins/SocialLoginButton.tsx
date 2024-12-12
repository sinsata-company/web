import Image from 'next/image'

interface SocialLoginButtonProps {
  name: string
  image: string
  onClick: (name: string) => void
}

export default function SocialLoginButton({
  name,
  image,
  onClick,
}: SocialLoginButtonProps) {
  return (
    <div
      onClick={() => {
        onClick('d')
      }}
      className="w-full px-5 py-4 bg-white rounded-xl justify-center items-center gap-1 inline-flex"
    >
      <Image
        src={`/images/ic_siginin_${image}.svg`}
        width={24}
        height={24}
        alt="socials"
      />

      <div className="text-center text-zinc-900 text-sm font-bold font-['Noto Sans KR'] leading-tight">
        {name}로 로그인
      </div>
    </div>
  )
}
