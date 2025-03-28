'use client';

import { basicGet } from "@/api/base"
import { useQuery } from "@tanstack/react-query"
import { formatNumberWithCommas } from "@/utils/numberFormatter"
import Image from "next/image"
import moment from "moment";

interface VaProductPayDto {
  id: number;
  productName: string;
  price: number;
  productImage: string;
  userName: string;
  nickName: string;
  productInfo: string;
  address: string;
  teacherName: string | null;
  createdAt: string;
}

export default function Page() {
  const { data: item = [] } = useQuery({
    queryKey: ['purchased'],
    queryFn: () => basicGet('/manage/home/purchase-history') as unknown as Promise<VaProductPayDto[]>,
  });

  return <div className="flex flex-col gap-6">
      {item.map((va) => {
        return (
          <div 
            key={va.id}
            className="flex w-full justify-between items-center gap-4 p-4 bg-white rounded-md shadow-md"
          >
            <div className="flex gap-4">
              {va.productImage ? (
                <Image
                  src={va.productImage}
                  width={100}
                  height={100}
                  alt={`${va.productName} 상품 이미지`}
                  className="mr-2 rounded-md" 
                />
              ) : (
                <div className="w-[100px] h-[100px] bg-gray-200 mr-2 rounded-md" />
              )}
              <div>
                <div className="font-bold">{va.productName}</div>
                <div className="text-sm">
                  {formatNumberWithCommas(va.price)}원
                </div>
                <div className="text-sm">
                  판매자 : {va.teacherName?.replace('선생님', '')}
                </div>
              </div>
            </div>
            <div className="w-24 flex flex-col justify-between items-center">
              <div className="w-24 h-4">
                <span>{moment(va.createdAt).format('YYYY-MM-DD')}</span>
              </div>
            </div>
          </div>
        )
      })}

  </div>
}
