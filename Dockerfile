FROM node:alpine AS builder

WORKDIR /repo
COPY . .
RUN npm ci
RUN npm run -w apps/backend prisma-generate
RUN npm run build

##

FROM nginx:alpine AS final

RUN apk add --no-cache nodejs npm
COPY --from=builder /repo/build/frontend /usr/share/nginx/html/
COPY --from=builder /repo/build/backend /app/backend
COPY apps/backend/package.json /app/backend/package.json
COPY apps/backend/prisma /app/backend/prisma
WORKDIR /app/backend
RUN npm i --omit=dev
WORKDIR /
RUN npm i -g prisma
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD sh -c "echo 'hi' && \
  DATABASE_URL=\"$DATABASE_URL\" npx prisma migrate deploy --schema=/app/backend/prisma/schema.prisma && \
  DATABASE_URL=\"$DATABASE_URL\" node /app/backend/seed.js && \
  node /app/backend/main.js & \
  nginx -g 'daemon off;'"
