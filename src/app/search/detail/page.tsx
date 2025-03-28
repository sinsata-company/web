'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BackButton from '@/components/common/BackButton';
import { basicGet } from '@/app/api/base';

interface TeacherDto {
  id: number;
  nickname: string;
  name: string;
  // 필요한 다른 필드들도 추가할 수 있습니다
}

interface TeacherResponse {
  data: TeacherDto[];
}

export default function SearchPage() {
    const [recentSearches, setRecentSearches] = useState<string[]>([])
    const [popularSearches, setPopularSearches] = useState<Array<any>>([])
    const router = useRouter()
    const [name, setName] = useState<string>('')
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTopTeachers = async () => {
            try {
                const response = await basicGet<TeacherResponse>('/teachers/top-liked');
                console.log(response)
                if (response) {
                    const topTeachers = response.map((teacher: TeacherDto) => ({
                        id: teacher.id,
                        nickname: teacher.nickname,
                        name: teacher.name
                    }));
                    console.log(topTeachers)
                    setPopularSearches(topTeachers);
                }
            } catch (error) {
                console.error('인기 강사 목록을 불러오는데 실패했습니다:', error);
                setPopularSearches([
                    { id: 1, nickname: '나나', name: '나나'  },
                    { id: 2, nickname: '허준', name: '허준' },
                    { id: 3, nickname: '하울', name: '하울' },
                ]);
            }
        };
    
        fetchTopTeachers();
    }, []);

    useEffect(() => {
        // localStorage에서 최근 검색어 가져오기
        const saved = localStorage.getItem('recentSearches')
        if (saved) {
            setRecentSearches(JSON.parse(saved))
        
        }
    }, [])

    const handleSearch = (term: string) => {
        // 검색어 저장 및 검색 실행
        const newSearches = [term, ...recentSearches.filter(t => t !== term)].slice(0, 10)
        setRecentSearches(newSearches)
        localStorage.setItem('recentSearches', JSON.stringify(newSearches))
        router.push(`/recent?q=${encodeURIComponent(term)}`)
    }

    const removeRecentSearch = (term: string) => {
        const newSearches = recentSearches.filter(t => t !== term)
        setRecentSearches(newSearches)
        localStorage.setItem('recentSearches', JSON.stringify(newSearches))
    }

    return (
        <main className="min-h-screen">
            <div className="p-4">
                <div className="flex items-center gap-2 mb-4">
                    <BackButton />
                    <h1 className="text-base font-medium">뒤로가기</h1>
                </div>
                {/* 검색 입력창 */}
                <div className="flex items-center gap-2 mb-6">
                    <input
                        type="text"
                        placeholder="상담사를 검색하세요."
                        className="flex-1 p-2 border rounded-lg"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch(e.currentTarget.value)
                            }
                        }}
                    />
                </div>

                {/* 최근 검색어 */}
                <div className="mb-6">
                    <div className="flex justify-between mb-2">
                        <h2 className="font-bold">최근 검색어</h2>
                        <button 
                            className="text-sm text-red-500"
                            onClick={() => {
                                setRecentSearches([])
                                localStorage.removeItem('recentSearches')
                            }}
                        >
                            전체 삭제
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {recentSearches.map((term, idx) => (
                            <div key={idx} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                                <span className="mr-2">{term}</span>
                                <button onClick={() => removeRecentSearch(term)}>×</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 인기 검색어 */}
                <div>
                    <h2 className="font-bold mb-2">인기 검색어</h2>
                    <div className="space-y-2">
                        {isLoading ? (
                            <div className="text-gray-500 text-center py-4">
                                로딩 중...
                            </div>
                        ) : popularSearches && popularSearches.length > 0 ? (
                            popularSearches.map((item, index) => (
                                <div 
                                    key={`search-item-${index}`}
                                    className="flex items-center gap-4 p-2 hover:bg-gray-50 cursor-pointer"
                                    onClick={() => handleSearch(item?.name)}
                                >
                                    <span className="font-bold text-gray-500">{item?.name || ''}</span>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500 text-center py-4">
                                검색 결과가 없습니다.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}