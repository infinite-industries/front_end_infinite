FROM node:9.4

ENV APP_HOME=/usr/src/app

RUN mkdir -p $APP_HOME

WORKDIR $APP_HOME

ADD . $APP_HOME/
