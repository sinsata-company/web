import { basicUnpagedGet, basicPost, basicGet, BASE_URL } from '@/api/base'
import { CashHistoryDto, ChatDto, ChatRoomRes, IMessage, InquiryResponseDto, TeacherChatInquiryDto } from './data'
import { basicPut } from './base'

export const getMyChats = async () => {
  return await basicUnpagedGet<ChatDto[]>('/chats/my')
}

export const startInstantChat = async (teacherId: string) => {
  return await basicUnpagedGet<ChatRoomRes>(`/reserve/${teacherId}/livechat`)
}

export const getChatDetail = async (roomId: string) => {
  return await basicUnpagedGet<ChatDto>(`/chats/${roomId}`)
}

export const completeChat = async (roomId: string) => {
  return await basicUnpagedGet<boolean>(`/chats/${roomId}/end`)
}

export const chatMessages = async (roomId: string) => {
  return await basicUnpagedGet(`/chats/messages/all?chatRoomId=${roomId}`);
}

export const createInquiryChat = async (teacherId: string, productId: string) => {
  console.log('teacherId', teacherId);
  console.log('productId', productId);
  return await basicPost<ChatDto>(`/chats/inquiry/${teacherId}?productId=${productId}`, {});
}

export const createInquiryChatMessage = async (message: IMessage) => {
  console.log('message', message);
  return await basicPost<IMessage>(`/chats/inquiry/messages`, message);
}

export const createInquiry = async (teacherId: string, content: string) => {
  return await basicPost<IMessage>(`/inquiries/${teacherId}`, { content });
}

export const getInquiry = async (teacherId: string) => {
  console.log('teacherId', teacherId);
  return await basicGet<IMessage>(`/inquiries/${teacherId}`);
}

export const getInquiryList = async () => {
  return await basicGet<IMessage>(`/inquiries`);
}

export const getInquiryNote = async (inquiryId: string) => {
  return await basicGet<IMessage>(`/inquiries/${inquiryId}/note`);
}

export const getInquiryById = async (inquiryId: string) => {
  return await basicGet<InquiryResponseDto>(`/inquiries/${inquiryId}`);
}

export const updateInquiry = async (inquiryId: string, content: string) => {
  return await basicPut<InquiryResponseDto>(`/inquiries/${inquiryId}`, { content });
}

export const createInquiryNote = async (inquiryId: string, content: string) => {
  return await basicPost<IMessage>(`/inquiries/${inquiryId}/note`, { content });
}

export const getCustomerAll = async (customerId: string) => {
  return await basicGet<IMessage>(`/customer/${customerId}/all`);
}
