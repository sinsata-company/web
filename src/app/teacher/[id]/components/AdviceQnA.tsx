import { useState } from 'react'

export interface Faqs {
  question: string;
  answer: string;
}

export default function AdviceQnA({ faqs }: { faqs: Faqs[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="flex-col justify-start items-start gap-3 inline-flex w-full">
      <div className="text-black text-base font-bold">자주 묻는 질문</div>
      <div className="self-stretch flex-col justify-start items-start gap-2 flex">
        {faqs.map((faq, index) => (
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
