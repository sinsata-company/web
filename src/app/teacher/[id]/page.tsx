'use client'

import BackAppbar from '@/components/common/BackAppbar'
import ImageCarousel from './components/ImageCarousel'
import TeacherSummary from './components/TeacherSummary'
import {Button, BUTTON_TYPE} from '@/components/common/Button'
import TeacherAdvance from './components/TeacherAdvance'
import TeacherReview from './components/TeacherReview'
import TeacherIntroduciton from './components/TeacherIntroduction'
import AdviceQnA from './components/AdviceQnA'
import {useParams, usePathname, useRouter} from 'next/navigation'
import {useEffect, useState} from 'react'
import {IAdvisor} from '@/dummy/dummyTeacher'

import {getTeacherDetail} from '@/app/api/teacher'
import {TeacherDetailDto} from '@/app/api/data'
import TeacherNotice from './components/TeacherNotice'
import {Heart} from "lucide-react";
import {basicPost} from "@/api/base";
import {getMyInfo} from "@/app/api/user";

export default function TeacherPage() {
    const [advisor, setAdvisor] = useState<TeacherDetailDto | null>(null)
    const router = useRouter()
    const param = useParams()
    const teacherId = String(param.id)

    useEffect(() => {
        getInfo()
    }, [])

    const getInfo = async () => {
        const response = await getTeacherDetail(teacherId);
        const myInfo = await getMyInfo();

        const selfLiked = !!myInfo?.likedTeachers && (myInfo?.likedTeachers.some((item: any) => {
            return item.teacherId === teacherId;
        }));

        //@ts-ignore
        setAdvisor({
            ...response || {},
            selfLiked
        })
    }

    const changeSelfLiked = async () => {
        try {
            await basicPost("/users/changeLiked", {id: advisor?.id});
        } catch (error) {
            console.log('error', error);
            alert("찜 설정 도중 문제가 발생 했습니다. 잠시후 다시 시도 해주세요.")
        } finally {
            setAdvisor((prevState: TeacherDetailDto) => {
                const newCnt = (prevState?.likedCnt || 0) + (!prevState?.selfLiked ? 1 : -1);
                return {
                    ...prevState,
                    selfLiked: !prevState?.selfLiked,
                    likedCnt: newCnt <= -1 ? 0 : newCnt
                }
            })
        }
    };

    return (
        <div>
            <BackAppbar/>
            <div className="px-5">
                <ImageCarousel
                    imageList={advisor?.images || []}
                    showImageModal={() => {
                    }}
                />
                <div className="h-6"></div>
                <TeacherSummary advisor={advisor}/>
                <div className="h-6"></div>
                <div className="flex items-center justify-between">
                    <Button
                        className="w-[90%]"
                        onClick={() => {
                            router.push('/teacher/' + teacherId + '/reserve')
                        }}
                        buttonType={BUTTON_TYPE.primary}
                        label="예약하기"
                    />
                    <div
                        className="max-w-[25%] ml-3 flex items-center justify-center flex-col">
                        <Heart className="cursor-pointer" color="#f54747"
                               fill={advisor?.selfLiked ? "#f54747" : "none"}
                               onClick={() => changeSelfLiked()}
                               size={25} enableBackground={1}/>
                        <p className="text-[#f54747]">({Number(advisor?.likedCnt || 0).toLocaleString()})</p>
                    </div>
                </div>
                <div className="h-6">
                </div>
            </div>
            <div className="h-2 bg-zinc-100"/>
            <div className="px-5 py-6">
                <TeacherAdvance advisor={advisor}/>
            </div>
            {advisor?.notice && (
                <div className="px-5 py-6">
                    <TeacherNotice advisor={advisor}/>
                </div>
            )}
            {advisor?.reviews.length > 0 && (
                <div className="px-5 py-6">
                    <TeacherReview/>
                </div>
            )}
            <div className="px-5 py-6">
                <TeacherIntroduciton introduction={advisor?.introduction}/>
            </div>
            <div className="px-5 py-6">
                <AdviceQnA/>
            </div>
        </div>
    )
}
