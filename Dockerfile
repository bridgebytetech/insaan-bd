# 1️⃣ Base image
FROM node:20-alpine AS builder

# 2️⃣ App directory
WORKDIR /app

# 3️⃣ Install deps
COPY package*.json ./
RUN npm install

# 4️⃣ Copy project
COPY . .

# 5️⃣ Build Next.js
RUN npm run build


# 6️⃣ Production image
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app ./

ENV NODE_ENV=production
ENV PORT=5173
EXPOSE 5173

CMD ["npm", "start"]