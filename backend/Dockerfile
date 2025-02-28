FROM node:22-alpine

# Create a user and group
RUN addgroup -S backend && adduser -S -G backend backend

# Set working directory and grant permissions before switching users
WORKDIR /backend

COPY package*.json ./

RUN chown -R backend:backend /backend

# Switch to the backend user before running npm install
USER backend

RUN npm install

# Copy the rest of the application
COPY --chown=backend:backend . .

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:dev"]
