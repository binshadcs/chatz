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
   ```![Uploading Screenshot 2025-02-13 at 2.05.50 PM.png…]()

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



## Conclusion
This setup allows seamless integration between a Next.js frontend and a WebSocket-powered backend while leveraging Prisma and PostgreSQL for database interactions. Using Turborepo ensures an optimized and scalable development experience.

