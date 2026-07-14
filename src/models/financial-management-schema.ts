// PostgreSQL Schema
// import { pgTable, varchar, decimal,date, uuid, timestamp} from "drizzle-orm/pg-core";

// export const agentsTable = pgTable('agents',{
//     id: uuid('id').primaryKey().defaultRandom(),
//     agent_code: varchar({length: 10}).notNull().unique(),
//     full_name: varchar({length:255}),
//     team_type: varchar({length: 20})
// })

// export const studentsTable = pgTable('students',{
//     id: uuid('id').primaryKey(),
//     full_name: varchar({length: 255})
// })

// export const salesTransactions = pgTable('sales_transactions',{
//     id: uuid('id').primaryKey().defaultRandom(),
//     agent_id: uuid().references(()=>agentsTable.id).notNull(),
//     student_id: uuid('student_id').references(()=>studentsTable.id).notNull(),
//     target_account: varchar({length: 50}),
//     gross_amount: decimal({precision: 10,scale:2}),
//     transaction_date: date(),
//     created_at: timestamp().defaultNow()
// })

// export const payoutsDiscrepancies = pgTable('payouts_discrepancies',{
//     id: uuid('id').primaryKey().defaultRandom(),
//     transaction_id: uuid('transaction_id').references(()=>salesTransactions.id),
//     calculated_commission: decimal({precision: 10,scale:2}),
//     actual_amount_paid: decimal({precision: 10,scale:2}),
//     variance_delta: decimal({precision: 10,scale:2}),
//     created_at: timestamp().defaultNow()
// })

// SQL Lite Schema

import { real, sqliteTable, text, integer} from "drizzle-orm/sqlite-core";

export const agentsTable = sqliteTable('agents',{
    id: text().primaryKey().unique(),
    agent_code: text({length: 10}).notNull().unique(),
    full_name: text({length:255}),
    team_type: text({length: 20})
})

export const studentsTable = sqliteTable('students',{
    id: text().primaryKey(),
    full_name: text({length: 255})
})

export const salesTransactions = sqliteTable('sales_transactions',{
    id: text().primaryKey(),
    agent_id: text().references(()=>agentsTable.id).notNull(),
    student_id: text('student_id').references(()=>studentsTable.id).notNull(),
    target_account: text(),
    gross_amount: real(),
    transaction_date: integer({mode:'timestamp'}),
    created_at: integer({mode:'timestamp'})
})

export const payoutsDiscrepancies = sqliteTable('payouts_discrepancies',{
    id: text().primaryKey(),
    transaction_id: text('transaction_id').references(()=>salesTransactions.id),
    calculated_commission: real(),
    actual_amount_paid: real(),
    variance_delta: real(),
    created_at: integer({mode:'timestamp'})
})