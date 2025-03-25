'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface BackButtonProps {
    className?: string;
}

export default function BackButton({ className = '' }: BackButtonProps) {
    const router = useRouter();

    return (
        <button 
            onClick={() => router.back()}
            className={`flex items-center ${className}`}
            aria-label="뒤로 가기"
        >
            <Image
                src="/images/ic_back.svg"
                alt="뒤로가기"
                width={10}
                height={10}
            />
        </button>
    );
} 