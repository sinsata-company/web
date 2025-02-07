import BTB from '@/components/common/Btb'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import Input from '@/components/common/Input'
import MainAppbar from '@/components/common/MainAppbar'
import Image from 'next/image'
import AdviseContent from './components/AdviseContent'

export default function SearchPage() {
  return (
    <div>
      <MainAppbar />
      <div className="w-full py-5 px-5 flex-col justify-start items-center gap-8 inline-flex">
        <div className="self-stretch  flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-900 text-2xl font-bold font-['Pretendard Variable']">
            생년원일을 입력해주시면
            <br />더 정확한 상담이 가능합니다
          </div>
        </div>
        <AdviseContent />
      </div>
      <BTB />
    </div>
  )
}
