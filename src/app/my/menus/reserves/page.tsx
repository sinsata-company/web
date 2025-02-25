'use client'

import { CashHistoryDto } from '@/app/api/data'
import { useEffect, useState } from 'react'
import ChargeHistoryItem from '../../components/ChargeHistoryItem'
import { getChargeHistory } from '@/app/api/cash'
import { myReserves } from '@/app/api/reserve'

export default function Page() {
  const [histories, setHistories] = useState<CashHistoryDto[]>([])
  useEffect(() => {
    console.log('asdfafd')
    getChargeHistory().then((res) => {
      if (Array.isArray(res)) {
        setHistories(res)
      } else {
        console.error('Expected an array of CashHistoryDto')
      }
    })
  }, [])
  return (
    <div>
      {histories.map((history, idx) => {
        if (history.createdAt) {
          return <ChargeHistoryItem key={idx} {...history} />
        }
      })}
    </div>
  )
}
