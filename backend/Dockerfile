FROM node:6.3.0

MAINTAINER jingxin.sjx "https://github.com/luckyjing"

RUN mkdir -p /var/app

WORKDIR /var/app

COPY . /var/app/

RUN npm install

RUN npm run build

RUN npm install -g pm2

ENV NODE_ENV production

EXPOSE 5000


WORKDIR /var/app

CMD ["pm2", "start", "start.js", "--no-daemon"]