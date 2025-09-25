"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  TooltipProps,
} from "recharts";

// ------------------ 이미지 경로 ------------------
const CARD_BACK = "/card_back.png"; // public/card_back.png

// 축 key -> 결과 카드 앞면 이미지 (public*.png)
const RESULT_IMAGE_BY_KEY: Record<AxisKey, string> = {
  pro: "NICE답게-1.png",
  betterBest: "NICE답게-2.png",
  niceAct: "NICE답게-3.png",
  colleagues: "NICE답게-4.png",
  whyWith: "NICE답게-5.png",
  oneGoal: "NICE답게-6.png",
};

// ------------------ 설정 ------------------
const AXES = [
  { key: "pro", label: "전문성" },
  { key: "betterBest", label: "Better to Best" },
  { key: "niceAct", label: "NICE한 인성" },
  { key: "colleagues", label: "동료애" },
  { key: "whyWith", label: "Why & With" },
  { key: "oneGoal", label: "One Goal" },
] as const;

const AXES_2 = [
  { key: "pro",        label: "01. 나의 전문성이 NICE의 경쟁력입니다." },
  { key: "betterBest", label: "02. Better를 추구할 때 Best가 됩니다." },
  { key: "niceAct",    label: "03. NICE인이라면, 나이스하게 행동합니다." },
  { key: "colleagues", label: "04. 최고의 복지는 동료입니다." },
  { key: "whyWith",    label: "05. Why를 알아야 With가 있습니다." },
  { key: "oneGoal",    label: "06. 서로 하는 일은 달라도 우리의 목적지는 하나입니다." },
] as const;

type AxisKey = typeof AXES[number]["key"];
type Question = { axis: AxisKey; text: string };

// ------------------ 질문 ------------------
const QUESTIONS: Question[] = [
  { axis: "pro", text: "나는 앞으로 회사 생활에서 나의 전문성을 발전시키는 것이 매우 중요하다고 생각한다." },
  { axis: "pro", text: "내가 가진 전공 지식이나 경험이 회사의 성장에 기여할 수 있다고 믿는다." },
  { axis: "pro", text: "새로운 직무를 맡더라도, 빠르게 배우고 전문성을 키워 나갈 자신이 있다." },
  { axis: "betterBest", text: "변화가 주어지면 부담스럽지만, 받아들이고 적응하려고 노력한다." },
  { axis: "betterBest", text: "새로운 시도에서 실패할 가능성이 있더라도 도전해보는 편이다." },
  { axis: "betterBest", text: "내가 하는 일이 다른 사람에게도 더 편리하고 효율적으로 다가갈 수 있도록 고민한다." },
  { axis: "niceAct", text: "회의 중에 다른 사람이 말을 하고 있을 때, 상대방의 말을 끊지 않고 끝까지 듣는 편이다." },
  { axis: "niceAct", text: "동료에게 업무 피드백을 줄 때, 상대방의 기분을 고려하여 부드럽게 표현하려고 노력한다." },
  { axis: "niceAct", text: "협업이나 회의 도중 동료와 의견 충돌이 생겼을 때, 흥분하지 않고 감정을 조절하며 상대방의 의견을 끝까지 듣고 함께 해결책을 찾으려 한다." },
  { axis: "colleagues", text: "동료의 성장이 곧 팀의 성장이라는 생각으로 기꺼이 노하우를 공유한다." },
  { axis: "colleagues", text: "동료가 어려울 때 '내 일이 아니야'라고 생각하지 않고 먼저 다가가 본적이 있다." },
  { axis: "colleagues", text: "성과가 뛰어난 동료를 보면 경쟁심보다는 함께 성장하고 싶다는 생각이 든다." },
  { axis: "whyWith", text: "팀 협업을 할 때 바른 실행보다는 공유된 이해를 바탕으로 진행하는 것이 더 효율적이라고 생각한다. " },
  { axis: "whyWith", text: "동료가 나에게 업무를 요청할 때 이유와 맥락을 설명해 주면 책임감을 더 크게 느낀다" },
  { axis: "whyWith", text: "팀 내에서 목표에 대한 충분한 소통 없이 일이 진행되면, 불필요한 업무방향 수정이 자주 생긴다고 본다" },
  { axis: "oneGoal", text: "다른 팀의 성과가 좋아지면 내 팀에도 긍정적인 영향을 준다고 믿는다." },
  { axis: "oneGoal", text: "다른 부서가 맡은 일을 이해하려고 노력하는 것이 결국 내 일에도 도움이 된다고 본다." },
  { axis: "oneGoal", text: "동료가 어려움에 빠졌을 때 내 일이 조금 늦어지더라도 도와주는 것이 옳다고 본다." },
];

// ------------------ 컴포넌트 ------------------
function VideoIntro({ onEnd }: { onEnd: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <video
        src="/opening.mp4"
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
        onEnded={onEnd}
      />
    </div>
  );
}

// ------------------ 훅/유틸 ------------------
function useSelectedQuestions() {
  return useMemo(() => {
    const byAxis: Record<AxisKey, Question[]> = {
      pro: [], betterBest: [], niceAct: [], colleagues: [], whyWith: [], oneGoal: [],
    } as Record<AxisKey, Question[]>;
    for (const q of QUESTIONS) byAxis[q.axis].push(q);
    const pick3 = (arr: Question[]) => arr.slice().sort(() => Math.random() - 0.5).slice(0, 3);
    return AXES.flatMap((a) => pick3(byAxis[a.key]));
  }, []);
}

function useAxisTotals(scores: number[], selectedQuestions: Question[]) {
  return useMemo(() => {
    const sum: Record<string, number> = {};
    AXES.forEach((a) => (sum[a.key] = 0));
    selectedQuestions.forEach((q, i) => { sum[q.axis] += scores[i] ?? 0; });
    return AXES.map(({ key, label }) => ({ axisKey: key, axisLabel: label, value: sum[key] }));
  }, [scores, selectedQuestions]);


}

function RadarView({ axisData }: { axisData: { axisLabel: string; value: number }[] }) {
  const chartData = axisData.map((d) => ({ subject: d.axisLabel, A: d.value, fullMark: 15 }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 px-3 py-2 rounded shadow text-sm">
          <p className="text-black">{payload[0].payload.subject}</p>
          <p className="text-black "> 점수 : {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[420px]">
      <ResponsiveContainer>
        <RadarChart data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" stroke="#eee" className="font-bold"/>
          <PolarRadiusAxis angle={30} domain={[0, 15]} stroke="#ccc" tick={false}/>
          <Radar name="점수" dataKey="A" stroke="#F9CF10" fill="#F9CF10" fillOpacity={0.5} />
          <Tooltip content={<CustomTooltip />}/>
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ------------------ 인트로 카드 셔플 ------------------
function TarotShuffle() {
  const cards = new Array(6).fill(0);
  return (
    <div className="relative h-72 w-full flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('/images/tarot-silhouette.png')] bg-contain bg-center bg-no-repeat opacity-80 pointer-events-none" />
      {cards.map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-44 w-26 rounded-xl shadow-2xl flex items-center justify-center"
          style={{ backgroundColor: "#02227a", zIndex: i + 1 }}
          initial={{ x: -140, rotate: -12 + i * 2, opacity: 0 }}
          animate={{
            x: [-140, 140, -140],
            opacity: [0, 1, 1, 0.8],
            rotate: [-12 + i * 2, 12 - i * 2, -12 + i * 2],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
        >
          <img
            src={CARD_BACK}
            alt="NICE Back"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </motion.div>
      ))}
      {/* 중앙 강조 카드 */}
      <motion.div
        className="absolute h-44 w-26 rounded-2xl border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.35)] flex items-center justify-center"
        initial={{ scale: 0.95, rotate: -3, opacity: 0.95 }}
        animate={{ scale: [0.95, 1, 0.98, 1], rotate: [-3, 3, -2, 0], opacity: 1 }}
        transition={{ duration: 2.8, repeat: Infinity }}
        style={{ zIndex: 999, backgroundColor: "#02227a" }}
      >
        <img
          src={CARD_BACK}
          alt="NICE Back"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </motion.div>
    </div>
  );
}

// ------------------ 동점 인덱스 계산 ------------------
function computeRevealIndicesFromTotals(totals: { value: number }[]): number[] {
  if (!totals.length) return [];
  const maxVal = Math.max(...totals.map((d) => d.value));
  return totals.map((d, i) => (d.value === maxVal ? i : -1)).filter((i) => i >= 0);
}

// ------------------ 메인 ------------------
export default function NiceSurveyApp() {
  // 훅: 항상 같은 순서/개수로 호출
  const selectedQuestions = useSelectedQuestions();
  const [scores, setScores] = useState<number[]>(() => new Array(selectedQuestions.length).fill(0));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"video" | "intro" | "questions" | "reveal" | "result">("video");
  const [revealIndices, setRevealIndices] = useState<number[]>([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [showChart, setShowChart] = useState(false);
  const [selectableCards, setSelectableCards] = useState<number[]>([]);

  // 결과 진입 시 처리
  useEffect(() => {
    if (phase === "result") {
      setSelectableCards(revealIndices);
      if (selectedCard === null && revealIndices.length === 1) {
        setSelectedCard(revealIndices[0]);
      }
    }
  }, [phase, selectedCard, revealIndices]);

  const axisTotals = useAxisTotals(scores, selectedQuestions);

  const handleAnswer = (idx: number, value: number) => {
    setScores((prev) => prev.map((p, i) => (i === idx ? value : p)));
    if (idx < selectedQuestions.length - 1) setCurrentIndex(idx + 1);
  };

  // 결과 직전: 뒤집히는 카드(앞/뒷면에 이미지 적용)
  const TarotReveal: React.FC<{ revealIndices: number[]; onDone: () => void }> = ({ revealIndices, onDone }) => {
    const cards = new Array(6).fill(0);
    useEffect(() => {
      const timer = setTimeout(() => onDone(), 2000);
      return () => clearTimeout(timer);
    }, [onDone]);
    return (
      <div className="relative w-full flex items-center justify-center py-6">
        <div className="grid grid-cols-6 gap-3 [perspective:1200px]">
          {cards.map((_, i) => {
            const isReveal = revealIndices.includes(i);
            const keyForImage = AXES_2[i].key as AxisKey;
            const frontSrc = RESULT_IMAGE_BY_KEY[keyForImage];
            return (
              <motion.div
                key={i}
                initial={{ rotateY: 0, y: 0 }}
                animate={{ rotateY: isReveal ? 180 : 0, y: isReveal ? -80 : 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="w-20 h-32 md:w-24 md:h-36 [transform-style:preserve-3d]"
              >
                <div className="relative w-full h-full [transform-style:preserve-3d]">
                  {/* 뒷면 */}
                  <div
                    className="absolute inset-0 rounded-xl shadow-lg flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: "#02227a", backfaceVisibility: "hidden" }}
                  >
                    <img src={CARD_BACK} alt="Card Back" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </div>

                  {/* 앞면 */}
                  <div
                    className="absolute inset-0 rounded-xl shadow-xl flex items-center justify-center overflow-hidden"
                    style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                  >
                    <img src={frontSrc} alt={`Result ${i}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  const isLastQuestion = currentIndex === selectedQuestions.length - 1;

  const AXIS_DESCRIPTIONS: Record<string, string> = {
    pro: "내가 맡은 분양에서 전문성을 바탕으로 주도적이며 책임감있게 일할 때, 회사와 나는 함께 성장하는 좋은 파트너가 됩니다.",
    betterBest: "현실에 안주하거나 불편함을 참는 건 스마트하지 않습니다. 변화를 두려워하지 않고 더 나음(Better)을 추구하는 것 만이 우리를 최고(Best)로 이끌수 있습니다.",
    niceAct: "구성원 간 존중과 배려, 약속을 지키는 것은 당연히 갖춰야 할 덕목입니다. 'NICE'에 맞는 '나이스'한 구성원이 되기 위해 노력해야 합니다.",
    colleagues: "NICE는 최고의 전문가가 모인 집단입니다. 탁월한 동료와 함께 고민할 때 더 나은 해결책을 찾고 목표 달성을 위한 시너지를 만들 수 있습니다.",
    whyWith: "불분명한 업무지시나 소통은 오해를 만들고 잘못된 결과를 초래합니다. '무엇을'과 '어떻게' 뿐 아니라 왜(Why)를 공유할 때 같은 방향으로 함께(With) 나아갈 수 있습니다.",
    oneGoal: "우리의 목적지는 하나! 서로 다른 일을 하더라도 모두 회사를 위한 일입니다. 부서간의 이해관계를 우선시 하는 것 보다는 우리 회사 공동의 목표에 도달하기 위해 노력해야 합니다.",
  };

  return (
    <div className="min-h-screen w-full bg-[linear-gradient(180deg,_#6560C5_0%,_#131A85_100%)] text-[#F8F7FF] flex items-center justify-center">
      {/* 비디오는 오버레이 렌더 (조기 return 금지) */}
      {phase === "video" && <VideoIntro onEnd={() => setPhase("intro")} />}

      <div className="relative max-w-3xl mx-auto px-4 py-10 w-full">
        {phase === "intro" && (
          <>
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center text-4xl font-extrabold mb-4 tracking-tight">
              나.. 얼마나 <span className="text-[#F9CF10] drop-shadow">NICE</span> 할까?
            </motion.h1>
            <p className="text-center text-base text-violet-100 mb-6">신비한 타로 상점에서 <span className="font-semibold text-white">NICE FIT</span>을 점쳐보세요.</p>
            <div className="mt-6 flex flex-col items-center">
              <TarotShuffle />
              <Button onClick={() => setPhase("questions")} className="mt-6 px-6 py-6 bold rounded-sm bg-[#F9CF10] hover:bg-[#F9CF10]/80 text-black font-bold shadow-lg text-base">
                NICE FIT 진단하기
              </Button>
            </div>
          </>
        )}

        {phase === "questions" && (
          <>
            <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-lg font-bold mb-6 text-center text-violet-50">
              질문에 응답해주세요
            </motion.h2>
            <div className="p-6 text-center">
              <div className="mb-6 text-lg font-bold leading-relaxed text-white">{selectedQuestions[currentIndex].text}</div>
              <div className="grid grid-cols-1 gap-3">
                {[1, 2, 3, 4, 5].map((val) => (
                  <Button
                    key={val}
                    variant="outline"
                    onClick={() => handleAnswer(currentIndex, val)}
                    className="w-full justify-center bg-white/10 hover:bg-white/40 text-white border-white/30"
                  >
                    {val === 1 && "매우 그렇지 않다"}
                    {val === 2 && "그렇지 않다"}
                    {val === 3 && "보통이다"}
                    {val === 4 && "그렇다"}
                    {val === 5 && "매우 그렇다"}
                  </Button>
                ))}
              </div>
              <div className="mt-4 text-sm text-violet-200">{currentIndex + 1} / {selectedQuestions.length}</div>
              {isLastQuestion && scores[currentIndex] > 0 && (
                <div className="mt-6 flex justify-center">
                  <Button
                    onClick={() => {
                      const ties = computeRevealIndicesFromTotals(axisTotals);
                      const finalIndices = ties.length ? ties : [Math.floor(Math.random() * 6)];
                      setRevealIndices(finalIndices);
                      setSelectableCards(finalIndices);
                      setPhase("reveal");
                    }}
                    className="px-6 py-4 h-12 rounded-sm bg-[#F9CF10] hover:bg-gray-100 text-[#312E3F] shadow-lg text-base"
                  >
                    검사 결과 확인하기
                  </Button>
                </div>
              )}
            </div>
          </>
        )}

        {phase === "reveal" && (
          <div className="w-full">
            <TarotReveal revealIndices={revealIndices} onDone={() => setPhase("result")} />
          </div>
        )}

        {phase === "result" && (
          <>
            <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-2xl font-bold mb-6 text-center">
              검사 결과
            </motion.h2>

            {/* 결과 상단: 뒤집힌 카드(클릭 가능) */}
            <div className="flex justify-center mb-4">
              <div className="flex gap-3">
                {revealIndices.map((i) => {
                  const keyForImage = AXES_2[i].key as AxisKey;
                  const frontSrc = RESULT_IMAGE_BY_KEY[keyForImage];
                  return (
                    <motion.div
                      key={`top-${i}`}
                      className={`w-20 h-32 md:w-24 md:h-36 [transform-style:preserve-3d] cursor-pointer ${selectedCard === i ? "ring-8 ring-[#F9CF10]/50 rounded-sm" : ""}`}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      onClick={() => { setSelectedCard(i); setShowChart(false); }}
                    >
                      <div className="relative w-full h-full [transform-style:preserve-3d]">
                        {/* selectable 카드일 때 가장자리 반짝임 */}
                        {selectableCards.includes(i) && (
                          <div className="absolute -inset-1 rounded-xl pointer-events-none">
                            <div className="absolute inset-0 rounded-xl animate-pulse ring-2 ring-[#F9CF10]/50" />
                          </div>
                        )}
                        {/* 앞면 이미지 */}
                        <div className="absolute inset-0 rounded-xl shadow-xl overflow-hidden">
                          <img src={frontSrc} alt={`Revealed ${i}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* 클릭한 카드의 설명 + 차트 토글 */}
            {selectedCard !== null && (
              <>
                <div className="max-w-xl mx-auto mb-3 p-4 rounded-xl bg-white/10">
                  <div className="text-sm text-violet-100 mb-2 font-semibold">{AXES_2[selectedCard].label}</div>
                  <div className="text-sm text-violet-200">{AXIS_DESCRIPTIONS[AXES_2[selectedCard].key]}</div>
                </div>
                <div className="flex justify-center mb-4">
                  <Button onClick={() => setShowChart((v) => !v)} className="px-4 py-2 rounded-sm font-bold text-black bg-[#F9CF10] hover:bg-[#F9CF10]/80">
                    {showChart ? "차트 가리기" : "차트 보기"}
                  </Button>
                </div>
              </>
            )}

            {showChart && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-6 p-6">
                <RadarView axisData={axisTotals.map(({ axisLabel, value }) => ({ axisLabel, value }))} />
              </motion.div>
            )}

            <div className="text-center mb-6">
              <p className="mb-2 font-bold">당신은 이미 NICE다운 인재입니다 ✨</p>
              <Button asChild className="bg-[#F9CF10] font-bold hover:bg-[#F9CF10]/80 px-6 py-6 text-base text-black rounded-sm">
                <a href="https://nice.career.greetinghr.com/ko/guide" target="_blank" rel="noreferrer">지금 바로 NICE 지원하기</a>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
