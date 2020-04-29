FROM node:13

MAINTAINER Jeremias_Norma

COPY . .

WORKDIR /car-match

ENV PORT = 5002

RUN yarn install

CMD ["yarn", "start"]

EXPOSE 5002


# Buildando a imagem
# docker build -t moraesjeremias/upload-base:upload-base .

# Instanciando o container
# docker run --env PORT=5002 -p 3333:5002 upload-base:upload-base