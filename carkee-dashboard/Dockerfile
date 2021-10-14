FROM node:lts-alpine as build
WORKDIR /app

COPY package.json ./
# RUN apk update && apk add python make g++ && rm -rf /var/cache/apk/
RUN npm install
COPY . ./
RUN npm run build

# production environment
FROM nginx:1.15.2-alpine
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 3000

WORKDIR /usr/share/nginx/html

CMD ["nginx","-g","daemon off;"]