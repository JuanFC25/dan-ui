FROM node:18
WORKDIR /app
# Copy the package.json and package-lock.json files
COPY package*.json ./
# Install production dependencies
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm","run", "dev"]