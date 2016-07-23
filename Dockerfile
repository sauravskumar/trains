FROM node:6.3.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

ENV docker true

#CMD [ "npm", "start" ]
CMD ["/bin/bash"]