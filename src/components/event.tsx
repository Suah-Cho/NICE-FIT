// components/EventSection.tsx

export default function EventSection({ userName }: { userName: string }) {
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
        <p className="text-base font-bold py-3 text-violet-200 mb-2">
          {userName}님의 NICE다운 순간을 공유해주세요
        </p>

        <div className="text-4xl py-3 font-extrabold text-white mb-1">
          ✨ NICE답게 댓글 이벤트 ✨
        </div>

        <p className="text-base py-3 font-bold text-violet-200 mb-6">
          입사후 내가 경험한 NICE답게 사례를 댓글로 적어주세요
        </p>

        <div className="space-y-3 text-center items-center justify-center">
          
          {/* 예시 1 */}
          <div className="flex items-center gap-3">
            <div className="
              px-3 py-2 
              bg-white/20 
              rounded-lg 
              text-xs 
              text-white 
              font-semibold
              w-14 text-center
              justify-center
            ">
              예시1
            </div>

            <div className="text-left text-sm text-white">
              NICE최복동 만난 사례
            </div>
          </div>

          {/* 예시 2 */}
          <div className="flex items-center gap-3">
            <div className="
              px-3 py-2 
              bg-white/20 
              rounded-lg 
              text-xs 
              text-white 
              font-semibold
              w-14 text-center
            ">
              예시2
            </div>

            <div className="text-left text-sm text-white">
              BETTER을 위하여 팀워크가 빛났던 사례
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}