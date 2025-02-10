import { basicUnpagedGet } from '@/api/base'
import { CashHistoryDto } from './data'

export const getMyChats = async () => {
  return await basicUnpagedGet<CashHistoryDto[]>('/chat/my')
}
