FROM node:7

COPY ./package.json /app/package.json

WORKDIR /app

RUN npm install  --registry=https://registry.npm.taobao.org

COPY . /app



EXPOSE 8000

CMD ["npm", "run","production"]
