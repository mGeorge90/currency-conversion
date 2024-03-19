# Use the official Node.js image as base
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy .env.example into the container
COPY .env.example .env


# Expose port 3000
EXPOSE 3000

# Expose another port (e.g., 3001) for running tests
EXPOSE 3001

# Command to run the application
CMD ["npm", "start"]
