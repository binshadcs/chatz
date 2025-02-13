# Turborepo Starter

This Turborepo starter is maintained by the Turborepo core team.

## Setup Instructions

To get started, clone the project and install dependencies:

```sh
# Clone the repository
git clone https://github.com/binshadcs/chatz.git

# Navigate to the project directory
cd chatz

# Install dependencies
npm install

# Move into the web app directory
cd apps/web

# Rename the environment file
mv example.env .env

# Update the .env file with your configurations

# Generate Prisma client code
npx prisma generate

# Move back to the root directory
cd ../..

# Start the development server
npm run dev
```

## What's Inside?

This Turborepo includes the following packages/apps:

### Apps

- `web`: a [Next.js](https://nextjs.org/) app
- `ws`: a WebSocket server

### Packages

- `@repo/ui`: a stub React component library shared by `web`
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already set up for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```sh
cd chatz
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```sh
cd chatz
pnpm dev
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```sh
cd chatz
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```sh
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

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

