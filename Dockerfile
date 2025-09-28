FROM node:20-slim
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev

COPY scripts backend/scripts

CMD ["node", "scripts/uploadScents.js"]