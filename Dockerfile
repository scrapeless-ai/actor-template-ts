# 构建阶段
FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm@10.8.1

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm@10.8.1

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod

COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production

CMD ["node", "dist/index.js"]