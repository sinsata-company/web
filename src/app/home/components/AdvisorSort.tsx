'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SearchType } from '@/app/api/teacher'

import dynamic from 'next/dynamic'
import './AdvisorSort.css'

const Select = dynamic(() => import('react-select'), { ssr: false })

const tabs = [
  { name: '신규순', active: true, query: SearchType.NEW },
  { name: '인기순', active: false, query: SearchType.POPULAR },
  { name: '조회순', active: false, query: SearchType.VIEW },
  { name: '리뷰순', active: false, query: SearchType.REVIEW },
]

export default function AdvisorSort(props: {
  getTeachers: (query: SearchType, page: number) => void
  page: number
  path?: string
}) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className={`relative w-full flex justify-between items-center px-2 
      ${props.path && props.path.includes('heart') ? 'mt-0' : 'mt-[-75px]'}`}>
      <div className="text-neutral-800 text-xl tracking-tight font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
        {props.path && props.path.includes('heart') ? '찜한 선생님' : '상담 가능한 선생님'}
      </div>
      <Select
        options={tabs.map((tab, index) => ({
          value: tab.query,
          label: tab.name,
          index: index,
        }))}
        onChange={(newValue: unknown) => {
          const selectedOption = newValue as {
            value: SearchType
            label: string
            index: number
          } | null
          const selectedIndex = selectedOption!.index
          props.getTeachers(tabs[selectedIndex].query, props.page)
          setActiveTab(selectedIndex)
        }}
        value={{
          value: tabs[activeTab].query,
          label: tabs[activeTab].name,
          index: activeTab,
        }}
        classNamePrefix="react-select text-neutral-500"
        isSearchable={false}
        styles={{
          control: (base) => ({
            ...base,
            color: '#525252',
            border: 'none',
            boxShadow: 'none',
            fontWeight: '600',
            fontSize: '0.95rem',
            '&:hover': {
              boxShadow: 'none',
            },
            '&:focus': {
              boxShadow: 'none',
            },
          }),
          singleValue: (base) => ({
            ...base,
            display: 'flex',
            alignItems: 'center',
            fontWeight: '600',
            color: '#525252',
            '&::before': {
              content: '""',
              display: 'block',
              width: 0,
            },
          }),
          option: (base, state) => ({
            ...base,
            fontWeight: '600',
            backgroundColor: state.isSelected ? '#f3f4f6' : 'white',
            color: '#525252',
            '&:hover': {
              backgroundColor: '#f9fafb',
            },
          }),
        }}
      />
    </div>
  )
}
