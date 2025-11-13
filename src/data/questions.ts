
export const AXES = [
  { key: "pro",        label: "나의 전문성이\n NICE의 경쟁력입니다." },
  { key: "betterBest", label: "Better를 추구할 때\n Best가 됩니다." },
  { key: "niceAct",    label: "NICE인이라면,\n나이스하게 행동합니다." },
  { key: "colleagues", label: "최고의 복지는\n동료입니다." },
  { key: "whyWith",    label: "Why를 알아야\nWith가 있습니다." },
  { key: "oneGoal",    label: "서로 하는 일은 달라도\n우리의 목적지는\n하나입니다." },
] as const;

export type AxisKey = typeof AXES[number]["key"];

export type Option = {
  label: string;
  trait: { axis: AxisKey; weight: number; }[];
}

export type QuestionItem = {
  id: number;
  text: string;
  options: Option[];
}

export const QUESTION_LIST: QuestionItem[] = [
  {
    id: 1,
    text: "Q1. 내 업무의 마감이 임박한 상황에서, 팀 동료가 급히 도움을 요청한다면?",
    options: [
      {
        label: "아무리 바빠도 동료의 부탁이면 시간을 내서 돕는다.",
        trait: [{ axis: "niceAct", weight: 0.5 }, { axis: "colleagues", weight: 1 }]
      },
      {
        label: "내가 잘 아는 분야라 더 빨리 도울 수 있는 부분인지 확인한다.",
        trait: [{ axis: "pro", weight: 0.8 }, { axis: "oneGoal", weight: 1 }]
      },
      {
        label: "양해를 구하고, 내 업무를 먼저 마친다.",
        trait: [{ axis: "pro", weight: 1 }, { axis: "betterBest", weight: 0.5 }]
      },
    ]
  },
  {
    id: 2,
    text: "Q2. 회의 중 상사가 보고서의 실수를 지적했다면?",
    options: [
      {
        label: "지적을 감사하게 받아들이고, 무엇을 고칠지 생각해본다.",
        trait: [{ axis: "betterBest", weight: 0.5 }, { axis: "niceAct", weight: 1 }]
      },
      {
        label: "피드백을 반영했을 때 더 좋은 부분이 있을 지 살펴본다.",
        trait: [{ axis: "betterBest", weight: 0.6 }, { axis: "whyWith", weight: 1 }]
      },
      {
        label: "우리 팀의 목표가 같다는 걸 기억하면서 피드백을 수용한다.",
        trait: [{ axis: "colleagues", weight: 0.8 }, { axis: "oneGoal", weight: 0.9 }]
      },
    ]
  },
  {
    id: 3,
    text: "Q3. 협업 프로젝트에서 업무 방식의 차이로 의견 충돌이 생긴다면?",
    options: [
      {
        label: "서로 이해하면서, 목표가 결국 하나라는 걸 바탕을 먼저 생각해요.",
        trait: [{ axis: "whyWith", weight: 1 }]
      },
      {
        label: "우선 감정이 상하지 않도록 상대방 의견을 끝까지 들어줄 것 같아요.",
        trait: [{ axis: "niceAct", weight: 1 }, { axis: "colleagues", weight: 0.9 }]
      },
      {
        label: "저는 제 전문성을 발휘해 더 나은 해결책을 제안해볼 것 같아요.",
        trait: [{ axis: "pro", weight: 1 }, { axis: "betterBest", weight: 1 }]
      },
    ]
  },
  {
    id: 4,
    text: "Q4. 회사에서 새로운 기술을 도입한 프로젝트 팀에 합류해달라는 제안을 받는다면?" , 
    options: [ 
      {
        label: "새로운 도전이지만, 동료들과 함께 배우면서 해낼 것 같아요.", 
        trait: [{ axis:"betterBest",weight:1},{axis:"niceAct",weight:0.7},{axis:"colleagues",weight:0.8},]
      },
      {
        label: "우선 왜 나에게 이 역할을 제안했는지 충분히 이해한 후 결정할 것 같아요.", 
        trait: [{axis:"pro",weight:0.8},{axis:"whyWith",weight:1},]
      },
      {
        label: "잘 모르는 분야라면 무턱대고 수락하기보다, 해당 분야에 더 전문성이 있는 동료가 있는지 살펴볼 것 같아요.", 
        trait: [{axis:"pro",weight:1},{axis:"oneGoal",weight:1},]
      },
    ]
  },
  {
    id: 5,
    text: "Q5. 상사로부터 배경 설명 없이 새로운 업무를 지시받는다면?" , 
    options: [ 
      {
        label: "업무의 배경과 맥락을 우선 질문한다.", 
        trait: [{axis:"betterBest",weight:0.5},{axis:"niceAct",weight:0.7},{axis:"whyWith",weight:1},]
      },
      {
        label: "상사 또는 동료에게 업무에 대한 조언을 구한다.", 
        trait: [{axis:"oneGoal",weight:0.8},]
      },
      {
        label: "일단 시키신 일은 최선을 다해 처리한다.", 
        trait: [{axis:"niceAct",weight:1},{axis:"colleagues",weight:0.7},{axis:"oneGoal",weight:1},]
      },
    ]
  },
  {
    id: 6,
    text: "Q6. 두 동료가 서로의 업무 방식 때문에 언쟁을 벌이고 있다면?" , 
    options: [ 
      {
        label: "서로의 입장을 공감하고 이해시켜주려고 노력한다.", 
        trait: [{axis:"niceAct",weight:0.4},{axis:"colleagues",weight:1},]
      },
      {
        label: "갈등의 원인을 먼저 파악해본다.", 
        trait: [{axis:"whyWith",weight:1},{axis:"oneGoal",weight:0.8},]
      },
      {
        label: "팀의 같은 목표를 상기시키면서 중재한다.", 
        trait: [{axis:"colleagues",weight:0.8},]
      },
    ]
  },
  {
    id: 7,
    text: "Q7. 팀원이 과도한 업무양으로 힘들어하고 있다면?" , 
    options: [ 
      {
        label: "동료의 업무 부담을 덜어주려고, 나눠서 돕습니다.", 
        trait: [{axis:"niceAct",weight:0.7},{axis:"colleagues",weight:1},]
      },
      {
        label: "우선 왜 업무량이 많아졌는지 원인을 살펴본다.", 
        trait: [{axis:"whyWith",weight:1},{axis:"oneGoal",weight:0.8},]
      },
      {
        label: "팀원의 역량 향상에도 도움이 되도록, 조언이나 팁을 전한다.", 
        trait: [{axis:"pro",weight:0.4},{axis:"betterBest",weight:0.8},{axis:"oneGoal",weight:1},]
      },
    ]
  },
  {
    id: 8,
    text: "Q8. 동료가 회의 중 다른 팀원에게 다소 무례하게 행동하는 것을 목격했다면," , 
    options: [ 
      {
        label: "회의 후 조용히 해당 동료에게 방금 상황에 대해 피드백한다.", 
        trait: [{axis:"niceAct",weight:1},]
      },
      {
        label: "왜 그런 행동을 했는지 동료의 입장을 이해해보려 한다.", 
        trait: [{axis:"whyWith",weight:1},]
      },
      {
        label: "그 순간에는 일단 제 역할인 회의 진행에 집중한다.", 
        trait: [{axis:"pro",weight:1},{axis:"betterBest",weight:0.7},]
      },
    ]
  },
  {
    id: 9,
    text: "Q9. 지금보다 효율을 높일 수 있는 새로운 아이디어가 떠올랐습니다. 하지만 동료들은 변화를 망설이는 분위기라면?" , 
    options: [ 
      {
        label: "아이디어의 취지와 개선 효과를 충분히 설명하고 진행한다.", 
        trait: [{axis:"whyWith",weight:1},]
      },
      {
        label: "일단 작은 부분부터 시도해보자고 제안한다.", 
        trait: [{axis:"betterBest",weight:1},{axis:"niceAct",weight:0.7},]
      },
      {
        label: "나부터 솔선수범하여 새 아이디어를 적용한다.", 
        trait: [{axis:"pro",weight:1},{axis:"betterBest",weight:0.8},]
      },
    ]
  },
  {
    id: 10,
    text: "Q10. 당신이 주축으로 참여한 프로젝트가 큰 성공을 거두었습니다. 이 성공의 요인을 무엇이라고 생각하시나요?" , 
    options: [ 
      {
        label: "마음은 하나로 모았던 게 주효했다고 생각한다.", 
        trait: [{axis:"colleagues",weight:1},{axis:"oneGoal",weight:0.7},]
      },
      {
        label: "모두 함께 더 나은 방법을 꾸준히 고민해온 덕분이라고 생각한다.", 
        trait: [{axis:"betterBest",weight:0.6},{axis:"niceAct",weight:0.3},]
      },
      {
        label: "누구 하나 빠짐없이 전문성을 최대한 발휘해 준 결과라고 생각한다.", 
        trait: [{axis:"pro",weight:1},]
      },
    ]
  },
]

export const ResultSummary: Record<AxisKey, string> = {
    pro: '완벽주의 DNA를 장착한 ‘디테일 장인’. 허투루 넘어가는 건 절대 못 봐요.',
    betterBest: '항상 더 높은 목표를 향해가는 ‘도전가’. 현재만이 아닌 미래를 바라봐요.',
    niceAct: '배려와 존중으로 모두를 편하게 만드는 분위기 메이커',
    colleagues: '함께할 때 가장 빛나는, ‘시너지의 중심’. 함께일 때 200% 에너지를 내는 사람',
    whyWith: 'dldidkdkdkdkdkk',
    oneGoal: '`원팀` , `원골`을 추구해요. 뭉치면 살고 흩어지면 죽는다!',
  }

export const ResultTraits: Record<AxisKey, string[]> = {
  pro: [
    "나의 전문성이 곧 팀의 신뢰라고 생각해요",
    "내가 한 일은 끝까지 완성도 있게 마무리해야 마음이 놓여요",
  ],

  betterBest: [
    "지금이 최선일까요? 조금만 바꾸면 더 좋아질 것 같아요!",
    "최선을 추구하면 최고가 될 수 있어요!",
  ],

  niceAct: [
    "웃으면 복이 따라온다!",
    "내가 받고 싶은 친절만큼 남에게도 친절하자",
  ],

  colleagues: [
    "혼자보다 같이 하면 더 잘돼요",
    "함께 고민해요, 제가 도와드릴게요",
  ],

  whyWith: [
    "WHY를 공유하면 WITH로 이어집니다. 방향만 맞으면 일은 반이나 된 거예요.",
    "같이 가려면 먼저 이해시키고 설득해야 해요. 그래야 진짜 한 팀이 되죠.",
  ],

  oneGoal: [
    "회사 일은 2인3각 같아요 호흡을 맞춰야해요!",
    "우린 한 배에 탄 운명공동체!",
  ],
}

export const ResultMomonet: Record<AxisKey, string[]> = {
  pro: [
    "내가 한 일은 끝까지 완성도 있게 마무리해야 마음이 놓여요",
    "내가 맡은 일에 몰입할 때, 준비한 역량을 발휘할 때 가장 빛나요.",
  ],

  betterBest: [
    "최선을 추구하면 최고가 될 수 있어요!",
    "변화로 작은 성과를 만들었을 때, ‘더 나아질 수 있다’는 확신을 얻는 순간 가장 빛나요.",
  ],

  niceAct: [
    "내가 받고 싶은 친절만큼 남에게도 친절하자",
    "누군가가 마음 편해지고 분위기가 부드러워지는 걸 느낄 때 가장 빛나요.",
  ],

  colleagues: [
    "함께 고민해요, 제가 도와드릴게요",
    "함께 고민한 노력이 좋은 성과로 이어졌을 때",
  ],

  whyWith: [
    "같이 가려면 먼저 이해시키고 설득해야 해요. 그래야 진짜 한 팀이 되죠.",
    "내가 던진 질문으로 회의의 방향이 명확해졌을 때 힘이 나요.",
  ],

  oneGoal: [
    "우린 한 배에 탄 운명공동체!",
    "서로 다른 팀들이 한 방향으로 힘을 모아 큰 성과를 낼 때, 진짜 팀워크의 가치를 느껴요.",
  ],
}