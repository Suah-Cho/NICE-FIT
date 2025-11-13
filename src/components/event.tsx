// components/EventSection.tsx
import { useEffect, useState } from "react";

export default function EventSection({ userName }: { userName: string }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="
        w-full max-w-xl 
        bg-white/5 
        rounded-2xl 
        p-6 
        border border-white/10
        text-center
        text-white
        shadow-xl
      ">
        
        {/* 상단 텍스트 */}
        <p className="text-base font-bold py-3 text-violet-200 mb-2 whitespace-pre-line">
          {isMobile
            ? `${userName}님의\nNICE다운 순간을 공유해주세요`
            : `${userName}님의 NICE다운 순간을 공유해주세요`}
        </p>

        {/* <div className="text-2xl py-3 font-extrabold text-white mb-1 whitespace-pre-line">
          ✨ NICE답게 댓글 이벤트 ✨
        </div> */}
        <div
          className={`
            py-3 font-extrabold text-white mb-1 whitespace-pre-line
            ${isMobile ? "text-2xl" : "text-4xl"}
          `}
        >
          ✨ NICE답게 댓글 이벤트 ✨
        </div>

        <p className="text-base py-3 font-bold text-violet-200 mb-6 whitespace-pre-line">
          {isMobile
            ? `입사후 내가 경험한\nNICE답게 사례를 댓글로 적어주세요`
            : `입사후 내가 경험한 NICE답게 사례를 댓글로 적어주세요`}
        </p>

        <div className={`space-y-3 flex flex-col items-center justify-center w-full 
                        ${isMobile ? "ml-2" : "ml-16"}`}>
          {/* 예시 1 */}
          <div className="w-full max-w-md flex items-center gap-3 justify-start">
            <div
              className="
                px-3 py-2 
                bg-white/20 
                rounded-lg 
                text-xs 
                text-white 
                font-semibold
                w-14 text-center
              "
            >
              예시1
            </div>

            <div className="text-left text-sm text-white">
              NICE 최복동 만난 사례
            </div>
          </div>

          {/* 예시 2 */}
          <div className="w-full max-w-md flex items-center gap-3 justify-start">
            <div
              className="
                px-3 py-2 
                bg-white/20 
                rounded-lg 
                text-xs 
                text-white 
                font-semibold
                w-14 text-center
              "
            >
              예시2
            </div>

            <div className="text-left text-sm text-white">
              BETTER을 위하여 팀워크가 빛났던 사례
            </div>
          </div>
        </div>
        <div className="py-3"></div>
      </div>
    </div>
  );
}