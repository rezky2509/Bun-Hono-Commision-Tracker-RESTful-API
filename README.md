# Sales & Commission Management System

A secure internal dashboard for automating sales transactions, calculating commissions, and managing financial reconciliation.

## Tech Stack

- **Runtime:** [Bun](https://bun.sh)
- **Framework:** [Hono](https://hono.dev)
- **Authentication:** [better-auth](https://better-auth.com)
- **Database:** SQLite
- **ORM:** [Drizzle](https://orm.drizzle.team)

## Quick Start

### Prerequisites
- Bun (v1.0+)
- Node.js types: `@types/node`

### Setup

```bash
# Clone & install
git clone <repo-url>
cd sales-commission-system
bun install
bun add --dev @types/node

# Configure environment
cp .env.example .env

# Run migrations
bun --env-file=.env run drizzle-kit migrate

# Start dev server
bun run dev
```

## Features

- 📊 Daily transaction logging with automatic duplicate prevention
- 💰 Multi-tier commission calculation (50% Sales, 30% Agent)
- 🎯 Performance milestones & top performer tracking
- 📈 Weekly/monthly financial reconciliation
- 🔒 JWT authentication with role-based access
- 📝 Comprehensive audit trail & variance tracking

## Project Structure

```
src/
├── database/      # Drizzle migrations
├── schema/        # Database schema
├── routes/        # Hono route handlers
├── auth/          # better-auth setup
└── middleware/    # Custom middleware
```

## Key Business Rules

- **Commission Routing:** Sales Team (50%) | Agent Team (30%)
- **5K Milestone:** Auto-flag agents reaching RM 5,000 monthly sales
- **Top Performers:** Weekly/monthly top 3 earner tracking
- **Account Types:** Ex-Husband (weekly settlement) | Kak Asuh (central reserve)
- **Variance Tracking:** Records actual vs. calculated commission differences

## License

Internal use only - Confidential
