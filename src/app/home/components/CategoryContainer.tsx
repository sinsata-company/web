'use client'

import CategoryItem from './CategoryItem'
import { useRouter } from 'next/navigation'

export default function CategoryContainer({ onClick }: { onClick?: Function }) {
  const router = useRouter()
  return (
    <div className="px-8 justify-start items-stretch  gap-10 inline-flex ">
      <CategoryItem
        onClick={onClick}
        textColor="text-red-600"
        label="신점"
        image="sinjeom"
        color="bg-red-600/10"
      />
      <CategoryItem
        onClick={onClick}
        textColor="text-yellow-500"
        label="사주"
        image="saju"
        color="bg-yellow-500/20"
      />
      <CategoryItem
        onClick={onClick}
        textColor="text-blue-800"
        label="타로"
        image="taro"
        color="bg-blue-800/10"
      />
      <CategoryItem
        onClick={onClick}
        textColor="text-red-600"
        label="심리"
        image="mind"
        color="bg-red-600/10"
      />
    </div>

    // <div className=" px-5  w-full h-16 justify-between items-start gap-3 inline-flex">

    // </div>
  )
}
