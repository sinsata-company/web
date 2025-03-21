import Image from 'next/image'
import { useRouter } from 'next/navigation'

const ApplyCsl = () => {
  const router = useRouter()
  return (
    <div
      className="w-full h-36 relative cursor-pointer"
      onClick={() => {
        router.push('/manage')
      }}
    >
      <Image src={'/images/apply_csl_btn.svg'} fill alt="apply_csl_btn" />
    </div>
  )
}

export default ApplyCsl
