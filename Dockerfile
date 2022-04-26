FROM node:14.15.4-slim

USER node

WORKDIR /usr/app

CMD ["npm install && tail -f /dev/null"]