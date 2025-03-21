import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAppContext } from '@/context/AppContext'

const ApplyCsl = () => {
  const router = useRouter()
  const { fontFamily, fontSize } = useAppContext() || {}

  return (
    <div
      className={`w-full h-36 relative cursor-pointer ${fontFamily} [&_*]:${fontSize}`}
      onClick={() => {
        router.push('/manage')
      }}
    >
      <Image src={'/images/apply_csl_btn.svg'} fill alt="apply_csl_btn" />
    </div>
  )
}

export default ApplyCsl
