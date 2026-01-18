# Node.js Boilerplates

A production-ready Node.js backend boilerplate built with Express, TypeScript, Prisma, and Cosmos SDK integration. This boilerplate provides a solid foundation for building scalable REST APIs with database management, authentication, logging, and blockchain integration.

## 🚀 Features

- **Express.js** - Fast, unopinionated web framework
- **TypeScript** - Type-safe development
- **Prisma** - Modern ORM with PostgreSQL support
- **Cosmos SDK Integration** - Built-in support for Oraichain blockchain interactions
- **Swagger/OpenAPI** - Interactive API documentation
- **Winston Logging** - Structured logging with daily rotation
- **Discord Integration** - Webhook notifications for alerts and monitoring
- **Authentication** - API key-based authentication middleware
- **Error Handling** - Centralized error handling with custom exceptions
- **Retry Logic** - Built-in retry utility for resilient operations
- **Security** - Helmet, CORS, compression, and cookie parsing
- **Docker Support** - PostgreSQL database containerization
- **Environment Validation** - Joi-based environment variable validation

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **Yarn** (v1.22 or higher) or npm
- **Docker** and **Docker Compose** (for local database)
- **PostgreSQL** (or use Docker Compose)

## 🛠️ Tech Stack

### Core

- **Express** ^5.2.1 - Web framework
- **TypeScript** ^5.9.3 - Type safety
- **Prisma** ^7.2.0 - Database ORM
- **PostgreSQL** - Database

### Blockchain

- **@cosmjs/cosmwasm-stargate** ^0.38.1 - Cosmos SDK client
- **@cosmjs/proto-signing** ^0.38.1 - Transaction signing
- **@cosmjs/amino** ^0.38.1 - Amino encoding

### Utilities

- **Winston** ^3.19.0 - Logging
- **Winston Daily Rotate File** ^5.0.0 - Log rotation
- **Swagger UI Express** ^5.0.1 - API documentation
- **Discord.js** ^14.25.1 - Discord webhook notifications
- **Joi** ^18.0.2 - Validation
- **Helmet** ^8.1.0 - Security headers
- **Morgan** ^1.10.1 - HTTP request logger

## 📁 Project Structure

```
nodejs-boilerplate/
├── generated/              # Generated Prisma client
│   └── prisma/
├── logs/                   # Application logs
├── prisma/                 # Prisma schema and migrations
│   ├── migrations/
│   └── models/
├── src/
│   ├── app/
│   │   ├── controllers/    # Route controllers
│   │   ├── middlewares/    # Express middlewares
│   │   ├── services/       # Business logic
│   │   └── types/          # TypeScript types
│   ├── configs/            # Configuration files
│   │   ├── env.ts          # Environment variables
│   │   ├── logger.ts       # Winston logger config
│   │   ├── morgan.ts       # HTTP logger config
│   │   ├── network.ts      # Blockchain network config
│   │   └── swagger.ts      # Swagger/OpenAPI config
│   ├── database/
│   │   └── docker-compose.yml  # PostgreSQL Docker setup
│   ├── routes/             # Express routes
│   ├── services/           # External services
│   │   ├── cosmosClient.ts # Cosmos SDK client
│   │   ├── discord.ts      # Discord webhook client
│   │   └── prisma.ts       # Prisma client
│   ├── swaggers/           # OpenAPI YAML definitions
│   ├── utils/              # Utility functions
│   │   ├── crypto.ts       # Encryption/decryption
│   │   ├── error.ts        # Error handler
│   │   ├── exception.ts    # Custom exceptions
│   │   ├── retry.ts        # Retry logic
│   │   ├── system.ts       # System utilities
│   │   └── tryCatchAsync.ts # Async error wrapper
│   └── index.ts            # Application entry point
├── package.json
├── tsconfig.json
└── prisma.config.ts
```

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone git@github.com:ledinhhuy1811/nodejs-boilerplate.git
   cd nodejs-boilerplate
   ```

2. **Install dependencies**

   ```bash
   yarn install
   # or
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   # Environment
   NODE_ENV=development
   PORT=8000

   # Database
   DATABASE_URL=postgresql://admin:root@localhost:5432/nodejs_boilerplate_db

   # Blockchain (Oraichain)
   ORAI_RPC_URL=http://rpc.orai.io

   # Security
   ENCRYPTED_MNEMONIC=your_encrypted_mnemonic_here
   PASSWORD=your_decryption_password_here
   API_KEY=your_api_key_here

   # Discord
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your_webhook_url
   ```

4. **Start the database**

   ```bash
   yarn db:start
   ```

5. **Run database migrations**

   ```bash
   yarn db:migrate
   ```

6. **Generate Prisma client**
   ```bash
   yarn db:generate
   ```

## ⚙️ Configuration

### Environment Variables

| Variable              | Description                               | Required | Default            |
| --------------------- | ----------------------------------------- | -------- | ------------------ |
| `NODE_ENV`            | Environment (production/development/test) | Yes      | -                  |
| `PORT`                | Server port                               | No       | 8000               |
| `DATABASE_URL`        | PostgreSQL connection string              | Yes      | -                  |
| `ORAI_RPC_URL`        | Oraichain RPC endpoint                    | No       | http://rpc.orai.io |
| `ENCRYPTED_MNEMONIC`  | Encrypted blockchain mnemonic             | Yes      | -                  |
| `PASSWORD`            | Password for mnemonic decryption          | Yes      | -                  |
| `API_KEY`             | API key for authentication                | Yes      | -                  |
| `DISCORD_WEBHOOK_URL` | Discord webhook URL for notifications     | Yes      | -                  |

### Encrypting Mnemonic

Use the crypto utility to encrypt your mnemonic:

```typescript
import { encrypt } from "./src/utils/crypto";

const encrypted = encrypt("your-password", "your-mnemonic-phrase");
console.log(encrypted); // Use this in ENCRYPTED_MNEMONIC
```

## 🚀 Running the Application

### Development Mode

```bash
yarn start:dev
# or
npm run start:dev
```

### Production Mode

```bash
yarn build
yarn start
# or
npm run build
npm start
```

### Health Check

Once the server is running, check the health endpoint:

```bash
curl http://localhost:8000/health
```

## 📚 API Documentation

Swagger UI is available at:

```
http://localhost:8000/v1/docs/api
```

The API documentation is defined in YAML files under `src/swaggers/` and automatically merged with the Swagger configuration.

## 🗄️ Database Management

### Start Database

```bash
yarn db:start
```

### Stop Database

```bash
yarn db:stop
```

### Create Migration

```bash
yarn db:migrate
```

### Deploy Migrations (Production)

```bash
yarn db:deploy
```

### Generate Prisma Client

```bash
yarn db:generate
```

## 📝 Available Scripts

| Script             | Description                        |
| ------------------ | ---------------------------------- |
| `yarn start`       | Start the application (production) |
| `yarn start:dev`   | Start with nodemon (development)   |
| `yarn build`       | Build TypeScript to JavaScript     |
| `yarn db:start`    | Start PostgreSQL Docker container  |
| `yarn db:stop`     | Stop PostgreSQL Docker container   |
| `yarn db:generate` | Generate Prisma client             |
| `yarn db:migrate`  | Create and apply migrations        |
| `yarn db:deploy`   | Deploy migrations (production)     |

## 🏗️ Architecture

### MVC Pattern

- **Models**: Prisma schema definitions
- **Views**: JSON API responses
- **Controllers**: Handle HTTP requests/responses
- **Services**: Business logic layer

### Middleware Stack

1. Morgan (HTTP logging)
2. Helmet (Security headers)
3. CORS (Cross-origin resource sharing)
4. Body parsers (JSON, URL-encoded)
5. Compression (Gzip)
6. Cookie parser
7. Routes
8. Error handler

### Error Handling

- Custom `HttpException` class for structured errors
- Centralized error handler middleware
- `tryCatchAsync` wrapper for async route handlers

### Logging

- Winston logger with daily rotation
- Logs stored in `logs/application-YYYY-MM-DD.log`
- Console output with colorization
- Automatic log compression and retention (14 days)

### Retry Logic

- Built-in retry utility with configurable attempts (default: 3)
- Automatic exponential backoff (2 seconds between retries)
- Error logging for each retry attempt

Use the retry utility:

```typescript
import { retryFunction } from "./utils/retry";

const error = await retryFunction(async () => {
  // Your async operation
  await someAsyncOperation();
});
```

## 🔐 Authentication

The boilerplate includes API key authentication middleware. Protect routes by adding the middleware:

```typescript
import authMiddleware from "../app/middlewares/auth.middleware";

router.post("/protected", authMiddleware.verifyApiKey, controller.handler);
```

Include the API key in request headers:

```
api-key: your_api_key_here
```

## 🌐 Blockchain Integration

The application includes Cosmos SDK integration for Oraichain:

- **Cosmos Client**: Automatically connects on server startup
- **Wallet Management**: Encrypted mnemonic with password-based decryption
- **Balance Checking**: Automatic balance verification on connection
- **Chain ID Validation**: Ensures correct network connection

Access the client globally:

```typescript
import { cosmosClient, cosmosAddress } from "./services/cosmosClient";
```

## 🔔 Discord Notifications

The application includes Discord webhook integration for sending notifications:

- **Webhook Client**: Automatically connects on server startup
- **Rich Embeds**: Color-coded notifications (info, error, warning)
- **Server Context**: Includes environment information in notifications

Send notifications:

```typescript
import { sendDiscordNotification } from "./services/discord";

await sendDiscordNotification(
  "Alert Title",
  "Alert description",
  "Additional content",
  "error" // or "info" | "warning"
);
```

Access the client globally:

```typescript
import { discordClient } from "./services/discord";
```

## 📦 Database Schema

### User Model

```prisma
model user {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🧪 Example API Usage

### Create User

```bash
curl -X POST http://localhost:8000/v1/user \
  -H "Content-Type: application/json" \
  -H "api-key: your_api_key_here" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

## 🔒 Security Features

- **Helmet**: Sets various HTTP headers for security
- **CORS**: Configurable cross-origin resource sharing
- **API Key Authentication**: Protect routes with API keys
- **Encrypted Mnemonics**: Secure blockchain wallet storage
- **Input Validation**: Joi-based environment validation

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 👤 Author

**ledanghuy1811**

- Email: huygamo567@gmail.com
- GitHub: [@ledinhhuy1811](https://github.com/ledinhhuy1811)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/ledinhhuy1811/nodejs-boilerplate/issues).

## 📝 Notes

- Prisma client is generated to `generated/prisma/` directory
- Logs are automatically rotated daily and compressed
- BigInt values are automatically serialized to strings in JSON responses
- The application gracefully handles SIGTERM and SIGINT signals for clean shutdowns
- Discord webhook client connects automatically on server startup
- Retry utility provides resilient error handling for async operations
