FROM node:boron

# install yarn
  RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn -y

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production --pure-lockfile

# Bundle app source
COPY ./build ./build
# move source maps to a different location
RUN mv build/client/index.js.map build/client.js.map
RUN mv build/server/index.js.map build/server.js.map

# copy config folder
COPY ./config /usr/src/app/config

EXPOSE 8080
ENV NODE_ENV=production
ENV NODE_PATH=build
CMD [ "node", "./build/server/index.js" ]
