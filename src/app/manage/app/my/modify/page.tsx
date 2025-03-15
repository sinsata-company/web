'use client';
import Input from "@/components/common/Input";
import {Button, BUTTON_TYPE} from "@/components/common/Button";
import {ChangeEvent, useEffect, useState} from "react";
import Modal from "@/components/common/Modal";
import {basicPost} from "@/api/base";

export default function Page() {
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const changePassword = async () => {
        if (!password || !newPassword) return alert("비밀번호를 입력 해주세요.");
        if (password !== newPassword) return alert("비밀번호가 일치하지 않습니다. 다시 적어주세요.");

        try {
            await basicPost("/teachers/modifyPassword", { password });
            alert("변경 되었습니다.");
            setPassword("")
            setNewPassword("")
        } catch (error) {
            console.log('error' ,error);
            alert("비밀번호 설정중 문제가 발생 했습니다. 이후 다시 시도해주세요.")
        }
    };

    return (
        <>
            <div className="w-full h-[92vh] flex flex-col items-center justify-between">
                <div className="w-full">
                    <h2>회원 정보 수정</h2>
                    <div>
                        <span>비밀번호</span>
                        <Input value={password} type="password"
                               onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}/>
                    </div>

                    <div>
                        <span>새로운 비밀번호</span>
                        <Input value={newPassword} type="password"
                               onChange={(event: ChangeEvent<HTMLInputElement>) => setNewPassword(event.target.value)}/>
                    </div>
                    <div>
                        <Button
                            className="mt-2 h-[40px]"
                            label="변경하기"
                            onClick={() => changePassword()}
                            buttonType={BUTTON_TYPE.primarySm}
                        />
                    </div>
                </div>
                <div className="w-full">
                    <Button
                        className="mt-2 h-[40px] bg-red-400"
                        label="탈퇴하기"
                        onClick={() => {
                            setShowModal(true);
                        }}
                        buttonType={BUTTON_TYPE.dangerous}
                    />
                </div>
            </div>
            <Modal
                isOpen={showModal}
                onClose={(e) => {
                    e.stopPropagation()

                    setShowModal(false)
                    console.log(showModal)
                }}
                title="회원탈퇴"
                content="탈퇴 후에는 복구되지 않고, 7일동안 복구되지 않습니다. 하단 버튼을 눌러 카카오톡 상담을 이용하신 후 절차에 따라 회원탈퇴를 안내해드리겠습니다."
            >
                <Button
                    buttonType={BUTTON_TYPE.primary}
                    onClick={() => {
                        window.open('http://pf.kakao.com/_rMFxbn', '_blank')
                        // 탈퇴 API 호출
                        setShowModal(false)
                    }}
                    label="탈퇴하기"
                />
            </Modal>
        </>
    );
}
