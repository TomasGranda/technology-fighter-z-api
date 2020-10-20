FROM node

WORKDIR /usr/app

COPY package*.json ./
RUN npm install -qy

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]