# Use Node.js base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy files
COPY package*.json ./
RUN npm install

COPY . .

# Expose port and start server
EXPOSE 5000
CMD ["npm", "start"]
