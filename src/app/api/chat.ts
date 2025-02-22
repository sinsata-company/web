import { basicUnpagedGet } from '@/api/base'
import { CashHistoryDto, ChatDto } from './data'

export const getMyChats = async () => {
  return await basicUnpagedGet<CashHistoryDto[]>('/chats/my')
}

export const startInstantChat = async (teacherId: string) => {
  return await basicUnpagedGet<ChatDto>(`/chats/${teacherId}/livechat`)
}
