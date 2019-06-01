FROM cypress/browsers:latest

WORKDIR /usr/app/src

COPY package.json .
COPY package-lock.json .
RUN npm install -f

COPY . .

CMD ["npm", "run", "test-headless"]
