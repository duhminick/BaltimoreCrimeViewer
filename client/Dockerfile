FROM node:12.10.0-alpine
WORKDIR /app
EXPOSE 3000

# Install nodemon for hot reloading
RUN npm install -g nodemon

# Install packages
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN yarn install

# Add in the rest of the files
COPY . /app
CMD ["yarn", "start"]