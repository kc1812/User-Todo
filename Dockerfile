# Node v8.6.0 as the base image to support ES6
FROM node:8.6.0

WORKDIR $HOME/app

COPY package.json package-lock.json ./

RUN npm install

# RUN npm install babel-cli babel-preset-env -g

COPY . .

EXPOSE 3000

CMD ["npm", "run", "prod"]