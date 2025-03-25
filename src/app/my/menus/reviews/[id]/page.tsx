'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useQuery } from "@tanstack/react-query";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { axiosClient, basicGet, basicPost } from "@/api/base";
import { Reviewable } from "@/types/review";
import moment from "moment";
import NumberedCircle from '@/components/ui/numbered-circle';
import { StarRating } from "@/components/ui/star-rating";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button, BUTTON_TYPE } from "@/components/common/Button";
import useUserMenuStore from '@/components/user-menu/user-menu.store';
import { Image as ImageIcon, X } from "lucide-react";
import { queryClient } from '@/lib/query/queryClient';


const Page = () => {
  const { setHideAppBar } = useUserMenuStore();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form state
  const [rating, setRating] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [style, setStyle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [agreeToPolicy, setAgreeToPolicy] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  console.log({ imageFile });
    
  const reviewableId = usePathname().split('/').pop() as string;
  const { data: reviewable = null } = useQuery({
    queryKey: ['reviewable', reviewableId],
    queryFn: () => basicGet(`/reviews/reviewable-reservations/${reviewableId}`) as unknown as Promise<Reviewable>,
  });

  useEffect(() => {
    setHideAppBar(true);
  
    return () => {
      setHideAppBar(false);
    }
  }, [setHideAppBar]);

  const onClickBack = () => router.push('/my/menus/reviews');
  
  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleFileChange()')
    const files = event.target.files;
    console.log(event.target.files);
    if (files && files.length > 0) {
      setImageFile(files[0]);
    }
  };
  
  const removeImage = () => {
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleSubmit = async () => {
    if (!agreeToPolicy) {
      alert("후기 운영정책에 동의해주세요.");
      return;
    }
    
    if (rating === 0) {
      alert("별점을 선택해주세요.");
      return;
    }
    
    if (!category) {
      alert("상담분야를 선택해주세요.");
      return;
    }
    
    if (!style) {
      alert("상담스타일을 선택해주세요.");
      return;
    }
    
    if (!content.trim()) {
      alert("후기 내용을 입력해주세요.");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const formData = new FormData();
      formData.append('image', imageFile as File);
      formData.append('rating', rating.toString());
      formData.append('category', category);
      formData.append('style', style);
      formData.append('reservationId', String(reviewable?.reservationId));
      formData.append('content', content);

      await axiosClient.post('/reviews', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      queryClient.invalidateQueries({
        queryKey: ['reviewable-list', 'review-list'],
      });
      alert("후기가 성공적으로 등록되었습니다.");
      router.push('/my/menus/reviews');
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("후기 등록에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!reviewable) return null;

  return (    
    <div className="w-full flex flex-col h-[100dvh]">
      <section className="w-full border-b-2 border-b-slate-200 bg-slate-100 h-[128px] flex items-center px-4 gap-x-4">

      <div className="w-[163.38px] h-[92px] rounded-sm overflow-hidden">
            <Image 
              src={reviewable.teacherProfileImage} 
              alt={reviewable.teacherName}
              width={163.38}
              height={92}
              className="object-cover h-full"
            />
        </div>

        <div className="flex flex-col">
            <div className="flex gap-x-2 items-center">
                <span className="text-[18px] font-bold">{reviewable.teacherName}</span>
                <span className="text-neutral-300 font-extrabold text-base">|</span>
                <span className="text-indigo-500 text-sm">{reviewable.teacherPinNumber}번</span>
            </div>

            <div className="flex items-center text-sm text-gray-400">
              <span>{moment(reviewable.startAt).format('YYYY.MM.DD HH:mm')}&nbsp;(통화10분이상)</span>
            </div>
          </div>
      </section>


      <div className="my-12 flex flex-col flex-1 px-4 gap-y-8">
        <section className="flex flex-col">
            <div className="flex gap-x-2 items-center">
                <NumberedCircle number={1} size="sm" />
                <span>만족도를 별점으로 평가해 주세요.</span>
            </div>

            <div className="w-full h-[128px] rounded-md bg-sinsata-blue mt-3 flex flex-col justify-center">
                <StarRating rating={rating} size="lg" showScore onChange={setRating} />
            </div>
        </section>

        <section className="flex flex-col">
            <div className="flex gap-x-2 items-center">
                <NumberedCircle number={2} size="sm" />
                <span>상담분야를 선택해주세요.</span>
            </div>
            <div className="mt-3" />
            <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-full rounded-md h-[48px] font-semibold">
                        <SelectValue placeholder="상담 분야 선택" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => (
                            <SelectItem key={category} value={category} className="h-[40px]">
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
            </Select>
        </section>

        <section className="flex flex-col">
            <div className="flex gap-x-2 items-center">
                <NumberedCircle number={3} size="sm" />
                <span>상담스타일을 평가해주세요.</span>
            </div>
            <div className="mt-3" />
            <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger className="w-full rounded-md h-[48px] font-semibold">
                        <SelectValue placeholder="상담 스타일 선택" />
                    </SelectTrigger>
                    <SelectContent>
                        {styles.map((style) => (
                            <SelectItem key={style} value={style}>
                                {style}
                            </SelectItem>
                        ))}
                    </SelectContent>
            </Select>
        </section>

        <section className="flex flex-col">
            <div className="flex gap-x-2 items-center">
                <NumberedCircle number={4} size="sm" />
                <span>좋은 후기를 남겨주세요.</span>
            </div>
            <div className="mt-3" />
            <Textarea 
                placeholder="작성하신 후기는 다른 이에게 좋은 정보가 될 수 있으며, 좋은 상담 후기는 상담사에게도 큰 보람이 됩니다."
                className="w-full resize-none min-h-[240px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
        </section>

        <section className="flex flex-col">
            <div className="flex gap-x-2 items-center">
                <NumberedCircle number={5} size="sm" />
                <span>이미지를 올려주세요.</span>
            </div>
            <div className="mt-3" />
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button 
              leftIcon={<ImageIcon size={18} />}
              label="사진 등록하기"
              buttonType={BUTTON_TYPE.ghost}
              className="h-[48px] w-full"
              onClick={handleImageUpload}
            />
            {imageFile && (
              <div className="mt-2 flex items-center justify-between bg-gray-50 p-2 rounded-md">
                <span className="text-sm truncate max-w-[80%]">{imageFile.name}</span>
                <button 
                  type="button" 
                  onClick={removeImage}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X size={16} />
                </button>
              </div>
            )}
        </section>

        <section className="flex flex-col mt-4 bg-gray-50 p-4 rounded-md">
          <div className="flex items-start gap-x-2">
            <input 
              type="checkbox" 
              id="reviewGuidelines" 
              className="mt-1"
              checked={agreeToPolicy}
              onChange={(e) => setAgreeToPolicy(e.target.checked)}
            />
            <label htmlFor="reviewGuidelines" className="text-sm">
              <span className="font-medium underline">후기 운영정책</span>을 확인하였으며, 이에 동의합니다.
            </label>
          </div>
          
          <div className="mt-4">
            <h3 className="font-medium text-sm mb-2">후기 관리 규정</h3>
            <p className="text-xs text-gray-600 leading-5">
              신사타는 고객님이 작성하신 후기를 있는 그대로 게시하는 것을 기본 운영정책으로 삼고 있습니다. 다만, 다음에 해당하는 게시물은 규정에 어긋나는 후기로 등록할 수 없으며, 관리자가 임의로 블라인드 처리하거나 삭제할 수 있습니다.
            </p>
            
            <ul className="text-xs text-gray-600 mt-3 space-y-1 list-disc pl-4">
              <li>상담 내용 및 상담사 소통과 관련 없는 내용만 경우</li>
              <li>어뷰징, 허위로 반복적 글을 게재(정보성 포함)하는 경우</li>
              <li>상담사 또는 타인에 대한 혐오, 비방, 명예훼손의 내용을 포함하는 경우</li>
              <li>저작권/초상권에 문제가 있는 내용을 포함하는 경우</li>
              <li>같은 사람이 같은 상담사에 대한 불만글을 연속적으로 등록하는 경우</li>
              <li>기타 관련 법규 및 사회적 규범, 미풍양속에 어긋난다고 판단되는 경우</li>
            </ul>
          </div>
        </section>
      </div>

        <footer className="h-[128px] bottom-[30px] w-full border-t-2 border-t-slate-200 sticky flex gap-x-4 pt-3 px-4 bg-white">
            <Button label="취소" buttonType={BUTTON_TYPE.abse} onClick={onClickBack} className="h-[48px] flex-[0.2]" />
            <Button
              label={isSubmitting ? "제출 중..." : "등록하기"} 
              buttonType={BUTTON_TYPE.primary} 
              className="h-[48px] flex-[0.8]"
              onClick={handleSubmit}
              disabled={isSubmitting}
            />
        </footer>
    </div>
  );
};

export default Page;

const categories: string[] = [
    "애정",
    "짝사랑",
    "궁합",
    "이별",
    "재회",
    "속궁합",
    "속마음",
    "결혼",
    "가족",
    "건강",
    "고민",
    "이사",
    "꿈해몽",
    "인간관계",
    "재물",
    "사업",
    "취업",
    "진로",
    "시험",
    "합격"
];

const styles: string[] = [
    "용해요",
    "친절해요",
    "현실적이에요",
    "깊이있어요",
    "소름돋아요",
    "편안해요",
    "공감해요",
    "정확해요",
    "잘들어줘요",
    "솔직해요",
    "놀라워요",
    "쉽게설명해요",
    "답변이빨라요",
    "목소리가좋아요"
  ];