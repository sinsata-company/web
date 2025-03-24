import { basicGet } from "@/api/base";
import { basicTeacherGet } from "@/app/manage/api/base";
import { axiosClient } from "@/api/base";

export const readAllChatUser = (roomId: string) => basicGet(`/chats/read/${roomId}`);
export const readAllChatTeacher = (roomId: string) => basicTeacherGet(`/chats/read/teacher/${roomId}`);
export const leaveChat = (roomId: string, userId: string) => axiosClient.get(`/chats/leave/${roomId}/${userId}`);
