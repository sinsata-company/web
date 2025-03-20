'use client'

import {useEffect, useState, useRef, useCallback} from 'react'
import AdvisorSort from '@/app/home/components/AdvisorSort'
import {TeacherListDto} from '@/app/api/data'
import {getTeacherLikeList, getTeacherList, SearchType} from '@/app/api/teacher'
import {useSearch} from '@/components/common/SearchContext'
import {getMyInfo} from "@/app/api/user";
import {UserDto} from "@/types/user";
import { getMyLikeTeachers } from '@/app/api/teacher'
// 초성 추출 함수
import LikedAdvisorList from './LikedAdvisorList'
const getChosung = (str: string) => {
    const cho = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
    let result = "";
    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i) - 44032;
        if (code > -1 && code < 11172) {
            result += cho[Math.floor(code / 588)];
        }   
    }
    return result;
};

export default function AdvisorContainer() {
    const [advisorList, setAdvisorList] = useState<TeacherListDto[]>([])
    const [page, setPage] = useState<number>(0)
    const [sort, setSort] = useState<SearchType>(SearchType.NEW)
    const [hasMore, setHasMore] = useState(true)
    const observer = useRef<IntersectionObserver | null>(null)
    const {searchTerm} = useSearch();

    useEffect(() => {
        if ('scrollRestoration' in window?.history) {
            window.history.scrollRestoration = 'manual' // 자동 스크롤 복원 비활성화
        }
    }, [])

    useEffect(() => {
        getTeachers(SearchType.NEW, 0)
    }, [])

    const changeLiked = (id: string) => {
        console.log('id', id);
        setAdvisorList((prevState) => ([...prevState].map((item: TeacherListDto) => {
            if (item.id === id) {
                item.selfLiked = !item.selfLiked
            }
            return item;
        })))
    }

    const getTeachers = async (query: SearchType, page: number) => {
        const response = await getTeacherLikeList(query, page)
        setAdvisorList(response.content)
        // let user: UserDto | null | undefined;
        // let likedTeachers: TeacherListDto[] = [];

        // try {
        //     user = await getMyInfo();
        //     if (user) {
        //         // 좋아요한 선생님 목록 가져오기
        //         likedTeachers = await getMyLikeTeachers();
        //     }
        // } catch (error) {
        //     console.log('error', error)
        // }


        // setAdvisorList((prev) => ([...prev, ...filteredTeachers].map((item: TeacherListDto) => ({
        //     ...item,
        //     selfLiked: true // 이미 좋아요한 선생님들이므로 true로 설정
        // }))));
        
        if (advisorList.length === 0) return;
        setHasMore(!response.last)
    }

    const lastAdvisorElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1)
                }
            })
            if (node) observer.current.observe(node)
        },
        [hasMore]
    )

    return (
        <div>
            <div className="px-5">
                <AdvisorSort
                    getTeachers={async (sort, page) => {
                        setPage(0)
                        setSort(sort)
                        setAdvisorList([])
                        await getTeachers(sort, page)
                    }}
                    page={page}
                    path={'/heart'}
                />
            </div>
            <div className="h-6"></div>
            <div className="px-5 h-screen">
                <LikedAdvisorList
                    advisorList={advisorList}
                    changeLiked={changeLiked}
                    lastAdvisorElementRef={lastAdvisorElementRef}
                />
            </div>
        </div>
    )
}
