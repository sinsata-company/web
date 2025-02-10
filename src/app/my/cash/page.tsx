'use client'

import { getMenus, getMyCash, requestPayment } from '@/app/api/cash'
import { getPayURL } from '@/app/api/http/mtn'
import BackAppbar from '@/components/common/BackAppbar'
import { cashDto } from '@/types/cashTables'
import { formatNumberWithCommas } from '@/utils/numberFormatter'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CashChargePage() {
  const [myCash, setMyCash] = useState<number>(0)
  const [menus, setMenus] = useState<cashDto[]>([])
  useEffect(() => {
    document.title = '캐시 충전'
    getMenusList()
    getMyCashFc()
  }, [])
  const onClickCharge = async (cash: number) => {
    const time = new Date().getTime().toString()
    requestPayment(cash, time)
    const url = await getPayURL(cash, time)
    console.log(url)
    window.location.href = url
  }

  const getMenusList = async () => {
    const result = await getMenus()
    setMenus(result)
  }

  const getMyCashFc = async () => {
    const result = await getMyCash()
    setMyCash(result)
  }
  const router = useRouter()

  return (
    <div>
      <BackAppbar
        onClick={() => {
          router.replace('/my')
        }}
      />

      <div className="w-full px-5 flex-col justify-start items-start gap-6 inline-flex">
        <div className="self-stretch h-14 p-4 bg-gradient-to-br from-yellow-400 via-red-600 to-blue-800 rounded-xl justify-between items-center inline-flex">
          <div className="text-white text-base font-medium font-['Pretendard Variable']">
            보유 캐시
          </div>
          <div className="text-white text-base font-bold font-['Pretendard Variable']">
            {formatNumberWithCommas(myCash)} 캐시
          </div>
        </div>
        <div className="self-stretch flex-col justify-start items-start gap-3 flex">
          <div className="text-zinc-900 text-xl font-bold font-['Pretendard Variable']">
            캐시 충전
          </div>
          <div className="self-stretch p-4 rounded-2xl border-2 border-yellow-400 flex-col justify-start items-start gap-4 flex">
            <CashItem
              key={'0152'}
              payAmt={100}
              cashAmt={100}
              onClickCharge={onClickCharge}
            />
            {menus.map((item, index) => (
              <CashItem key={index} {...item} onClickCharge={onClickCharge} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface CashItemProps extends cashDto {
  isPopular?: boolean
  onClickCharge: (cash: number) => void
}

const CashItem = ({
  cashAmt,
  payAmt,
  isPopular,
  onClickCharge,
}: CashItemProps) => {
  return (
    <div className="self-stretch justify-between items-center inline-flex">
      <div className="text-zinc-900 text-base font-bold font-['Pretendard Variable']">
        {isPopular && (
          <div className="text-red-600 text-xs font-bold font-['Pretendard Variable']">
            인기
          </div>
        )}
        {`${formatNumberWithCommas(cashAmt)}`}캐시
      </div>
      <div
        onClick={() => onClickCharge(cashAmt)}
        className="px-4 py-3 bg-red-600/10 rounded-xl justify-start items-center gap-3 flex"
      >
        <div className="text-red-600 text-base font-medium font-['Pretendard Variable']">
          ₩
        </div>
        <div className="text-red-600 text-base font-bold font-['Pretendard Variable']">
          {`${formatNumberWithCommas(payAmt)}`}
        </div>
      </div>
    </div>
  )
}
