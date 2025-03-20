'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import Image from 'next/image'
import { createInquiry } from '@/app/api/chat'

interface TeacherInfo {
  id: string
  name: string
  teacherType: string
  pinNumber: string
  profileImage: string
  category: string
}

const TEACHER_TYPE_MAP: { [key: string]: string } = {
  'SINJEOM': '신점',
  'SAJU': '사주',
  'TARO': '타로',
  'MIND': '심리'
}

export default function InquiryNote() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const [content, setContent] = useState('')
  const [teacher, setTeacher] = useState<TeacherInfo | null>(null)

  useEffect(() => {
    try {
      const infoParam = searchParams.get('info')
      if (infoParam) {
        const decodedInfo = JSON.parse(decodeURIComponent(infoParam)) as TeacherInfo
        console.log('Decoded teacher info:', decodedInfo) // 디버깅용
        setTeacher(decodedInfo)
      } else {
        throw new Error('선생님 정보가 없습니다.')
      }
    } catch (error) {
      console.error('선생님 정보 파싱 실패:', error)
      alert('선생님 정보를 불러오는데 실패했습니다.')
      router.back()
    }
  }, [searchParams])

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert('문의 내용을 입력해주세요.')
      return
    }

    try {
      const response = await createInquiry(teacher?.id as string, content.trim())

      if (!response) {
        throw new Error('문의 등록에 실패했습니다.')
      }
      router.push(`/chats/inquiry/list`)
    } catch (error) {
      console.error('문의 제출 실패:', error)
      alert('문의 등록에 실패했습니다. 다시 시도해주세요.')
    }
  }

  if (!teacher) {
    return <div className="min-h-screen flex items-center justify-center">로딩중...</div>
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 bg-blue-400 text-white p-4 flex items-center z-10">
        <button onClick={() => router.back()} className="mr-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="flex items-center">
          {teacher.profileImage && (
            <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
              <Image
                src={teacher.profileImage}
                alt={teacher.name}
                width={32}
                height={32}
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}
          <h1 className="text-sm">
            [{TEACHER_TYPE_MAP[teacher.teacherType] || teacher.teacherType}] {teacher.name} {teacher.pinNumber}번
          </h1>
        </div>
      </div>

      <div className="pt-16 p-5 pb-32">
        <div className="mb-6">
          <div className="text-lg font-bold mb-4">알려드립니다</div>
          <ul className="space-y-1 text-gray-600 text-sm leading-relaxed">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>상담 가능 시간 확인, 인사 등 간단한 문의만 가능합니다.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>상담 후기는 별도의 후기 게시판을 이용해 주세요.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>전화번호, 이메일 등 개인정보는 작성하지 말아주세요.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>상담과 무관한 내용은 관리자에 의해 블라인드 처리될 수 있습니다.</span>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <div className="text-base font-bold mb-2">문의내용</div>
          <textarea
            className="w-full h-40 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="작성하신 문의 다른 이에게 좋은 정보가 될 수 있으며, 좋은 문의는 상담사에게도 큰 보람이 됩니다."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <div className="text-lg text-red-500 mb-2 text-sm">※ 유의사항</div>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>• 타로 상담, 사주풀이 등 실제 상담을 요청하는 글</li>
            <li className="pl-4">(예) 사주 봐주세요, 타로점 봐주세요.</li>
            <li>• 개인 연락처로 직거래 유도하는 글</li>
            <li>• 문의가 아닌 후기성 게시물</li>
            <li>• 비방, 욕설, 명예훼손, 광고성 내용의 글</li>
            <li>• 기타 상담문의와 관련 없는 내용의 글</li>
          </ul>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 flex gap-4 bg-white border-t">
        <Button 
          onClick={() => router.back()} 
          buttonType={BUTTON_TYPE.secondary}
          label="취소"
          className="w-1/2"
        />
        <Button 
          onClick={handleSubmit} 
          buttonType={BUTTON_TYPE.primary}
          label="등록하기"
          className="w-1/2"
        />
      </div>
    </div>
  )
} 