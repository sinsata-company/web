'use client'

import {useEffect, useState, useRef, useCallback} from 'react'
import AdvisorSort from '@/app/home/components/AdvisorSort'
import {TeacherListDto} from '@/app/api/data'
import {getTeacherLikeList, getTeacherList, SearchType} from '@/app/api/teacher'
import {useSearch} from '@/components/common/SearchContext'
import {useSearchParams} from 'next/navigation'
import {getMyInfo} from "@/app/api/user";
import {UserDto} from "@/types/user";
import { getMyLikeTeachers } from '@/app/api/teacher'
// 초성 추출 함수
import LikedAdvisorList from './RecentAdvisorList'
import { basicGet, basicPost } from '@/app/api/base'
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

export default function AdvisorContainer({params}: {params: {searchQuery: string}}) {
    const [advisorList, setAdvisorList] = useState<TeacherListDto[]>([])
    const [page, setPage] = useState<number>(0)
    const [sort, setSort] = useState<SearchType>(SearchType.NEW)
    const [hasMore, setHasMore] = useState(true)
    const observer = useRef<IntersectionObserver | null>(null)
    const {searchTerm} = useSearch();
    
    // searchQuery 상태를 URL 파라미터로부터 받아온 값으로 초기화
    const searchParams = useSearchParams();
    const urlSearchQuery = searchParams.get('q') || '';
    const [searchQuery, setSearchQuery] = useState<string>(urlSearchQuery);
    const [searchType, setSearchType] = useState<string>("name");
    const [currentPage, setCurrentPage] = useState<number>(0);

    // URL 파라미터가 변경될 때마다 검색 실행
    useEffect(() => {
        setSearchQuery(urlSearchQuery);
        console.log(searchQuery + " , " + urlSearchQuery)
        setCurrentPage(0); // 새로운 검색시 페이지 초기화
        handleSearch();
    }, [urlSearchQuery]);

    // Add changeLiked function
    const changeLiked = async (id: string) => {
        try {
            await basicPost("/users/changeLiked", { id });
            handleSearch(); // Refresh list after like change
        } catch (error) {
            console.error("찜 설정 중 오류 발생:", error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await basicGet<{content: TeacherListDto[]}>(`/teachers/search?searchType=${searchType}&searchQuery=${urlSearchQuery}&page=${currentPage}`);
            
            //console.log(response)
            if (response && response.content) {
                setAdvisorList(currentPage === 0 ? response.content : [...advisorList, ...response.content]);
            } else {
                setAdvisorList([]);
                setHasMore(false);
            }
        } catch (error) {
            console.error("검색 중 오류 발생:", error);
            setAdvisorList([]);
            setHasMore(false);
        }
    };
      
        

    return (
        <div>
            <div className="h-6"></div>
            <div className="px-5 h-screen">
                <LikedAdvisorList
                    advisorList={advisorList}
                    changeLiked={changeLiked }
                                                                                />
            </div>
        </div>
    )
}
