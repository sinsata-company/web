import { basicUnpagedGet } from '@/api/base'
import { CashHistoryDto, ChatDto, ChatRoomRes } from './data'

export const getMyChats = async () => {
  return await basicUnpagedGet<ChatDto[]>('/chats/my')
}

export const startInstantChat = async (teacherId: string) => {
  return await basicUnpagedGet<ChatRoomRes>(`/reserve/${teacherId}/livechat`)
}

export const getChatDetail = async (roomId: string) => {
  return await basicUnpagedGet<ChatDto>(`/chats/${roomId}`)
}
