# Fetching the latest node image on apline linux
FROM node:20-alpine AS builder

# Declaring env
ENV NODE_ENV production
ENV REACT_APP_BACKEND_URL https://backend.dosomemath.com

# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY ./package.json ./
RUN npm install

# Copying all the files in our project
COPY . .

# Building our application
RUN npm run build

# Fetching the latest nginx image
FROM nginx

# Copying built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Copying our nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
