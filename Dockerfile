FROM node:20
WORKDIR /

COPY . .

RUN yarn install
RUN yarn run build

EXPOSE 2001

CMD ["yarn", "run", "start:prod"]
