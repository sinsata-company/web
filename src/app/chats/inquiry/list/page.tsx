'use client'

import { useEffect, useState, Suspense } from 'react' 
import MainAppbar from '@/components/common/MainAppbar'
import { useRouter, useSearchParams } from 'next/navigation'   
import Image from 'next/image'
import { getInquiryList } from '@/app/api/chat'
import { getCustomerAll, CutomerChatInquiryDto } from '@/app/api/data'   
import { getMyInfo } from '@/app/api/user'
import { UserDto } from '@/types/user'
import { VaCustomerDto } from '@/app/api/cash'
import { basicPost } from '@/api/base'

function InquiryListContent() {
  const [inquiries, setInquiries] = useState<CutomerChatInquiryDto[]>([])
  const router = useRouter()
  const [user, setUser] = useState<UserDto | null>(null)
  const searchParams = useSearchParams()
  const purchaseStatus = searchParams.get('purchase');
  

  useEffect(() => {
    if (purchaseStatus === 'Done') {
      const selectedVa = localStorage.getItem('selectedVa')
      if (selectedVa) {
        const va = JSON.parse(selectedVa) as VaCustomerDto;
        basicPost("/users/va", va);
        
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
      }
    }
  }, [purchaseStatus]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await getCustomerAll()
        
        setInquiries(response as unknown as CutomerChatInquiryDto[])
        const user = await getMyInfo()
        setUser(user)
    
      } catch (error) {
        console.error('Failed to fetch inquiries:', error)
        setInquiries([])
      }
    }
    fetchInquiries()
    
    // 실제 API 구현 시 대체 필요
    // const mockData: InquiryItem[] = [
    //   {
    //     id: 1,
    //     title: '테스트',
    //     inquiryNumber: '관대한 고릴라 4798',
    //     unreadCount: 10,
    //     thumbnail: '/images/test-avatar.png'
    //   },
    //   {
    //     id: 2,
    //     title: '상담 문의',
    //     inquiryNumber: '관대한 고릴라 4798',
    //     unreadCount: 1,
    //   }
    // ]
    // setInquiries(mockData)
  }, [])

  const TEACHER_TYPE_MAP: { [key: string]: string } = {
    'SINJEOM': '신점',
    'SAJU': '사주',
    'TARO': '타로',
    'MIND': '심리'
  }

  return (
    <div className="h-screen bg-white">
      <div className="bg-blue-400 text-white p-4 flex items-center">
        <button onClick={() => router.back()} className="mr-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-lg">1:1 문의하기</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col">
          {inquiries.map((inquiry: CutomerChatInquiryDto, index: number) => ( 
            console.log('inquiry', inquiry),
            <div 
              key={inquiry.id ? `inquiry-${inquiry.id}` : `inquiry-${index}`}
              className="border-b p-4 flex items-center justify-between cursor-pointer"
              onClick={() => {
                if (inquiry.type === 'CHAT') {
                  inquiry.id && router.push(`/chats/inquiry/${inquiry.id}`)
                } else if (inquiry.type === 'INQUIRY') {
                  router.push(`/chats/inquiry/new/${inquiry.id}`)
                }
              }}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  {inquiry.type === 'CHAT' || inquiry.type === 'INQUIRY' ? (
                    (inquiry.type === 'CHAT' && inquiry.products?.productImage) || 
                    (inquiry.type === 'INQUIRY' && inquiry?.teachers?.thumbnailURI) ? (
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 mr-4">
                          <div className="w-12 h-12 rounded-md overflow-hidden">
                            <Image 
                              src={inquiry.type === 'CHAT' 
                                ? inquiry.products?.productImage 
                                : inquiry.teachers.thumbnailURI}
                              alt={inquiry.type === 'CHAT' ? '상품 이미지' : '프로필'}
                              width={48}
                              height={48}
                              className={`w-full h-full ${inquiry.type === 'CHAT' ? 'object-cover' : 'object-fill'}`}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-md mr-4 flex items-center justify-center">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 text-sm">
                            {inquiry.type === 'CHAT' ? '채팅' : '상담'}
                          </span>
                          {inquiry.type === 'INQUIRY' && (
                            <span className={`text-sm ${inquiry.status === 'PENDING' ? 'text-red-500' : 'text-blue-500'}`}>
                              {inquiry.status === 'PENDING' ? '답변대기' : '답변완료'}
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  ) : null}
                  <div className="flex flex-col justify-center min-w-0">
                    {inquiry.type === 'INQUIRY' && (
                      <div className="flex flex-col gap-1 text-xs">
                        <span className="text-gray-500 truncate">
                          [{TEACHER_TYPE_MAP[inquiry.teachers.teacherType] || inquiry.teachers.teacherType}] {inquiry.teachers.name}
                        </span>
                        <span className={`w-fit px-1.5 py-0.5 rounded-sm ${
                          inquiry.status === 'CONFIRMED' 
                            ? 'bg-green-100 text-green-600'
                            : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {inquiry.status === 'CONFIRMED' ? '답변완료' : '답변대기'}
                        </span>
                      </div>
                    )}
                    <div className="font-medium truncate mt-0.5 text-sm">
                      {inquiry?.products?.productName}
                    </div>
                    <div className="text-sm text-gray-500 mt-0.5">{inquiry?.products?.price}</div>
                  </div>
                </div>
                
                <div className="relative">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    채팅문의
                  </button>
                  {inquiry.unreadCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {inquiry.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function InquiryList() {
  return (
    <Suspense fallback={<div className="h-screen bg-white flex items-center justify-center">로딩 중...</div>}>
      <InquiryListContent />
    </Suspense>
  )
}