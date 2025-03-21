import Image from 'next/image'
import React from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string | React.ReactNode
  content?: string | React.ReactNode
  children?: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  content,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-[260px] md:max-w-[500px] bg-white rounded-lg shadow-lg w-4/5 px-6 md:px-4 py-8">
        <div className="flex w-full items-center">
          <div className="flex-grow text-zinc-900 text-xl font-bold">{title}</div>
          <Image
            src={'/images/ic_close_black.svg'}
            width={24}
            height={24}
            alt="close"
            color="black"
            onClick={onClose}
            className="ml-2 cursor-pointer"
          />
        </div>
        <div className="mt-4 text-neutral-500 text-base font-normal leading-snug">
          {content}
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}

export default Modal
