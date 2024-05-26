FROM node:14

WORKDIR /library
COPY package.json .
RUN npm install
COPY . .
CMD npm start