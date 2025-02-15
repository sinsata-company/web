import Image from 'next/image'

interface SocialLoginButtonProps {
  name: string
  image?: string
  onClick: (name: string) => void
  label?: string
}

export default function SocialLoginButton({
  name,
  image,
  onClick,
  label,
}: SocialLoginButtonProps) {
  return (
    <div
      onClick={() => {
        onClick(name)
      }}
      className="w-full px-5 h-14 py-4 bg-white rounded-xl justify-center items-center gap-1 inline-flex"
    >
      {image && (
        <Image
          src={`/images/ic_siginin_${image}.svg`}
          width={24}
          height={24}
          alt="socials"
        />
      )}

      <div className="text-center text-zinc-900 text-sm font-bold font-['Noto Sans KR'] leading-tight">
        {label ?? `${name}로 로그인`}
      </div>
    </div>
  )
}
