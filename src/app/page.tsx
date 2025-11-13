"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
} from "recharts";

import {
  QUESTION_LIST,
  AXES,
  ResultSummary,
  ResultTraits,
  ResultMomonet,
  type AxisKey,
} from "@/data/questions";

import EventSection from "@/components/event";

const CARD_BACK = "/card_back.png";

const RESULT_IMAGE_BY_KEY: Record<AxisKey, string> = {
  pro: "NICE답게-1.png",
  betterBest: "NICE답게-2.png",
  niceAct: "NICE답게-3.png",
  colleagues: "NICE답게-4.png",
  whyWith: "NICE답게-5.png",
  oneGoal: "NICE답게-6.png",
};

// 문항 그대로 사용
const selectedQuestions = QUESTION_LIST;

// ---------------------- 점수 구조 ----------------------
const makeInitialScores = () =>
  AXES.reduce(
    (acc, axis) => ({ ...acc, [axis.key]: 0 }),
    {} as Record<AxisKey, number>
  );

// ------------------ 차트 ------------------
const CustomAngleTick: React.FC<any> = (props) => {
  const { cx, cy, x, y, payload } = props;

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  const dx = x - cx;
  const dy = y - cy;
  const baseRadius = Math.sqrt(dx * dx + dy * dy) || 1;

  const extra = isMobile ? 32 : 45;
  const factor = (baseRadius + extra) / baseRadius;

  const newX = cx + dx * factor;
  const newY = cy + dy * factor;

  const lines = String(payload.value)
    .split("\n")
    .map((line: string) => line.trim())
    .filter(Boolean);

  return (
    <text
      x={newX}
      y={newY}
      textAnchor="middle"
      fill="#FFFFFF"
      fontSize={isMobile ? 11 : 13}
      style={{ pointerEvents: "none" }}
    >
      {lines.map((line: string, idx: number) => (
        <tspan key={idx} x={newX} dy={idx === 0 ? 0 : 14}>
          {line}
        </tspan>
      ))}
    </text>
  );
};

function RadarView({
  axisData,
}: {
  axisData: { axisLabel: string; value: number }[];
}) {
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  const chartData = axisData.map((d) => ({
    subject: d.axisLabel,
    A: d.value,
    fullMark: 10,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 px-3 py-2 rounded shadow text-sm text-black">
          <p>{payload[0].payload.subject}</p>
          <p>점수 : {Number(payload[0].value.toFixed(1))}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="
        w-full
        max-w-[300px]
        sm:max-w-[420px]
        md:max-w-[600px]
        mx-auto
        h-[380px]
        sm:h-[500px]
      "
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          data={chartData}
          outerRadius={isMobile ? "55%" : "70%"}
          margin={{ top: 50, right: 20, bottom: 50, left: 20 }}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={<CustomAngleTick />} />
          <PolarRadiusAxis angle={30} domain={[0, 6]} stroke="#ccc" tick={false} />
          <Radar
            name="점수"
            dataKey="A"
            stroke="#F9CF10"
            fill="#F9CF10"
            fillOpacity={0.5}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ------------------ 카드 뒤집기 ------------------
function computeRevealIndicesFromTotals(scores: Record<AxisKey, number>) {
  const values = AXES.map((a) => scores[a.key]);
  const maxVal = Math.max(...values);

  return values
    .map((v, i) => (v === maxVal ? i : -1))
    .filter((i) => i >= 0);
}

function TarotReveal({
  revealIndices,
  onDone,
}: {
  revealIndices: number[];
  onDone: () => void;
}) {
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
          const keyForImage = AXES[i].key as AxisKey;
          const frontSrc = RESULT_IMAGE_BY_KEY[keyForImage];

          return (
            <motion.div
              key={i}
              initial={{ rotateY: 0, y: 0 }}
              animate={{
                rotateY: isReveal ? 180 : 0,
                y: isReveal ? -80 : 0,
              }}
              transition={{ duration: 1 }}
              className="w-20 h-32 md:w-24 md:h-36 [transform-style:preserve-3d]"
            >
              <div className="relative w-full h-full [transform-style:preserve-3d]">
                <div
                  className="absolute inset-0 rounded-xl shadow-lg flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: "#02227a", backfaceVisibility: "hidden" }}
                >
                  <img src={CARD_BACK} className="w-full h-full object-contain" />
                </div>

                <div
                  className="absolute inset-0 rounded-xl shadow-xl overflow-hidden"
                  style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                >
                  <img src={frontSrc} className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------- 메인 ----------------------
export default function NiceSurveyApp() {
  const [userName, setUserName] = useState("");

  const [scores, setScores] = useState<Record<AxisKey, number>>(makeInitialScores);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [phase, setPhase] = useState<
    "video" | "intro" | "questions" | "reveal" | "result"
  >("video");

  const [revealIndices, setRevealIndices] = useState<number[]>([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [showChart, setShowChart] = useState(false);

  // ⭐ 추가됨: 선택한 옵션 index 저장
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

  const isLastQuestion = currentIndex === selectedQuestions.length - 1;

  // ⭐ 수정됨: 선택 후 index 저장 + 마지막이 아니면 초기화
  const handleAnswer = (
    qIndex: number,
    optIndex: number,
    traits: { axis: AxisKey; weight: number }[]
  ) => {
    setSelectedOptionIndex(optIndex); // 선택 표시 저장

    setScores((prev) => {
      const next = { ...prev };
      traits.forEach(({ axis, weight }) => {
        next[axis] += weight;
      });
      return next;
    });

    // 마지막 문항이 아니면 자동으로 다음 질문으로 이동
    if (qIndex < selectedQuestions.length - 1) {
      setTimeout(() => {
        setCurrentIndex(qIndex + 1);
        setSelectedOptionIndex(null); // 다음 질문에서는 초기화
      }, 200);
    }
  };

  // 결과 카드 결정
  useEffect(() => {
    if (phase === "result") {
      if (revealIndices.length === 1) {
        setSelectedCard(revealIndices[0]);
      }
    }
  }, [phase, revealIndices]);

  const AXIS_DESCRIPTIONS: Record<AxisKey, string> = {
    pro: "내가 맡은 분야에서 전문성을 바탕으로 주도적이며 책임감있게 일할 때, 회사와 나는 함께 성장합니다.",
    betterBest: "변화를 두려워하지 않고 더 나음(Better)을 추구하는 것이 우리를 최고(Best)로 이끕니다.",
    niceAct: "구성원 간 존중과 배려, 약속을 지키는 것은 당연한 자세입니다. NICE하게 행동하는 것이 중요합니다.",
    colleagues: "탁월한 동료와 함께 고민할 때 더 나은 해법을 찾고 시너지가 만들어집니다.",
    whyWith: "Why를 공유해야 With가 있습니다. 소통의 명확함이 같은 방향으로 나아가게 합니다.",
    oneGoal: "우리는 서로 다른 일을 해도 목적지는 하나입니다. 회사의 공동 목표를 향해 함께 나아가야 합니다.",
  };

  return (
    <div className="min-h-screen w-full bg-[linear-gradient(180deg,_#6560C5_0%,_#131A85_100%)] text-[#F8F7FF] flex items-center justify-center">

      {/* 영상 */}
      {phase === "video" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <video
            src="/opening.mp4"
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
            onEnded={() => setPhase("intro")}
          />
        </div>
      )}

      <div className="relative max-w-3xl mx-auto px-4 py-10 w-full">

        {/* 인트로 */}
        {phase === "intro" && (
          <>
            <div className="text-center text-4xl font-extrabold mb-4 tracking-tight">
              나.. 얼마나 <span className="text-[#F9CF10]">NICE</span> 할까?
            </div>

            <p className="text-center text-base text-violet-100 mb-6">
              신비한 타로 상점에서 <span className="font-semibold text-white">NICE FIT</span>을 확인해보세요.
            </p>

            <div className="mt-6 flex flex-col items-center">
              <div className="relative h-72 w-full flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('/images/tarot-silhouette.png')] bg-contain bg-center bg-no-repeat opacity-80 pointer-events-none" />
                {new Array(6).fill(0).map((_, i) => (
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
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.12,
                    }}
                  >
                    <img src={CARD_BACK} className="w-full h-full object-contain" />
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center mb-4">
                <input 
                  type="text"
                  placeholder="이름을 입력해주세요"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="px-4 py-2 rounded-sm bg-white text-black w-64 text-center"
                />
              </div>

              <Button
                onClick={() => setPhase("questions")}
                className="mt-6 px-6 py-6 font-bold rounded-sm bg-[#F9CF10] hover:bg-[#F9CF10]/80 text-black shadow-lg text-base"
              >
                NICE FIT 진단하기
              </Button>
            </div>
          </>
        )}

        {/* 질문 */}
        {phase === "questions" && (
          <>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-lg font-bold mb-6 text-center text-violet-50"
            >
              질문에 응답해주세요
            </motion.h2>

            <div className="p-6 text-center">
              <div className="mb-6 text-lg font-bold text-white">
                {selectedQuestions[currentIndex].text}
              </div>

              {/* ⭐ 선택 UI가 적용된 버튼 부분 */}
              <div className="grid grid-cols-1 gap-3">
                {selectedQuestions[currentIndex].options.map((opt, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    onClick={() => handleAnswer(currentIndex, idx, opt.trait)}
                    className={`
                      w-full justify-center text-base whitespace-normal break-words px-4 py-9 transition-all

                      ${
                        selectedOptionIndex === idx
                          ? "text-black scale-[1.03]"
                          : "bg-white/10 hover:bg-white/40 text-white border-white/30"
                      }
                    `}
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>

              <div className="mt-4 text-sm text-violet-200">
                {currentIndex + 1} / {selectedQuestions.length}
              </div>

              {isLastQuestion && (
                <div className="mt-6 flex justify-center">
                  <Button
                    onClick={() => {
                      const final = computeRevealIndicesFromTotals(scores);
                      setRevealIndices(final);
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

        {/* 카드 뒤집힘 */}
        {phase === "reveal" && (
          <TarotReveal revealIndices={revealIndices} onDone={() => setPhase("result")} />
        )}

        {/* 결과 */}
        {phase === "result" && (
          <>
            <div className="py-10"></div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold mb-6 text-center"
            >
              ✨ {userName}님의 NICE FIT 결과 ✨
            </motion.h2>

            <div className="py-3"></div>

            <div className="flex justify-center mb-4">
              <div className="flex gap-3">
                {revealIndices.map((i) => {
                  const keyForImage = AXES[i].key;
                  const frontSrc = RESULT_IMAGE_BY_KEY[keyForImage];
                  return (
                    <motion.div
                      key={i}
                      className={`w-40 h-70 md:w-48 md:h-80 cursor-pointer ${
                        selectedCard === i ? "ring-8 ring-[#F9CF10]/50 rounded-sm" : ""
                      }`}
                      onClick={() => {
                        setSelectedCard(i);
                        setShowChart(false);
                      }}
                    >
                      <img src={frontSrc} className="rounded-s-none w-full h-full object-cover" />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="py-6"></div>

            {selectedCard !== null && (
              <>
                <div className="max-w-xl mx-auto mb-3 p-4 rounded-xl bg-white/10">
                  <div className="text-sm text-violet-100 mb-2 font-semibold">
                    {AXES[selectedCard].label}
                  </div>
                  <div className="text-sm text-violet-200">
                    {AXIS_DESCRIPTIONS[AXES[selectedCard].key]}
                  </div>
                </div>

                
              </>
            )}

            {/* {showChart && ( */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-3 p-1"
              >
                <RadarView
                  axisData={AXES.map((a) => ({
                    axisLabel: a.label,
                    value: scores[a.key],
                  }))}
                />
              </motion.div>
            {/* )} */}

            <div className="text-center mb-6">
              <p className="mb-2 font-bold text-3xl">🔮</p>
              <p className="mb-2 font-bold text-3xl">{userName}님의</p>
              <p className="mb-2 font-bold text-3xl">NICE다운 특징은...</p>
            </div>

            <div className="text-center py-6">
              <p className="text-lg font-bold text-violet-200">
                {selectedCard !== null && (
                  console.log(ResultSummary[AXES[selectedCard].key]),
                  <>
                    {ResultSummary[AXES[selectedCard].key]}
                  </>
                )}
              </p>
            </div>
            
            <div className="space-y-10 mt-6 py-8">
              {selectedCard !== null && (
                <div className="space-y-8">
                  {ResultTraits[AXES[selectedCard].key as AxisKey].map((trait, index) => (
                    <div
                      key={index}
                      className="
                        bg-[#FFFFFF]/80
                        text-black
                        px-6 py-10
                        rounded-4xl
                        text-center
                        font-semibold
                        text-xl
                        leading-relaxed
                        max-w-xl
                        mx-auto
                      "
                    >
                      {trait}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="py-10"></div>

            <div className="text-center mb-6">
              <p className="mb-2 font-bold text-2xl">🔮</p>
              <p className="mb-2 font-bold text-2xl">{userName}님이</p>
              <p className="mb-2 font-bold text-2xl">가장 NICE다운 순간은...</p>
            </div>

            <div className="space-y-10 mt-6 py-8">
              {selectedCard !== null && (
                <div className="space-y-8">
                  {ResultMomonet[AXES[selectedCard].key as AxisKey].map((trait, index) => (
                    <div
                      key={index}
                      className="
                        bg-[#FFFFFF]/20
                        text-white
                        px-6 py-10
                        rounded-4xl
                        text-center
                        font-semibold
                        text-xl
                        leading-relaxed
                        max-w-xl
                        mx-auto
                      "
                    >
                      ✨ {trait}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="py-10"></div>

            <EventSection userName={userName} />
          </>
        )}
      </div>
    </div>
  );
}