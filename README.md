# 웹 달무티 (Web Dalmuti) - Fan Made 👑

[![Play Game](https://img.shields.io/badge/Play-Dalmuti_Web-cc785c?style=for-the-badge&logo=firebase)](https://singwithgame.github.io/dalmuti/)

인기 보드게임 **'달무티(The Great Dalmuti)'**를 모바일과 PC 웹 브라우저 환경에서 쾌적하게 즐길 수 있도록 구현한 **팬 메이드(Fan-made)** 웹 애플리케이션입니다.

## 🚀 개발 배경

오프라인에서 왁자지껄하게 즐기던 달무티의 재미를, 친구들과 언제 어디서나 웹 브라우저를 통해 실시간으로 즐기기 위해 시작되었습니다.

본 프로젝트는 **Google DeepMind의 Agentic AI 코딩 어시스턴트인 'Antigravity'와 사용자가 함께 페어 프로그래밍(Pair Programming)하며 기획부터 디자인, 핵심 로직, 버그 픽스까지 100% 공동 개발**한 뜻깊은 결과물입니다. AI와 인간의 유쾌한 티키타카를 통해 탄생한 게임입니다! 🤖👨‍💻

## ✨ 주요 기능

- **실시간 멀티플레이**: Firebase Realtime Database를 활용하여 4~8인의 플레이어가 지연 없는 실시간 카드 배틀을 즐길 수 있습니다.
- **자동화된 세금 징수**: 매 라운드 시작 전 복잡할 수 있는 '왕과 노예 간의 세금 교환(카드 하사 및 상납)' 과정을 직관적인 UI로 자동화했습니다.
- **혁명 / 대혁명 시스템**: 조커(어릿광대) 2장을 통한 짜릿한 혁명(세금 징수 무효화) 및 노예의 대혁명(계급 완전 역전) 시스템을 완벽히 지원합니다.
- **모바일 최적화 UX**: 한 손으로도 쾌적하게 패를 확인하고 카드를 낼 수 있도록 모바일 터치 친화적인 반응형 인터페이스를 구성했습니다.
- **실수 방지 시스템**: 동시다발적 터치나 턴 꼬임을 방지하는 자가 치유(Self-healing) 로직 및 액션 컨펌 창을 적용했습니다.
- **전적 및 랭크 변동 기록 (Game History)**: 매 라운드의 순위 변동 이력(예: 평민 ➔ 귀족)과 과거 게임 결과들을 기록하고 열람할 수 있는 명예의 전당 기능이 제공됩니다.

## 🛠️ 기술 스택

- **Frontend**: React (Vite), HTML5, CSS3 (Vanilla CSS)
- **Backend/Database**: Firebase Realtime Database
- **AI Pair Programmer**: Google DeepMind 'Antigravity'

## 🎲 게임 방법

1. 방장이 방을 생성하고 코드를 친구들에게 공유합니다.
2. 4명~8명의 플레이어가 방에 입장하여 [준비 완료]를 누릅니다.
3. 방장이 게임을 시작하면 무작위로 카드가 분배되고 첫 게임이 시작됩니다.
4. 라운드 종료 시 카드를 먼저 모두 소진한 순서대로 새로운 계급(왕 -> 귀족 -> 상인 -> 평민 -> 노예)이 부여됩니다.
5. 다음 라운드부터는 철저한 계급 사회가 시작됩니다! (세금 징수, 먼저 턴 시작 등)

> **"Das Leben ist ungerecht" (인생은 불공평하다)**
> 
> 부디 대달무티의 영광이 당신과 함께하기를! 👑

---

## 💻 나만의 서버 구축하기 (Self-Hosting Guide)

이 프로젝트는 서버 구축이 매우 간단합니다. 누구나 코드를 클론(Clone) 또는 포크(Fork)하여 본인만의 파이어베이스(Firebase) 데이터베이스와 연동해 사설 달무티 방을 구축할 수 있습니다! 

### 1단계: Firebase 프로젝트 설정
1. [Firebase Console](https://console.firebase.google.com/)에 접속하여 새 프로젝트를 생성합니다.
2. **Realtime Database**를 활성화하고, 적절한 서버 위치(예: `asia-northeast3`)를 선택합니다.
3. 데이터베이스 **규칙(Rules)** 탭으로 이동하여, 이 저장소에 있는 `database.rules.json`의 내용을 그대로 복사하여 붙여넣고 게시(Publish)합니다.
4. 프로젝트 개요에서 **웹 앱(`</>`)** 아이콘을 클릭해 앱을 추가하고, 발급받은 **Firebase 구성 객체(Config)**를 확인합니다.

### 2단계: 코드 가져오기 및 환경 변수 설정
```bash
# 1. 저장소 클론 및 폴더 이동
git clone https://github.com/singwithgame/dalmuti.git
cd dalmuti

# 2. 패키지 설치
npm install
```

3. 프로젝트 최상단(루트)에 `.env` 파일을 생성하고 1단계에서 확인한 Firebase 설정값들을 아래 형식에 맞게 입력합니다:
```env
VITE_FIREBASE_API_KEY=당신의_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=당신의_PROJECT_ID.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://당신의_DATABASE_NAME.firebaseio.com
VITE_FIREBASE_PROJECT_ID=당신의_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=당신의_PROJECT_ID.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=당신의_SENDER_ID
VITE_FIREBASE_APP_ID=당신의_APP_ID
```

### 3단계: 로컬 테스트 및 웹 배포
```bash
# 개발 모드로 실행 (http://localhost:5173 에서 확인)
npm run dev

# 실제 배포용 파일 생성
npm run build
```
빌드가 완료되면 생성된 `dist` 폴더를 GitHub Pages, Vercel, Netlify, 혹은 Firebase Hosting 등에 올려 전 세계 사람들과 즐기시면 됩니다!

---

## 📄 License & Disclaimer

- **Source Code (오픈소스 라이선스)**: 본 프로젝트의 모든 **소스 코드**는 [MIT License](LICENSE) 하에 배포됩니다. 누구나 자유롭게 코드를 활용, 수정, 재배포, 포크(Fork)하여 사용할 수 있습니다.
- **Game Concept (게임 규칙 및 상표)**: 이 프로젝트는 보드게임 '달무티(The Great Dalmuti)'의 규칙을 기반으로 만들어진 비상업적 팬 메이드(Fan-made) 작품입니다. 달무티의 원작 아이디어, 명칭, 규칙 등 고유한 게임 콘셉트에 대한 권리는 **Richard Garfield** 및 원작 퍼블리셔(Amigo 등)에게 있습니다. 이 코드를 기반으로 영리/상업적 서비스를 운영할 경우 원작자의 저작권을 침해할 소지가 있으니 유의하시기 바랍니다.
- **Assets (아트 자원)**: 게임 내에 사용된 카드 일러스트레이션 등 그래픽 에셋은 AI를 통해 본 프로젝트만을 위해 새롭게 생성된 리소스입니다.
