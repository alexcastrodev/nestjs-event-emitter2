# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the rest of the application code to the container
COPY . .

# Set the command to start Storybook
CMD ["yarn", "start:dev"]

# Expose the port Storybook is running on
EXPOSE 3000