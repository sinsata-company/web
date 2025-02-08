import { cashDto } from '@/types/cashTables'
import { basicUnpagedGet } from '../../api/base'

export const getMenus = async () => {
  const result = await basicUnpagedGet<cashDto[]>('/cash/tables')
  return result
}

export const getMyCash = async () => {
  const result = await basicUnpagedGet<number>('/cash/users/cash')
  return result
}

export const requestPayment = async (amount: number, timestamp: string) => {
  const result = await basicUnpagedGet(
    `/cash/request?oid=${timestamp}&payAmt=${amount}`
  )
  return result
}
