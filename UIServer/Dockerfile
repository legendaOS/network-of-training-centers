FROM ubuntu
RUN apt-get update
RUN apt-get install nginx -y
COPY /content /var/www/html
VOLUME /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]