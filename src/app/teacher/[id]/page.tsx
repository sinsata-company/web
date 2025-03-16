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

export default function TeacherPage() {
    const [advisor, setAdvisor] = useState<TeacherDetailDto | null>(null)
    const router = useRouter()
    const param = useParams()
    const teacherId = String(param.id)

    useEffect(() => {
        getInfo()
    }, [])

    const getInfo = async () => {
        const response = await getTeacherDetail(teacherId)
        setAdvisor(response)
    }

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
                        className="w-[10%] ml-3 flex items-center justify-center flex-col">
                        <Heart className="cursor-pointer" color="#f54747"
                            // fill={newSelfLiked ? "#f54747" : "none"}
                               size={25} enableBackground={1}/>
                        <p className="text-[#f54747]">({advisor?.likedCnt || 0})</p>
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
