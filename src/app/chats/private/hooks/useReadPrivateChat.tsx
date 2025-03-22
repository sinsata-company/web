import { basicPost } from "@/api/base";
import { queryClient } from "@/lib/query/queryClient";
import { useMutation } from "@tanstack/react-query";

const readPrivateChat = (roomId: string) => basicPost(`/notifications/${roomId}/read`, null) as unknown as Promise<void>

export default function useReadPrivateChat(roomId: string) {
    return useMutation({
        mutationFn: () => readPrivateChat(roomId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [['chats', roomId], ['notificationCount', 'user']] })  
        },
    });
}
