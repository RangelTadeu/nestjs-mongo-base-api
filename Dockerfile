FROM node:18-alpine as base

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install -g @nestjs/cli
RUN npm run prebuild

COPY . .

FROM base as development

EXPOSE 9229
EXPOSE 3001

CMD ["npm", "run", "start"]