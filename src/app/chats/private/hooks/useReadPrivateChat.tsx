import { basicPost } from "@/api/base";
import { basicTeacherPost } from "@/app/manage/api/base";
import { queryClient } from "@/lib/query/queryClient";
import { useMutation } from "@tanstack/react-query";

const readPrivateChat = (roomId: string) => basicPost(`/notifications/${roomId}/read`, null) as unknown as Promise<void>
const readPrivateChatTeacher = (roomId: string) => basicTeacherPost(`/notifications/teacher/${roomId}/read`, null) as unknown as Promise<void>

export default function useReadPrivateChat(roomId: string, isTeacher: boolean = false) {
    return useMutation({
        mutationFn: () => isTeacher ? readPrivateChatTeacher(roomId) : readPrivateChat(roomId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [['chats', roomId], ['notificationCount', 'user']] })  
        },
    });
}
