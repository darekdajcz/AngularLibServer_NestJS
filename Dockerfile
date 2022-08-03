FROM node:carbon

# create app directory
WORKDIR /usr/src/app

# boudle app source
COPY . .

# npm instal
RUN npm install

# eun npm instal --gloval grpc --usage-perm
EXPOSE 3000 9204
CMD [ "npm", "run", "debug"]
