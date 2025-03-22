'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BackButton from '@/components/common/BackButton';

export default function SearchPage() {
    const [recentSearches, setRecentSearches] = useState<string[]>([])
    const [popularSearches, setPopularSearches] = useState([
        { id: 1, term: '나나' },
        { id: 2, term: '허준' },
        { id: 3, term: '하울' },
        // ... 더 많은 인기 검색어
    ])
    const router = useRouter()

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
                <div className="flex items-center gap-4 mb-4">
                    <BackButton />
                    <h1 className="text-xl font-bold">뒤로가기</h1>
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
                        {popularSearches.map((item) => (
                            <div 
                                key={item.id}
                                className="flex items-center gap-4 p-2 hover:bg-gray-50 cursor-pointer"
                                onClick={() => handleSearch(item.term)}
                            >
                                <span className="font-bold text-gray-500">{item.id}</span>
                                <span>{item.term}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}