"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AXES, type AxisKey, QUESTION_LIST, type QuestionItem } from "@/data/questions"; 
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

export default function SurveyPage() {
  // ✔ 질문 목록
  const selectedQuestions = QUESTION_LIST;

  // ✔ 현재 문항 index
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✔ 선택된 trait 저장 배열
  const [scores, setScores] = useState<(AxisKey | null)[]>(
    () => new Array(selectedQuestions.length).fill(null)
  );

  // ✔ 답변 선택
  const handleAnswer = (idx: number, trait: AxisKey) => {
    setScores((prev) => prev.map((p, i) => (i === idx ? trait : p)));

    if (idx < selectedQuestions.length - 1) {
      setCurrentIndex(idx + 1);
    }
  };

  // ✔ trait 개수 계산
  const axisTotals = useMemo(() => {
    const sum: Record<AxisKey, number> = {
      pro: 0,
      betterBest: 0,
      niceAct: 0,
      colleagues: 0,
      whyWith: 0,
      oneGoal: 0,
    };

    scores.forEach((trait) => {
      if (trait) sum[trait] += 1;
    });

    return AXES.map(({ key, label }) => ({
      axisKey: key,
      axisLabel: label,
      value: sum[key],
    }));
  }, [scores]);

  // ✔ 마지막 문항인지
  const isLastQuestion = currentIndex === selectedQuestions.length - 1;

  // ✔ 현재 문항 답변했는지
  const isAnswered = scores[currentIndex] !== null;

  // ✔ 모든 문항 완료되면 결과 보여주기
  const isFinished = scores.every((v) => v !== null);

  if (isFinished) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
        <h2 className="text-2xl font-bold mb-4">결과 분석</h2>

        <div className="w-full max-w-md">
          <RadarChart data={axisTotals} />
        </div>

        <div className="mt-8">
          {axisTotals.map((a) => (
            <p key={a.axisKey} className="text-white/70 text-center">
              {a.axisLabel}: {a.value}
            </p>
          ))}
        </div>
      </div>
    );
  }

  // 현재 문제
  const currentQuestion = selectedQuestions[currentIndex];

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl p-8 rounded-xl border border-white/10 shadow-2xl text-white"
      >
        {/* 질문 번호 */}
        <div className="mb-2 text-sm text-white/60">
          {currentIndex + 1} / {selectedQuestions.length}
        </div>

        {/* 질문 내용 */}
        <h2 className="text-xl font-semibold mb-6">{currentQuestion.text}</h2>

        {/* 옵션 버튼 */}
        <div className="grid grid-cols-1 gap-3">
          {currentQuestion.options.map((opt) => (
            <Button
              key={opt.code}
              onClick={() => handleAnswer(currentIndex, opt.trait)}
              variant={scores[currentIndex] === opt.trait ? "default" : "outline"}
              className={`w-full justify-center border-white/30
                ${
                  scores[currentIndex] === opt.trait
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 text-white hover:bg-white/30"
                }
              `}
            >
              {opt.label}
            </Button>
          ))}
        </div>

        {/* 다음 버튼 */}
        {!isLastQuestion && isAnswered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 w-full flex justify-end"
          >
            <Button
              onClick={() => setCurrentIndex(currentIndex + 1)}
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              다음 →
            </Button>
          </motion.div>
        )}

        {/* 결과 보기 버튼 */}
        {isLastQuestion && isAnswered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 w-full flex justify-center"
          >
            <Button
              onClick={() => {} /* isFinished=true → 자동으로 결과페이지 전환 */}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              결과 보기
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}