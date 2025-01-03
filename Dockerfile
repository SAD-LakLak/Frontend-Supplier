FROM docker.arvancloud.ir/node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM docker.arvancloud.ir/node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/build /app/build

COPY package*.json ./
RUN npm install --production

ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

CMD ["npx", "serve", "-s", "build", "-l", "3000"]
