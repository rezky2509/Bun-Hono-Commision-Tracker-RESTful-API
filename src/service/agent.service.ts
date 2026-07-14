import { NewAgents } from "../types/types";
// import { databaseConnection } from "../database/connection_postgresql";
import { db } from "../database/connection_sqlite";
// The TS schema
import { agentsTable } from "../models/financial-management-schema";
import { and, count, eq, ilike, like, name } from "drizzle-orm";

// Filters
import { asc,sql } from "drizzle-orm";


export const fetchAgents = async()=> {

    const result = await db.select().from(agentsTable)
    if(result.length===0){
        return "No Agent Found"
    }
    return result
}


export const paginateResult = async(page:number)  => {

    // Return only as number
    // To set the type as number
    // const totalRow = await db.select({count: sql`count(*)`.mapWith(Number)}).from(agentsTable)
    // To return as single integer use $count
    const totalRow = await db.$count(agentsTable)
    // Limit 10 Result per page
    // OFFSET clause skips a specified number of rows before it begins returning data from a query. 
    const pageSize = 10
    const offset = (page - 1) * pageSize
    const result = await db.select().from(agentsTable).orderBy(asc(agentsTable.id)).limit(pageSize).offset(offset)
        return {
        data: result, 
        page: page,
        total_page: Math.ceil(totalRow/10),
        size: totalRow,
    }
}

export const fetchAgentByName = async(nameQuery:string,agentCode?:string)=>{
    const result = await db.select().from(agentsTable)
    .where(
        agentCode ? 
            and(like(agentsTable.full_name,nameQuery),like(agentsTable.agent_code,`%${agentCode}%`))
            : like(agentsTable.full_name,`%${nameQuery}%`)
    )
    if(!result){
        return null
    }

    return result
}


