FROM ubuntu:latest
LABEL authors="maoyanluo"

WORKDIR /ws
ADD https://nodejs.org/dist/v22.11.0/node-v22.11.0-linux-x64.tar.xz /ws

RUN apt update
RUN apt install -y xz-utils nginx

RUN tar -xf node-v22.11.0-linux-x64.tar.xz

ENV NODE_HOME=/ws/node-v22.11.0-linux-x64
ENV PATH=$PATH:$NODE_HOME/bin

WORKDIR /ws/code

COPY public /ws/code/public
COPY src /ws/code/src
COPY eslint.config.js /ws/code
COPY index.html /ws/code
COPY package.json /ws/code
COPY package-lock.json /ws/code
COPY postcss.config.js /ws/code
COPY tailwind.config.js /ws/code
COPY tsconfig.app.json /ws/code
COPY tsconfig.json /ws/code
COPY tsconfig.node.json /ws/code
COPY vite.config.ts /ws/code

RUN npm i

RUN npm run build

COPY nginx.conf /etc/nginx/

WORKDIR /ws
COPY main.sh /ws/

RUN chmod +x main.sh

EXPOSE 80

ENTRYPOINT ["/bin/bash", "main.sh"]