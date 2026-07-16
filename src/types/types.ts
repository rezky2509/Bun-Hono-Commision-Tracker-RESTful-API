// Infer type to the schema
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

import type {agentsTable} from '../models/financial-management-schema';
import type {studentsTable} from '../models/financial-management-schema';
import type {salesTransactions} from '../models/financial-management-schema';
import type {payoutsDiscrepancies} from '../models/financial-management-schema';

import { Hono } from "hono";

import { auth } from "../utils/auth";

// Must use typeof because agentsTable is a VALUE
// This is a VARIABLE (created at runtime)
// export const agentsTable = mysqlTable('agents', { ... })
//     ↑ This is a VALUE

// Refer to schema to create type safety
export type NewAgents = InferInsertModel<typeof agentsTable>
// Refer to schema to select agent 
export type Agents = InferSelectModel<typeof agentsTable>

export type NewStudent = InferInsertModel<typeof studentsTable>
export type Students = InferSelectModel<typeof studentsTable>

export type NewSalesTransaction = InferInsertModel<typeof salesTransactions>
export type SalesTranscation = InferSelectModel<typeof salesTransactions>

export type NewPayoutDiscrepancies = InferInsertModel<typeof payoutsDiscrepancies>
export type PayoutDiscrepences = InferSelectModel<typeof payoutsDiscrepancies>


export interface salesTranscation {
    sales_transaction_id: string,
    agents_code: string,
    agents_name: string,
    transcation_date: Date,
    transaction_amount: number
}


export interface SalesPerWeekResponse <T>{
    success: boolean,
    status: "Found" | "Not Found",
    data?: T | T[]
}

// Hono TypeSaftety Environment Environment
export type HonoEnv = {
    Variables:{
        user: typeof auth.$Infer.Session.user | null,
        session: typeof auth.$Infer.Session.session | null
    }
}


export type notFound = {
    result: string
}
