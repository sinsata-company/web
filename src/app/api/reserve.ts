import { basicUnpagedGet } from '@/api/base'
import { basicPost } from './base'

export interface IMakeReserve {
  reserveDate: string
  reserveTime: string
  reserveMinutes: number
  reserveType: 'CALL' | 'CHAT'
}

export const makeReserve = async (reserve: IMakeReserve, teacherid: string) => {
  const { data } = await basicPost('/reserve/' + teacherid, reserve)
  return data
}

export const myReserves = async () => {
  const resulst = await basicUnpagedGet('/reserve/me')
  return resulst
}
