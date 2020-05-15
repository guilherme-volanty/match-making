FROM nginx:alpine

RUN rm /etc/nginx/conf.d/*

COPY nginx.conf /etc/nginx/conf.d/

# CMD bin/my-service start && tail -f /dev/null
