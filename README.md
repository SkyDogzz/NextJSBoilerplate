# Next.js Boilerplate

This Next.js boilerplate is configured with Prisma, React, React DOM, and utilizes TailwindCSS for styling. It is designed to be run in Docker containers for both development and production environments.

## Prerequisites

Before you start, ensure that you have the following installed on your machine:
- Node.js (recommended version 18.x)
- Docker and Docker Compose (for containerization)

## Installation

To set up the project, clone the repository to your local machine and navigate into the project directory.

### Install Dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
```

This step is crucial to ensure that your code editor can access Node.js modules, providing intelligent assistance and autocompletion.

## Docker Commands
You can use the following Docker commands within the project directory:

### Development Environment
To start the development server using Docker Compose:

``` bash
npm run docker:dev
```
This will start the development environment. Open http://localhost:3000 to view your application in action.

### Building for Production
To build the Docker image for production using the specific Docker Compose file:

```bash
npm run docker:build
```

### Starting Production
To run the Docker image in detached mode for production:

```bash
npm run docker:start
```
This launches the application in production mode, ensuring that it is running in an optimized configuration.
