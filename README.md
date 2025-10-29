
# 🪄 NICE FIT 설문 웹앱 기술 스택 (Next.js/React)

이 프로젝트는 **Next.js 15 기반 정적 SPA**로, NICE 핵심가치 진단을 위한 인터랙티브 설문과 시각화가 결합된 웹앱입니다.

---

## ⚙️ 주요 기술 스택

| 구분 | 기술 |
|------|-------|
| **Front-end** | **React(TypeScript)**, **Recharts**, **Framer Motion** |
| **Style** | **Shadcn/ui**, **TailwindCSS**, **Pretendard Variable** |
| **Infra** | **AWS S3** | 
| **ETC** | **Git**, **ChatGPT** |

---

## 🧩 세부 구성

### 📁 프로젝트 구조
```
/project-root
├── src/
│   ├── app/
│   │   ├── page.tsx         # 메인 페이지 (설문/결과)
│   │   ├── layout.tsx       # 전역 레이아웃
│   ├── components/ui/button.tsx # shadcn UI 버튼 컴포넌트
├── public/
│   ├── opening.mp4
│   ├── card_back.png
│   ├── NICE답게-1.png ~ 6.png
├── next.config.js            # output: 'export' 설정
└── package.json              # 종속성 및 스크립트
```

---

## 🚀 빌드 및 배포 과정

1. **정적 내보내기 설정** (`next.config.js`)
   ```js
   module.exports = { output: 'export' };
   ```

2. **빌드 & 내보내기**
   ```bash
   npm run build
   # 또는
   npx next export
   ```
   → `/out` 폴더 생성 (index.html + 정적 리소스 포함)

3. **AWS S3 업로드**
   ```bash
   aws s3 sync ./out s3://nice-fit-site --delete
   ```

4. **정적 웹 호스팅 설정**
   - Index document: `index.html`
   - Error document: `index.html` (SPA 라우팅용)

5. **CloudFront 구성 (선택)**
   - HTTPS, 커스텀 도메인, 캐싱 최적화 설정 가능

---

## ✨ 요약

- **Next.js + Tailwind + Framer Motion + Recharts** 조합으로 만든 인터랙티브 웹앱
- 모든 UI는 클라이언트 사이드 렌더링 기반 (`"use client"`)
- `next export`로 완전 정적 사이트 생성 → **S3** 배포에 최적화
- 결과 카드, 영상, 애니메이션이 포함된 고품질 UX 구현


