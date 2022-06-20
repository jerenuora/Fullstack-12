FROM node:16

WORKDIR /usr/src/app

COPY ./package.json ./
RUN npm install
COPY ./ ./

# npm start is the command to start the application in development mode
CMD ["npm", "start"]
