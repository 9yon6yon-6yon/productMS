FROM node:22-alpine

# Create a user and group
RUN addgroup -S frontend && adduser -S -G frontend frontend

# Set working directory and grant permissions before switching users
WORKDIR /frontend

COPY package*.json ./

RUN chown -R frontend:frontend /frontend

# Switch to the backend user before running npm install
USER frontend

RUN npm install

# Copy the rest of the application
COPY --chown=frontend:frontend . .

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
