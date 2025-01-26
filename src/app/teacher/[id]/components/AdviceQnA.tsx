import { useState } from 'react'

const faqs = [
  {
    question: '상담은 어떻게 진행되나요?',
    answer:
      '상담은 이렇게 진행됩니다. 상담은 이렇게 진행됩니다. 상담은 이렇게 진행됩니다. 상담은 이렇게',
  },
  {
    question: '상담은 어떻게 진행되나요?',
    answer:
      '상담은 이렇게 진행됩니다. 상담은 이렇게 진행됩니다. 상담은 이렇게 진행됩니다. 상담은 이렇게',
  },
  {
    question: '상담은 어떻게 진행되나요?',
    answer:
      '상담은 이렇게 진행됩니다. 상담은 이렇게 진행됩니다. 상담은 이렇게 진행됩니다. 상담은 이렇게',
  },
  {
    question: '상담은 어떻게 진행되나요?',
    answer:
      '상담은 이렇게 진행됩니다. 상담은 이렇게 진행됩니다. 상담은 이렇게 진행됩니다. 상담은 이렇게',
  },
  {
    question: '상담은 어떻게 진행되나요?',
    answer:
      '상담은 이렇게 진행됩니다. 상담은 이렇게 진행됩니다. 상담은 이렇게 진행됩니다. 상담은 이렇게',
  },
]

export default function AdviceQnA() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="flex-col justify-start items-start gap-4 inline-flex">
      <div className="self-stretch text-yellow-400 text-base font-bold font-['Pretendard Variable']">
        자주 묻는 질문
      </div>
      <div className="self-stretch flex-col justify-start items-start gap-3 flex">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="self-stretch p-4 bg-neutral-50 rounded-xl flex-col justify-start items-start gap-3 flex cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="self-stretch justify-between items-center inline-flex">
              <div className="text-zinc-900 text-base font-bold font-['Pretendard Variable'] leading-snug">
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
              className={`self-stretch text-neutral-500 text-base font-normal font-['Pretendard'] leading-snug transition-max-height duration-300 ease-in-out overflow-hidden ${
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
