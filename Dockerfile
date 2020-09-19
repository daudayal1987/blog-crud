
FROM node:12.18.0-alpine

RUN addgroup -S bloguser && adduser -S -g bloguser bloguser

ENV HOME=/home/bloguser

COPY package.json package-lock.json $HOME/app/

COPY src/ $HOME/app/src

ADD https://github.com/Yelp/dumb-init/releases/download/v1.1.1/dumb-init_1.1.1_amd64 /usr/local/bin/dumb-init

WORKDIR $HOME/app

RUN chown -R bloguser:bloguser $HOME/* /usr/local/ && \
    chmod +x /usr/local/bin/dumb-init && \
    npm cache clean && \
    npm install --silent --progress=false --production && \
    chown -R bloguser:bloguser $HOME/*

USER bloguser

EXPOSE 3000

CMD ["dumb-init", "npm", "start"]