# 📋 NestJS Task Management API

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white)](https://nestjs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://postgresql.org)
[![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)](https://jwt.io)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white)](https://jestjs.io)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=black)](https://swagger.io)

A production-ready **Task Management REST API** built with **NestJS** and **TypeScript**, demonstrating clean backend architecture with authentication, authorization, data persistence, and comprehensive Swagger documentation.

## ✨ Features

- 🔐 **JWT Authentication** — register, login, secure token-based auth
- 👤 **User-scoped data** — users only see and manage their own tasks
- 📋 **Full CRUD** — create, read, update, delete tasks with validation
- 🔍 **Search & filter** — filter tasks by status and search by title/description
- 📝 **Swagger UI** — fully documented API at `/api`
- ✅ **Input validation** — `class-validator` DTOs with descriptive error messages
- 🧪 **Unit tested** — Jest tests for services and controllers
- 🏗️ **Modular architecture** — NestJS modules, dependency injection, decorators

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | NestJS (Node.js) |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | TypeORM |
| Auth | JWT (Passport.js strategy) |
| Validation | class-validator · class-transformer |
| Docs | Swagger / OpenAPI 3.0 |
| Testing | Jest · Supertest |
| Config | `@nestjs/config` with `.env` |

## 🏗️ Architecture

```
nestjs-task-management/
├── src/
│   ├── auth/                  # Authentication module
│   │   ├── auth.controller.ts # POST /auth/signup, POST /auth/signin
│   │   ├── auth.service.ts    # Password hashing, JWT generation
│   │   ├── auth.module.ts
│   │   ├── jwt.strategy.ts    # Passport JWT strategy
│   │   ├── get-user.decorator.ts
│   │   └── dto/
│   │       ├── auth-credentials.dto.ts
│   ├── tasks/                 # Tasks module (main domain)
│   │   ├── tasks.controller.ts
│   │   ├── tasks.service.ts
│   │   ├── tasks.module.ts
│   │   ├── task.entity.ts     # TypeORM entity with User relation
│   │   ├── task-status.enum.ts
│   │   ├── tasks.repository.ts
│   │   └── dto/
│   │       ├── create-task.dto.ts
│   │       ├── update-task-status.dto.ts
│   │       └── get-tasks-filter.dto.ts
│   └── main.ts                # Bootstrap + Swagger setup
├── test/
│   ├── tasks.service.spec.ts
│   └── auth.service.spec.ts
├── .env.example
└── package.json
```

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/signup` | Register a new user |
| `POST` | `/auth/signin` | Login and receive JWT |

### Tasks (all require `Authorization: Bearer <token>`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tasks` | Get all tasks (with optional filters) |
| `POST` | `/tasks` | Create a new task |
| `GET` | `/tasks/:id` | Get a task by ID |
| `PATCH` | `/tasks/:id/status` | Update task status |
| `DELETE` | `/tasks/:id` | Delete a task |

### Task Status values
`OPEN` → `IN_PROGRESS` → `DONE`

### Filter query params
```
GET /tasks?status=OPEN&search=shopping
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL running locally (or Docker)

```bash
git clone https://github.com/joshivignesh/nestjs-task-management.git
cd nestjs-task-management
npm install
```

### Environment setup

```bash
cp .env.example .env
```

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_DATABASE=task-management
JWT_SECRET=yourjwtsecret
```

### Run

```bash
# Development (hot reload)
npm run start:dev

# Production
npm run build && npm run start:prod
```

API available at `http://localhost:3000`  
Swagger docs at `http://localhost:3000/api`

### Test

```bash
npm run test          # Unit tests
npm run test:watch    # Watch mode
npm run test:cov      # Coverage report
```

## 🔒 Auth Flow

```
POST /auth/signup  →  hashed password stored  →  201 Created
POST /auth/signin  →  validate credentials    →  { accessToken: "eyJ..." }

All task routes:
  Request headers: { Authorization: "Bearer eyJ..." }
  JWT Strategy extracts user → Guards protect routes
  Tasks filtered to authenticated user only
```

## 👤 Author

**Vignesh Joshi** — Senior Full Stack Engineer  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-joshivignesh-0077B5?style=flat-square&logo=linkedin)](https://linkedin.com/in/joshivignesh)
[![GitHub](https://img.shields.io/badge/GitHub-joshivignesh-181717?style=flat-square&logo=github)](https://github.com/joshivignesh)
