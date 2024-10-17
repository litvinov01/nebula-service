FROM node:22 AS base

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

FROM base AS build

RUN npm run build

FROM build AS test

CMD ["npm", "run", "test", "--watch"]

FROM build AS production

CMD ["npm", "run", "start:prod"]
