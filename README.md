# Turbo TypeScript-First Monorepo with NestJS

A strict TypeScript-first monorepo for building scalable API gateways and microservices using NestJS, Turbo, and pnpm workspaces.

## 🎯 Quick Start

```bash
# Install dependencies
pnpm install

# Watch all packages
pnpm dev

# In another terminal: Start API Gateway (port 3000)
pnpm -F backend start:dev

# In another terminal: Start Users Service (port 3001)
pnpm -F @repo/users-service dev

# Test the API
curl http://localhost:3001/api/users
```

## 📚 Documentation

- **[SETUP_SUMMARY.md](./SETUP_SUMMARY.md)** - Start here! Quick overview & next steps
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Detailed walkthrough & configuration
- **[MONOREPO.md](./MONOREPO.md)** - Complete architecture guide & commands
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design & patterns
- **[CHECKLIST.md](./CHECKLIST.md)** - Setup verification checklist

## 🏗️ Architecture

```
┌─────────────────┐     ┌──────────────┐
│  API Gateway    │     │ Next.js App  │
│ (apps/backend)  │     │ (apps/nextjs)│
│ Port: 3000      │     │ Port: 3000   │
└────────┬────────┘     └──────────────┘
         │
    ┌────┴─────────────────┐
    ▼                      ▼
┌────────────────┐  ┌──────────────────┐
│ Users Service  │  │ Products Service │
│ (Port: 3001)   │  │ (Port: 3002)     │
└────────────────┘  └──────────────────┘
```

## 📦 What's Inside

### Apps

- `apps/backend` - NestJS API Gateway (main service)
- `apps/nextjs` - Next.js frontend application

### Services (Microservices)

- `services/users-service` - Example users microservice (template for others)
- Add more with: `./scripts/create-service.sh <service-name>`

### Tooling (Shared Packages)

- `@repo/nest-config` - Shared NestJS utilities
- `@repo/eslint-config` - ESLint configurations
- `@repo/prettier-config` - Prettier configuration
- `@repo/typescript-config` - TypeScript base configuration

## ✨ Key Features

✅ **Strict TypeScript Mode** - All packages enforce:

- `noImplicitAny: true`
- `noUnusedLocals: true`
- `noImplicitReturns: true`
- `strictNullChecks: true`
- And all other strict flags

✅ **Scalable Microservices** - Each service is independently deployable

✅ **Fast Build System** - Turbo handles caching and parallelization

✅ **100% TypeScript** - Type-safe across the entire monorepo

## 🚀 Common Commands

### Development

```bash
pnpm dev                               # Watch all packages
pnpm -F backend start:dev              # Backend gateway only
pnpm -F @repo/users-service dev       # Users service only
```

### Building

```bash
pnpm build                             # Build all packages
pnpm -F @repo/users-service build     # Build specific package
```

### Testing

```bash
pnpm test                              # Test all
pnpm -F @repo/users-service test      # Test specific package
pnpm test:cov                          # Coverage
```

### Code Quality

```bash
pnpm typecheck                         # Type check all
pnpm lint                              # Lint all
pnpm lint:fix                          # Fix lint issues
pnpm format:fix                        # Format code
```

### Utilities

```bash
./scripts/create-service.sh <name>    # Create new microservice
./validate-setup.sh                    # Validate setup
pnpm lint:ws                           # Validate workspace
```

## 🔧 Creating New Microservices

Create a new microservice in 30 seconds:

```bash
./scripts/create-service.sh products-service
```

This creates a fully configured NestJS service ready to run.

## 📊 Monorepo Commands

Using Turbo for optimized builds:

```bash
# With global turbo
turbo dev
turbo build
turbo test

# Or with pnpm
pnpm exec turbo dev
pnpm exec turbo build
pnpm exec turbo test
```

Filter to specific packages:

```bash
turbo build --filter=backend
turbo dev --filter=@repo/users-service
```

## 🌐 Remote Caching

Enable faster CI/CD with Vercel Remote Cache:

```bash
pnpm exec turbo login
pnpm exec turbo link
```

## 📚 Resources

- [Turbo Docs](https://turbo.build/docs)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [NestJS Docs](https://docs.nestjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 💡 Tips

- Start with `pnpm dev` to watch all packages
- Use `pnpm -F <package> <command>` to target specific packages
- Check `SETUP_SUMMARY.md` for quick answers
- Run `./validate-setup.sh` to verify your setup

---

Built with ❤️ using Turbo, pnpm, and NestJS

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)
