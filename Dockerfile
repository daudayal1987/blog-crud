
FROM node:12.18.0-alpine

RUN addgroup -S bloguser && adduser -S -g bloguser bloguser

ENV HOME=/home/bloguser

COPY package.json package-lock.json $HOME/app/

COPY src/ $HOME/app/src

WORKDIR $HOME/app

RUN chown -R bloguser:bloguser $HOME/* /usr/local/ && \
    npm install --production && \
    chown -R bloguser:bloguser $HOME/*

USER bloguser

EXPOSE 3000

CMD ["npm", "start"]