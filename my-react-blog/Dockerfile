# Node.js 이미지를 기반으로 합니다.
FROM node:14

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 의존성 파일들을 도커 이미지에 복사
COPY package*.json ./

# 패키지 설치
RUN npm install

# React 18.2.0 버전 설치
RUN npm install react@18.2.0 react-dom@18.2.0

# 모든 파일을 도커 이미지에 복사
COPY . .

# React 앱을 빌드
RUN npm run build

# React 앱을 제공하기 위한 포트 설정
EXPOSE 3000

# React 앱 실행
CMD ["npm", "start"]
