import { cn } from "@/lib/utils";
import { TeacherReviewDetails } from "@/types/review";
import moment from "moment";

export default function Review({ data, className }: { data: TeacherReviewDetails, className?: string }) {
    const { rating } = data;

    return (
        <section className={cn("flex flex-col w-full py-4", className)}>

            <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-x-2">
                <span className="text-sm font-bold">{data.userName}</span>
            <div className="flex text-yellow-400">
            {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-xl">
                    {star <= Math.floor(rating) ? '★' : 
                    star === Math.ceil(rating) && rating % 1 !== 0 ? '★' : '☆'}
                </span>
            ))}
                </div>
            </div>
            <span className="text-sm text-gray-400">{moment(data.date).format('YYYY.MM.DD')}</span>
            </div>

            <div className="flex mt-2 text-slate-700">
                <span>{data.content}</span>
            </div>


        </section>
    );
}