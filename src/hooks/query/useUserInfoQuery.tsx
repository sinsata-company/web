import { getMyInfo } from "@/app/api/user";
import { useQuery } from "@tanstack/react-query";

const useUserInfoQuery = () => {
    const { data: user = undefined, ...props } = useQuery({
        queryKey: ['user'],
        queryFn: getMyInfo,
    });

    return { user, ...props };
}

export default useUserInfoQuery;
