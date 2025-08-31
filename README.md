# 📚 aboutBooks

도서 추천, 서지 정보 탐색, 가까운 도서관 위치까지 한 번에 확인 가능한 **Nuxt 기반 웹 서비스**

---
## 🚀 주요 기능
- **랜덤 추천 도서**: 초기 진입 시 무작위 추천 도서 안내
- **통합 서지 검색**: 책 제목, 설명 등을 통한 API 기반 도서 정보 조회
- **외부 링크 연결**: 구매나 상세 페이지로 쉽게 이동
- **근처 도서관 정보**: 현재 위치 기반으로 도서 소장 도서관 지도 표시
- **회원가입 / 로그인 (Firebase Authentication)**  
  - 이메일/비밀번호 기반 회원가입 & 로그인
  - Firebase Auth로 안전하게 사용자 인증 처리
  - 로그인 후 개인화 기능(검색 기록, 즐겨찾기 예정)

---
## ⚙️ 기술 스택
| 영역 | 기술 |
|------|------|
| 프레임워크 | Nuxt 3 (Vue 3 기반) |
| 상태 관리 | Pinia |
| UI/스타일링 | Tailwind CSS, Quasar Components |
| 외부 API | Daum 책 / 블로그 / 유튜브 API / kakao map 등 |  
| 서울시 공공데이터포털 | 서울시 공공도서관 정보 json |  
| Authentication & DB | Firebase Authentication, Firestore

<!-- | 배포 | Vercel / Netlify 등 (Deploy 설명 링크) | -->

## 📌 앞으로의 업데이트 내용
- 검색 결과 페이지 UI 개선
- MyPage UI 개선
- 검색 기록 저장 기능 (Firestore 연동)
- 개인화 추천 도서 제공

---
##  설치 & 실행 방법

```bash
# 복제
git clone https://github.com/rlawksml/aboutBooks.git
cd aboutBooks


# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
