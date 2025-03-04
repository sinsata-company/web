'use client';

import { Button, BUTTON_TYPE } from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { loginTeacher } from '../../api/auth';

export default function Page() {
    const [pin, setPin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const onClick = async () => {
        try {
            await loginTeacher(pin, password);
        } catch (e) {
            alert('로그인에 실패했습니다. 계정 정보를 확인해 주세요.');
            return;
        }
        router.replace('/manage/app/main/home');
    };
    return (
        <div className="flex flex-col gap-8 w-full">
            <Input
                name="아이디"
                placeholder="이메일을 입력해주세요"
                value={pin}
                onChange={(e) => {
                    setPin(e.target.value);
                }}
            />
            <Input
                name="비밀번호"
                placeholder="이메일을 입력해주세요"
                value={password}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onClick();
                    }
                }}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <Button buttonType={BUTTON_TYPE.primary} label="로그인" onClick={onClick} />
        </div>
    );
}
