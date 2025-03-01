import { cashDto } from '@/types/cashTables'
import { basicGet, basicUnpagedGet } from '../../api/base'
import { CashHistoryDto } from './data'

export const getMenus = async () => {
  const result = await basicUnpagedGet<cashDto[]>('/cash/tables')
  return result
}

export const getMyCash = async () => {
  const result = await basicUnpagedGet<number>('/cash/users/cash')
  return result
}

export const getChargeHistory = async () => {
  const result = await basicUnpagedGet<CashHistoryDto>('/cash/users/history')
  return result
}

export const requestPayment = async (amount: number, timestamp: string) => {
  const result = await basicUnpagedGet(
    `/cash/request?oid=${timestamp}&payAmt=${amount}`
  )
  return result
}

export const getVaList = async (page: number) => {
  const result = await basicGet(`/cash/va/list?page=${page}`)
  return result
}
