FROM node:12.10.0-alpine
WORKDIR /app
EXPOSE 3000

# Install nodemon for hot reloading
RUN npm install -g nodemon

# Install packages
COPY package.json /app/package.json
RUN npm install

# Add in the rest of the files
COPY . /app
CMD ["npm", "start"]