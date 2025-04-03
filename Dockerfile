FROM node:23-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5050
CMD [ "npm", "start" ]