'use client'

import { getQna, updateQna } from '@/app/manage/api/mypage'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import Input from '@/components/common/Input'
import Modal from '@/components/common/Modal'
import { useEffect, useState } from 'react'

export interface QNAItemProps {
  question: string
  answer: string
  id: number
}

const faqs = [
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

export default function Page() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [qna, setQna] = useState<QNAItemProps[]>(faqs)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number,
    isQuestion: boolean
  ) => {
    const { value } = e.target
    setQna((prev) => {
      return prev.map((item, idx) => {
        if (item.id === id) {
          if (isQuestion) {
            return { ...item, question: value }
          } else {
            return { ...item, answer: value }
          }
        }
        return item
      })
    })
  }

  const onClickModify = async () => {
    await updateQna(JSON.stringify(qna))
    setShowModal(false)
    const result = await getQna()
    setQna(result)
  }

  useEffect(() => {
    getQna().then((res) => {
      console.log(res)
      if (res) {
        setQna(res)
      }
      // setQna(res ?? faqs)
    })
  }, [])

  return (
    <div className="flex-col justify-start items-start gap-4 inline-flex w-full ">
      <div className="self-stretch text-zinc-800 text-lg text-base font-bold font-['Pretendard Variable']">
        자주 묻는 질문
      </div>
      <div className="self-stretch flex-col justify-start items-start gap-3 flex">
        {qna.map((faq, index) => (
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
        <Button
          buttonType={BUTTON_TYPE.primary}
          label="수정하기"
          onClick={() => {
            setShowModal(true)
          }}
        />
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="질문 목록 수정"
        content=""
      >
        {qna.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-4">
            <Input
              key={'question' + idx}
              type="text"
              value={item.question}
              onChange={(e) => {
                onChange(e, item.id, true)
              }}
              name="질문"
            />
            <Input
              key={'answer' + idx}
              type="text"
              value={item.answer}
              onChange={(e) => {
                onChange(e, item.id, false)
              }}
              name="답변"
            />
          </div>
        ))}

        <div className="h-4"></div>
        <div className="flex flex-col gap-2">
          <Button
            buttonType={BUTTON_TYPE.primary}
            label="수정하기"
            onClick={onClickModify}
          />
          <Button
            buttonType={BUTTON_TYPE.secondary}
            label="닫기"
            onClick={() => {
              setShowModal(false)
            }}
          />
        </div>
      </Modal>
    </div>
  )
}

const QnAItem = ({}: {}) => {
  return (
    <div className="h-11 bg-white rounded-xl flex items-center gap-4 w-full">
      <div className="grow flex-grow flex flex-col justify-center items-start gap-1">
        <div className="text-zinc-900 text-base font-bold leading-snug">
          asdfasf
        </div>
      </div>
      <div className="px-4 py-3 bg-red-600/10 rounded-xl flex items-center gap-3 overflow-hidden">
        <div className="text-red-600 text-base font-medium">₩</div>
        <div className="text-red-600 text-base font-bold">0000</div>
      </div>
    </div>
  )
}
