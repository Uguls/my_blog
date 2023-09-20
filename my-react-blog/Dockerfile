# my-react-blog/Dockerfile

# Node.js 이미지를 기반으로 합니다.
FROM node:14

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 의존성 파일들을 도커 이미지에 복사
COPY package*.json ./

# 패키지 설치
RUN npm install

# 모든 파일을 도커 이미지에 복사
COPY . .

# React 앱을 빌드
RUN npm run build

# Nginx를 사용하여 React 앱을 제공
FROM nginx:alpine
COPY --from=0 /usr/src/app/build /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Nginx 포트 설정
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
