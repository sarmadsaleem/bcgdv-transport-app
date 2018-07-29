# Node LTS image apline
FROM node:8.11.3-alpine

# Set Node ENV
ENV NODE_ENV=production
RUN echo $NODE_ENV

# Create base directory
RUN mkdir /src

# Set working directory
WORKDIR /src

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --no-cache --frozen-lockfile --production;

# Copy source
COPY . . 

# Run tests
RUN yarn test

CMD ["node", "app.js"]
EXPOSE 8081