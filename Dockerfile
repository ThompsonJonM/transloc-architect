# Import the Docker image for Cypress Browsers
FROM cypress/browsers:latest

# Set the Docker working directory
WORKDIR /usr/app/src

# Dependency Management
COPY package.json .
RUN npm install -f

# Copy our data and configuration files
COPY cypress cypress
COPY cypress.json .
COPY reporter.config.json .

# Run the test suite headlessly
CMD ["npm", "run", "test-headless"]
