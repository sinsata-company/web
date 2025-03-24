'use client'

import {useState, useEffect, useRef, useCallback} from 'react'
import AdvisorList from './AdvisorList'
import AdvisorSort from './AdvisorSort'
import {TeacherListDto} from '@/app/api/data'
import {getTeacherList, SearchType} from '@/app/api/teacher'
import {useSearch} from '@/components/common/SearchContext'
import {getMyInfo} from "@/app/api/user";
import {UserDto} from "@/types/user";
import { safeMap } from '@/utils/safeMap'

// 초성 추출 함수
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

export default function AdvisorContainer({ path }: { path?: string }) {
    const [isMounted, setIsMounted] = useState(false);
    const [advisorList, setAdvisorList] = useState<TeacherListDto[]>([])
    const [page, setPage] = useState<number>(0)
    const [sort, setSort] = useState<SearchType>(SearchType.NEW)
    const [hasMore, setHasMore] = useState(true)
    const observer = useRef<IntersectionObserver | null>(null)
    const {searchTerm} = useSearch();

    useEffect(() => {
        setIsMounted(true);
        if ('scrollRestoration' in window?.history) {
            window.history.scrollRestoration = 'manual' // 자동 스크롤 복원 비활성화
        }
    }, [])

    useEffect(() => {
        if (isMounted) {
            getTeachers(SearchType.NEW, page)
        }
    }, [page, sort, isMounted])

    const changeLiked = (id: string) => {
        console.log('id', id);
        setAdvisorList((prevState) => {
            return safeMap([...prevState], (item: TeacherListDto) => {
                if (item.id === id) {
                    item.selfLiked = !item.selfLiked
                }
                return item;
            })
        })
    }

    const getTeachers = async (query: SearchType, page: number) => {
        try {
            const response = await getTeacherList(query, page)
            let user:UserDto | null | undefined;

            try {
                user = await getMyInfo();
            } catch (error) {
                console.log('error', error)
                user = null;
            }

            if (response && response.content) {
                setAdvisorList((prev) => {
                    const combinedList = [...prev, ...response.content];
                    return safeMap(combinedList, (item:TeacherListDto) => ({
                        ...item,
                        selfLiked: !!user && item.likedTeachers.some((liked: any) => liked.testId === user?.userId && liked.teacherId === item.id)
                    }));
                });
                setHasMore(response.content.length > 0);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching teachers:', error);
            setHasMore(false);
        }
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

    // 필터링된 어드바이저 리스트
    const filteredAdvisorList = advisorList.filter(advisor => {
        if (!searchTerm) return true;

        const advisorName = advisor.name;
        const searchChosung = getChosung(searchTerm);
        const nameChosung = getChosung(advisorName);

        return nameChosung.startsWith(searchChosung) ||
            advisorName.includes(searchTerm); // 일반 텍스트 검색도 포함
    });

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
                    path={path}
                />
            </div>
            <div className="h-6"></div>
            <div className="px-5 h-screen">
                {isMounted && (
                    <AdvisorList
                        advisorList={filteredAdvisorList}
                        changeLiked={changeLiked}
                        lastAdvisorElementRef={lastAdvisorElementRef}
                    />
                )}
            </div>
        </div>
    )
}
