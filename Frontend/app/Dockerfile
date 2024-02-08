# Use the official Node.js 14 image from the Docker Hub
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
COPY package*.json ./

# Install any dependencies
RUN npm install

# Copy the content of the local src directory to the working directory
COPY . .

# Build the React application
RUN npm run build

# Install serve to serve the build folder
RUN npm install -g serve


# Command to run the serve
CMD ["serve", "-s", "build", "-l", "3000"]