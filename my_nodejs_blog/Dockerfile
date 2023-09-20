# my_nodejs_blog/Dockerfile

# Node.js 이미지를 기반으로 합니다.
FROM node:14-alpine

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 필요한 패키지 설치
RUN apk --no-cache add build-base python3

# 의존성 파일들을 도커 이미지에 복사
COPY package*.json ./

# 패키지 설치
RUN npm install

# 모든 파일을 도커 이미지에 복사
COPY . .

# 백엔드 서버가 사용할 포트 설정 (예: 8081)
EXPOSE 8081

# 서버 실행
CMD ["npm", "start"]