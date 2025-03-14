'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import AdvisorList from './AdvisorList'
import AdvisorSort from './AdvisorSort'
import { TeacherListDto } from '@/app/api/data'
import { getTeacherList, SearchType } from '@/app/api/teacher'
import { useSearch } from '@/contexts/SearchContext'

// 초성 추출 함수
const getChosung = (str: string) => {
  const cho = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
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
  const { searchTerm } = useSearch();

  useEffect(() => {
    if ('scrollRestoration' in window?.history) {
      window.history.scrollRestoration = 'manual' // 자동 스크롤 복원 비활성화
    }
  }, [])

  useEffect(() => {
    getTeachers(SearchType.NEW, page)
  }, [page, sort])

  const getTeachers = async (query: SearchType, page: number) => {
    const response = await getTeacherList(query, page)
    if (advisorList.length === 0) {
      setAdvisorList(response.content)
      return
    }

    setAdvisorList((prev) => [...prev, ...response.content]);
      console.log('advisorList', advisorList)
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
        />
      </div>
      <div className="h-6"></div>
      <div className="px-5 h-screen">
        <AdvisorList
          advisorList={filteredAdvisorList}
          lastAdvisorElementRef={lastAdvisorElementRef}
        />
      </div>
    </div>
  )
}
