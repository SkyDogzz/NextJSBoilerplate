FROM node:22.1-alpine as base

WORKDIR /app

COPY package.json ./

RUN yarn install --frozen-lockfile

COPY . .

FROM base as dev

ENV NODE_ENV=development

EXPOSE 3000

CMD ["yarn", "dev"]

FROM base as builder

ENV NODE_ENV=production

RUN npx prisma generate

RUN yarn build

FROM node:22.1-alpine as production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000

CMD ["yarn", "start"]
