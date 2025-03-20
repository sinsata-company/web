'use client'

import { Checkbox, Label } from '@/components/ui';

interface AgreementProps {
  isChecked: boolean
  onCheckedChange: (checked: boolean) => void
}

export default function Agreement({ isChecked, onCheckedChange }: AgreementProps) {
  return (
    <div className="p-4 bg-white rounded-lg">
      <div className="space-y-4">
        <div className="text-lg font-semibold">예약 동의</div>
        
        <div className="text-sm text-gray-700 p-3 bg-gray-50 rounded-md">
        예약 당일은 결제 취소 및 변경이 불가하며, 노쇼 시 환불이 불가합니다.
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="agreement" 
            checked={isChecked} 
            onCheckedChange={onCheckedChange}
          />
          <Label 
            htmlFor="agreement" 
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            예약 시간 5분 지연시 예약이 자동종료 되고 환불이 불가합니다.
          </Label>
        </div>
      </div>
    </div>
  )
}