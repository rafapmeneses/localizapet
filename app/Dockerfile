FROM node:16.17.0 as build-stage

WORKDIR /app

COPY package.json package.json
RUN npm install

COPY src src
COPY public public
RUN npm run build

FROM nginx
EXPOSE 8080

COPY --from=build-stage /app/build /usr/share/nginx/html
