import { useState } from 'react'

export interface Faqs {
  question: string;
  answer: string;
}

const defaultFaqs = [
  {
    id: 1,
    question: '상담시 내담자가 어떤 정보를 드려야 하나요?',
    answer: '선생님께 본인의상황을 설명해주시면 됩니다',
  },
  {
    id: 2,
    question: '선생님과 상담 받을때  주의 해야 할점이 있나요?',
    answer: '선생님께 예의를 지켜주시고 거짓없는 대화를 해주심 됩니다',
  },
  {
    id: 3,
    question: '선생님의 자신있는 상담분야는 무엇인가요?',
    answer: '연애관련부분에 있어서 디테일하게 풀어드립니다',
  },
]


export default function AdviceQnA({ faqs }: { faqs: Faqs[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const faqsData = faqs.length > 0 ? faqs : defaultFaqs 

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="flex-col justify-start items-start gap-3 inline-flex w-full">
      <div className="text-black text-base font-bold">자주 묻는 질문</div>
      <div className="self-stretch flex-col justify-start items-start gap-2 flex">
        {faqsData.map((faq, index) => (
          <div
            key={index}
            className="self-stretch p-3 bg-neutral-50 rounded-xl flex-col justify-start items-start gap-2 flex cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="self-stretch justify-between items-center inline-flex">
              <div className="text-zinc-900 text-sm font-medium leading-snug">
                {faq.question}
              </div>
              <div className="w-3 h-3 flex-col justify-center items-center gap-2 inline-flex">
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
              className={`self-stretch text-neutral-500 text-xs font-normal leading-snug transition-max-height duration-300 ease-in-out overflow-hidden ${
                openIndex === index ? 'max-h-40' : 'max-h-0'
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
