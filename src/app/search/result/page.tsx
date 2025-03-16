'use client'

import {TeacherDetailDto, TeacherListDto} from '@/app/api/data'
import {getRecommendation} from '@/app/api/teacher'
import AdvisorList from '@/app/home/components/AdvisorList'
import BackAppbar from '@/components/common/BackAppbar'
import {useSearchParams} from 'next/navigation'
import {Suspense, useEffect, useState} from 'react'
import {getMyInfo} from "@/app/api/user";
import {UserDto} from "@/types/user";

export default function Page() {
    return (
        <Suspense>
            <Container/>
        </Suspense>
    )
}

const Container = () => {
    const [teachers, setTeachers] = useState<TeacherListDto[]>([])

    useEffect(() => {
        getRecommendResult()
    }, [])

    const param = useSearchParams()
    const getRecommendResult = async () => {
        const result = await getRecommendation(param.get('requestId') ?? '')

        let user: UserDto | null | undefined;
        try {
            user = await getMyInfo();
        } catch (error) {
            console.log('error', error)
        }

        console.log('user', user)

        setTeachers(result?.map((item: any) => ({
            ...item,
            selfLiked: !!user && Array.isArray(item.likedTeachers) && 
                item.likedTeachers.some((liked: any) => liked.testId === user?.userId && liked.teacherId === item.id)
        })) as any)
    }

    const changeLiked = async () => {
        await getRecommendResult()
    }

    return (
        <>
            <BackAppbar/>
            <div className="w-full py-5 px-5 flex-col justify-start items-center gap-8 inline-flex">
                <div className="self-stretch  flex-col justify-start items-start gap-4 flex">
                    <div className="self-stretch text-zinc-900 text-2xl font-bold ">
                        이런 선생님들은 어떠세요?
                    </div>
                </div>
                <AdvisorList advisorList={teachers} changeLiked={changeLiked}/>
            </div>
        </>
    )
}
