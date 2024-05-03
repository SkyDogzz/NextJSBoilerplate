FROM node:16-alpine as base

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

FROM base as dev

ENV NODE_ENV=development

EXPOSE 3000

CMD ["yarn", "dev"]

FROM base as builder

ENV NODE_ENV=production

RUN yarn build

FROM node:16-alpine as production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["yarn", "start"]
