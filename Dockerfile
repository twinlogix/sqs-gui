ARG REGISTRY_ID
FROM $REGISTRY_ID.dkr.ecr.eu-central-1.amazonaws.com/node:16

WORKDIR /app

#COPY ./node_modules ./node_modules
#COPY ./packages/api/node_modules ./packages/api/node_modules
#COPY ./packages/core/node_modules ./packages/core/node_modules
#COPY ./packages/jobs/node_modules ./packages/jobs/node_modules
#COPY ./package*.json ./
#COPY ./packages/api/package*.json ./packages/api/
#COPY ./packages/core/package*.json ./packages/core/
#COPY ./packages/jobs/package*.json ./packages/jobs/
#COPY ./packages/api/build ./packages/api/build
#COPY ./packages/core/build ./packages/core/build
#COPY ./packages/jobs/build ./packages/jobs/build

COPY ./ ./
RUN npm ci

EXPOSE 4000
