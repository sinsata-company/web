'use client'

import { useState } from 'react'
const faqs = [
  {
    id: 1,
    question: '1> 신사타 신규 고객 (회원가입) 혜택',
    answer: `첫 회원가입시 5000원 상당 쿠폰을 지급해드립니다\n\n지급일 포함하여 3일동안 사용 가능하며\n최초 1회에 한해 지급 되는점 참고 부탁드립니다`,
  },
  {
    id: 2,
    question: '2>코인 선불 상담 이용 안내',
    answer: `코인 선불 상담은 상담을 위해 코인을 선불로 구매 후 해당 코인을 이용하여 전화 상담을 하는 것입니다.\n\n1. 우측 하단 [코인 충전] 메뉴에서 코인을 충전하세요\n\n2. 원하는 상담사 프로필에서 [상담하기] -[☎상담하기]를 눌러주세요\n\n3. 전화 연결이 완료되면 상담을 시작하세요`,
  },
  {
    id: 3,
    question: '3>060 후불 전화 상담 이용 안내',
    answer: `060 후불 전화 상담은 후불제로 전화 상담을 하는 것이며, 이용 요금은 당월 전화요금에 정보 이용료로 부과되어 함께 청구됩니다.\n\n1. 원하는 상담사 프로필에서 [상담하기] -[후불로 상담 이용하기]-[☎후불 상담하기]를 눌러주세요\n\n2. 전화 연결이 완료되면 상담을 시작하세요\n\n또는 상담사가 설정한 상담 가격에 맞는 번호를 누른 뒤 해당 상담사의 고유번호 입력 후 '*' 누르시면 전화 연결을 하실 수 있습니다. (가격별 060번호가 다릅니다.)`,
  },
  {
    id: 4,
    question: '4>채팅 상담 이용 안내',
    answer: `[채팅상담 이용방법] \n\n

[메뉴] -> [채팅상담] ->  [채팅 상담하기] 클릭 -> [원하는 상담 시간 선택] -> [ 채팅상담 시작하기] 클릭 -> 채팅상담 시작 \n\n

채팅상담방에 상담사가 입장 후 상담이 시작되며
상담시간이 카운트 됩니다.\n\n

채팅상담 중 화면을 종료해도 구매한 채팅시간은 소진되며,
상담이 이루어지지 않은 시간에 대해서는 
코인 환불이 불가합니다.`,
  },
  {
    id: 5,
    question: '5>휴대폰 번호 변경 안내',
    answer: ` [1:1문의] 신청 시 변경전 연락처와 변경후
연락처를 함께 남겨주시면
좀 더 신속하게 처리가 가능합니다.`,
  },
  {
    id: 6,
    question: '6>상담사님께서 개인번호 요구',
    answer: `   기존 등록된 부가서비스 종류외 
 굿, 치성, 부적 등 신행위를 일체 금하고 있습니다.
녹음파일과 함께 [고객센터] - [1:1문의]를
남겨주시면 포상금을 드립니다.

 개인간의 거래 후 일어나는 어떠한 일도
 신사타에서 책임지지 않습니다`,
  },
]
export default function Page() {
  const [qna, setQna] = useState(faqs)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="flex flex-col gap-4">
      {qna.map((faq, index) => (
        <div
          key={index}
          className="self-stretch p-4 bg-neutral-50 rounded-xl flex-col justify-start items-start gap-3 flex cursor-pointer"
          onClick={() => toggleFAQ(index)}
        >
          <div className="self-stretch justify-between items-center inline-flex">
            <div className="text-zinc-900 text-base font-bold  leading-snug">
              {faq.question}
            </div>
            <div className="w-4 h-4 flex-col justify-center items-center gap-2.5 inline-flex">
              <img
                src="/images/ic_arrow_up.svg"
                alt="arrow"
                className={`transition-transform duration-300 ease-in-out ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </div>
          </div>
          <div
            className={`self-stretch text-neutral-500 text-base font-normal  leading-snug transition-max-height duration-300 ease-in-out overflow-hidden ${
              openIndex === index ? 'max-h-[800px]' : 'max-h-0'
            }`}
            dangerouslySetInnerHTML={{
              __html: faq.answer.replace(/\n/g, '<br />'),
            }}
          />
        </div>
      ))}
    </div>
  )
}
