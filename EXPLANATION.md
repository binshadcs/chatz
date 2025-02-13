# Explanation of Turborepo Usage

## Overview

This repository is structured as a Turborepo monorepo, containing two applications:

1. **Web App (`apps/web`)** - A Next.js application that serves as the frontend.
2. **WebSocket Server (`apps/websocket-server`)** - A WebSocket server for real-time communication.

## Tech Stack

- **Turborepo**: Manages the monorepo efficiently, optimizing builds and dependencies.
- **Next.js**: The frontend framework for building a fast, scalable web application.
- **WebSocket Server**: A dedicated server handling real-time connections.
- **Prisma**: An ORM (Object-Relational Mapping) tool for database interactions.
- **PostgreSQL**: The database used for storing application data.

## How It Works

### 1. **Web App (`apps/web`)**
- Built with Next.js to provide a modern, scalable UI.
- Interacts with the WebSocket server for real-time updates.
- Uses Prisma to manage database interactions with PostgreSQL.

### 2. **WebSocket Server (`apps/websocket-server`)**
- Handles real-time communication using WebSockets.
- Connects with the PostgreSQL database via Prisma.
- Enables real-time updates and interactions for the web application.

## Development Workflow

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/binshadcs/chatz.git
   cd chatz
   ```
2. **Install Dependencies:**
   ```sh
   npm install
   ```
3. **Set Up Environment Variables:**
   - Navigate to `apps/web` and rename `example.env` to `.env`.
   - Update the `.env` file with the required configurations.
4. **Generate Prisma Client:**
   ```sh
   npx prisma generate
   ```
5. **Run the Development Server:**
   ```sh
   npm run dev
   ```

## Why Turborepo?
- **Faster builds** through caching and optimized dependency management.
- **Better organization** for managing multiple apps within a single repository.
- **Shared packages** for efficient code reuse across applications.

## App Screens
1. **Sign Up page:**
![Project Structure](https://ik.imagekit.io/binshadcs/alps/wep/Screenshot%202025-02-13%20at%202.05.50%E2%80%AFPM.png?updatedAt=1739436355433)

2. **Sign In page:**
![Project Structure](https://ik.imagekit.io/binshadcs/alps/wep/Screenshot%202025-02-13%20at%202.05.41%E2%80%AFPM.png?updatedAt=1739436275957)

3. **Home page | Chat list:**
![Project Structure](https://ik.imagekit.io/binshadcs/alps/wep/Screenshot%202025-02-13%20at%202.03.22%E2%80%AFPM.png?updatedAt=1739436354961)

4. **Public Group chat:**
![Project Structure](https://ik.imagekit.io/binshadcs/alps/wep/Screenshot%202025-02-13%20at%202.04.27%E2%80%AFPM.png?updatedAt=1739436275341)

5. **User Search with names:**
![Project Structure](https://ik.imagekit.io/binshadcs/alps/wep/Screenshot%202025-02-13%20at%202.03.58%E2%80%AFPM.png?updatedAt=1739436275552)

6. **Private Chat:**
![Project Structure](https://ik.imagekit.io/binshadcs/alps/wep/Screenshot%202025-02-13%20at%202.05.27%E2%80%AFPM.png?updatedAt=1739436355245)
![Project Structure](https://ik.imagekit.io/binshadcs/alps/wep/Screenshot%202025-02-13%20at%202.05.08%E2%80%AFPM.png?updatedAt=1739436275299)


## Conclusion
This setup allows seamless integration between a Next.js frontend and a WebSocket-powered backend while leveraging Prisma and PostgreSQL for database interactions. Using Turborepo ensures an optimized and scalable development experience.

