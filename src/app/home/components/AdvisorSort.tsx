'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SearchType } from '@/app/api/teacher'

const tabs = [
  { name: '신규순', active: true, query: SearchType.NEW },
  { name: '인기순', active: false, query: SearchType.POPULAR },
  { name: '조회순', active: false, query: SearchType.VIEW },
  { name: '리뷰순', active: false, query: SearchType.REVIEW },
]

export default function AdvisorSort(props: {
  getTeachers: (query: SearchType, page: number) => void
  page: number
}) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="w-full h-12 p-1.5 bg-zinc-100 rounded-xl justify-center items-center gap-1 inline-flex">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`grow shrink basis-0 h-9 p-2 rounded-lg justify-center items-center gap-2.5 flex cursor-pointer ${
            activeTab === index ? 'bg-white shadow' : ''
          }`}
          onClick={() => {
            props.getTeachers(tabs[index].query, props.page)
            setActiveTab(index)
          }}
        >
          <AnimatePresence>
            {activeTab === index ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-zinc-900 text-base font-bold font-['Pretendard Variable']"
              >
                {tab.name}
              </motion.div>
            ) : (
              <div className="text-zinc-400 text-base font-bold font-['Pretendard Variable']">
                {tab.name}
              </div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
