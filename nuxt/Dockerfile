FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3001
COPY package*.json ./
RUN npm install --omit=dev
COPY .output ./.output
EXPOSE 3001
CMD ["node", ".output/server/index.mjs"]