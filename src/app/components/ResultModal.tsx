'use client'

import { Button, BUTTON_TYPE } from '@/components/common/Button'

interface ResultModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string | React.ReactNode
}

export default function ResultModal({ isOpen, onClose, title, content }: ResultModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold">{title}</div>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        
        <div className="text-center py-4">
          {content}
        </div>

        <div className="mt-6">
          <Button
            label="확인"
            buttonType={BUTTON_TYPE.primary}
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  )
} 