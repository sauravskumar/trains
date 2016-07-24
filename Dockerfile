FROM mhart/alpine-node:6

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

ENV docker true

COPY . /usr/src/app

RUN npm run build

CMD ["/bin/bash"]