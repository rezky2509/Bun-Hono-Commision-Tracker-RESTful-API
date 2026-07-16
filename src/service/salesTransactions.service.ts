// Connection DB 
import {db} from '../database/connection_sqlite'

// Schema
import { NewSalesTransaction, SalesPerWeekResponse } from '../types/types'

// Table Model 
import { agentsTable, salesTransactions } from '../models/financial-management-schema'

// Student Service 
import { checkCurrentStudent, createStudent } from './student.service'
import { fetchAgentByName } from './agent.service'
import { createSales } from '../validator/salesTransaction.validator'

// Drizzle eq
import { and, desc, eq, like, sql } from 'drizzle-orm'

export const createNewSalesTransactions = async(body:createSales):Promise<boolean> => {
    // Validation had been checked at Hono Middleware

    // Map the student to match with the NewSalesTransaction 
    let data: NewSalesTransaction = { 
        id: crypto.randomUUID(),       
        agent_id: "",
        student_id: "",
        transaction_date: new Date(body.transaction_date),
        target_account: body.target_account,
        gross_amount: body.gross_payment,
        created_at: new Date(new Date())
    }

    // Checked if student exist 
    // Fetch user id if student exist 
    const studentExistance = await checkCurrentStudent(body.student_name)
    console.log(`Date Transaction is ${body.transaction_date}`)
    if(!studentExistance){
        // Reegister student if not exist
        // Fetch it's id
        // Params is student names
        const getId = await createStudent(body.student_name)
        data.student_id = getId
    }else {
        data.student_id = studentExistance.id
    }

    // Check Agent Existance
    // Fetch agent id 
    const agentID = await fetchAgentByName(body.agent_name,body.agent_code)
    if(!agentID){
        // Should implement HTTP Return Exception
        // When agent is not exist
        return false
    }
    // Because it will return as an array
    data.agent_id = agentID[0].id
    
    console.log(data)

    // Map to contain the student id 
    const result = (await db.insert(salesTransactions).values(data).execute()).rowsAffected

    if(!result){
        // Should return HTTP Return Exception
        return false
    }

    return true
}

export const getSalesTransaction = async(page:number, month?:string, year?:string) => {
    // Limit per page only 10 data
    const pageSize:number = 10

    // The data store as UNIX TimeStamp

    // In-progress
    const conditions = []
    if(month){
        conditions.push(
            // 'unixepoch' tells SQLite the column holds numeric seconds.
            // SQLite strftime returns values like '01' to '12' as text strings
            // THERE IS A SECURITY ISSUE WHERE SQL INJECTION CAN HAPPEN
            // SINCE USING RAW SQL (only allow two string)
            sql`strftime('%m', ${salesTransactions.transaction_date}, 'unixepoch') = ${month}`
            // like(salesTransactions.transaction_date, monthQuery)
            // like(salesTransactions.transaction_date,unixFormatMonth)
        )
    }

    if(year){
        conditions.push(
            sql`strftime('%Y', ${salesTransactions.transaction_date}, 'unixepoch') = ${year}`
        )
    }

    const result = await db.select({
        transcation_id: salesTransactions.id,
        agent_code: agentsTable.agent_code,
        agent_name: agentsTable.full_name,
        transaction_amount: salesTransactions.gross_amount,
        target_account: salesTransactions.target_account,
        transaction_date: salesTransactions.transaction_date,
        team: agentsTable.team_type
    }).from(salesTransactions)
    .innerJoin(agentsTable,eq(agentsTable.id,salesTransactions.agent_id))
    // If month exist or not null
    // push the object as spread operator
    // The spread operator (...) unpacks or "pours out" the contents of your array directly into the function arguments:
    .where(and(...conditions))
    .orderBy(desc(salesTransactions.created_at))    
    .limit(pageSize).offset((page-1)*pageSize)

    // counting based on month
    const totalRow = await db.$count(salesTransactions,
        // The spread operator (...) unpacks or "pours out" the contents of your array directly into the function arguments:
        and(...conditions)
    )

    return {
        data: result,
        page,
        pageSize,
        totalPage: Math.ceil(totalRow/pageSize),
        totalData: totalRow
    }
}

export const getSalesTransactionWeekly = async(year:string, month:string, week?:string) : Promise<SalesPerWeekResponse<NewSalesTransaction>>=>{
    // console.log(`${year}-${month}`)
    const filterInput = `${year}-${month}`
    console.log(filterInput)
    console.log(`Week is ${week}`)

    // Go through Validation of the week, year and month
    
    const result = await db.select()
    .from(salesTransactions)
    .where(
        sql`strftime('%Y-%m',datetime(${salesTransactions.transaction_date},'unixepoch')) = ${filterInput}
            AND strftime('%W',datetime(${salesTransactions.transaction_date},'unixepoch')) = ${week}`
    ).orderBy(desc(salesTransactions.transaction_date)).execute()

    // unixepoch the date format stored on the database
    if(!result.length){
        return {
            success: false,
            status:"Not Found"
        }
    }

    return {
        success: true,
        status: "Found",
        data: result
    }
}