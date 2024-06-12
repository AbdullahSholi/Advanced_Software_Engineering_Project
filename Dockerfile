# Use a base image with NodeJS 18
FROM node:18



# Install all the dependencies in the container using the package.json file
RUN apt-get update && apt-get install -y default-mysql-client

COPY package.json .
RUN npm install -g nodemon

RUN npm install

# Copy the remaining project files to the container
COPY . .

# Expose the application port
EXPOSE 3000

# Add wait-for-it script
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Start the app
CMD ["node", "--max-old-space-size=16384"]
CMD ["wait-for-it.sh", "mysqldb:3306","--","npm", "run","start"]
