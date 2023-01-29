FROM node:19

# Fetch client node modules
WORKDIR /usr/src/app
RUN mkdir client
COPY client/package*.json ./client/
WORKDIR /usr/src/app/client
RUN npm install

# Fetch server node modules
WORKDIR /usr/src/app
RUN mkdir server
COPY server/package*.json ./server/
WORKDIR /usr/src/app/server
RUN npm install

# Copy source code
WORKDIR /usr/src/app
COPY client/* ./client/
COPY server/* ./server/

# Build client
WORKDIR /usr/src/app/client
RUN npm run build

# Reset
WORKDIR /usr/src/app
COPY package*.json ./