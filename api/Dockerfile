FROM node:10

RUN mkdir -p api/app

WORKDIR /api/app

COPY package.json api/app

RUN npm install

COPY . /api/app

CMD [ "npm","start" ]