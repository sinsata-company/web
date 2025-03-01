'use client'

import { getVaList } from '@/app/api/cash'
import { useEffect } from 'react'

export default function Page() {
  useEffect(() => {
    getVaList(0)
  }, [])
  return <div>asdf</div>
}
