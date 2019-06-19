FROM alpine:3.8

RUN \
  apk add nginx --update --repository http://dl-cdn.alpinelinux.org/alpine/edge/main && \
  # work directories
  mkdir /code && \
  echo '### dev.Finish ###'
COPY ./nginx/default.conf /etc/nginx/nginx.conf
COPY ./nginx/dev.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443 8080 8000
WORKDIR /code
