FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./

RUN npm ci --omit=dev

CMD ["node", "dist/main"]