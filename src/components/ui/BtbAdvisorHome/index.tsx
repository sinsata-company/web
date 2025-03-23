'use client'

import { basicGet } from "@/api/base";
import BTBItem from "@/components/common/BtbItem";
import { useQuery } from "@tanstack/react-query";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useUserInfoQuery } from "@/hooks/query";
import { useEffect } from "react";
import { queryClient } from "@/lib/query/queryClient";
import { basicTeacherGet } from "@/app/manage/api/base";
import { getMyInfoByTeacher } from "@/app/api/user";

type Count = {
    unreadCount: number;
}

const getNotificationCount = () => basicTeacherGet('/notifications/teacher/count') as unknown as Promise<Count>;

export default function BtbAdvisorHome() {
    const { data: count = { unreadCount: 0 }, refetch: refetchCount } = useQuery({
        queryKey: ['notificationCount', 'user'],
        queryFn: () => getNotificationCount()
    });
    const { data: user } = useQuery({
        queryKey: ['user'],
        queryFn: () => getMyInfoByTeacher()
    });
    const showNoti = count?.unreadCount > 0;
    const notiCount = count?.unreadCount > 99 ? '99+' : count?.unreadCount;
  
    useWebSocket({
        channelUrl: `/sub/notification/${user?.userId}`,
        onMessage: (message) => {
            refetchCount();
            queryClient.invalidateQueries({
                queryKey: ['reserveByDate'],
            });
        },
        enabled: !!user,
    });

    useEffect(() => {
      refetchCount();
    }, []);

    return (
        <div className="cursor-pointer grow flex-col justify-start items-center  inline-flex max-w-[550px] mx-auto relative">
            <div className="relative">
                <BTBItem name="홈" image="home" url="/manage/app/main/home" />
                {showNoti && <div className="absolute top-[-4px] right-[-8px] bg-red-500 min-w-[24px] h-[24px] rounded-full">
                  <span className="text-white text-[12px] flex items-center justify-center font-bold">
                  {notiCount}
                  </span>
                </div>}
            </div>
        </div>
    );
};

