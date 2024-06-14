# Use a base image with NodeJS 18
FROM node:18

# Install all the dependencies in the container using the package.json file
RUN apt-get update && apt-get install -y default-mysql-client dos2unix

COPY package.json .
RUN npm install -g nodemon

RUN npm install

# Copy the remaining project files to the container
COPY . .

# Add wait-for-it script and convert to Unix line endings
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN dos2unix /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Convert specific scripts to Unix line endings
RUN find ./controllers -type f -name "*.js" -exec dos2unix {} \;
RUN find ./models -type f -name "*.js" -exec dos2unix {} \;
RUN dos2unix ./greenthumb.sql
RUN dos2unix ./db.config.js
RUN dos2unix ./routes.js
RUN dos2unix ./middlewares/authMiddleware.js
RUN dos2unix ./middlewares/roleMiddleware.js

# Expose the application port
EXPOSE 3000

# Start the app
CMD ["wait-for-it.sh", "mysqldb:3306", "--", "npm", "run", "start"]
