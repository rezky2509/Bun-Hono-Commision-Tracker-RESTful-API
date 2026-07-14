To use the open api 
https://better-auth.com/docs/plugins/open-api

Then go to 
http://localhost:3060/api/auth/reference


How the drizzle orm and better auth pool connection work 
SERVER STARTUP:
├─ connection.ts loads
│  ├─ pool = new Pool() ✅ Connection created
│  └─ databaseConnection = drizzle(pool) ✅ ORM initialized
├─ auth.ts loads
│  └─ auth = betterAuth({database: databaseConnection}) ✅ Auth ready
└─ main.ts loads
   └─ app.on("/api/auth/*", ...) ✅ Routes registered

SERVER RUNNING:
Client requests → /api/auth/sign-in
  → auth.handler() is called
    → auth needs user → queries databaseConnection
      → Query runs on the pool
        → Database responds
          → Response sent to client

1️⃣ Loading connection.ts
2️⃣ Pool created
3️⃣ Drizzle initialized
4️⃣ Loading auth.ts
5️⃣ Auth initialized
6️⃣ Server starting
8️⃣ Routes registered

With Bun, it module loading 
main.ts
  ↓ load the imports
auth.ts
  ↓ load the imports
connection.ts
  ↓ executes module code
pool = new Pool() ✅
databaseConnection = drizzle(pool) ✅
  ↓ (back to auth.ts)
auth = betterAuth({database: databaseConnection}) ✅
  ↓ (back to main.ts)
Server starts ✅

To run multiple schema
on drizzle-config
schema: ['./src/models/auth-schema.ts','./src/models/financial-management-schema.ts'],
define the directory
OR 
One Schema, within the file 
// 1. Declare your separate database schemas
export const authSchema = pgSchema('auth');
export const businessSchema = pgSchema('business');
then define the schema 
export const orders = businessSchema.table('orders', {
  id: serial('id').primaryKey(),
  amount: text('amount').notNull(),
});
export const users = authSchema.table('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
});


Validating Request 
Hono have integration with zod validator
bun add zod @hono/zod-validator 


SQL LITE CONFIGURATION
    database: drizzleAdapter(db,
      {provider:"sqlite",
        // Crucial. You need to explicitly stated this schema 
        schema
      }
    ),

        advanced:{
      database:{
        generateId:() => crypto.randomUUID() 
      }
    }

DRIZZLE-SEEDER
Currently Does not work for SQLIte. Only POSTGRESQL