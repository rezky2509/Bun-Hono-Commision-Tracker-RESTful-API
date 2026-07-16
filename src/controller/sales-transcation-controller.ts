import { Hono } from "hono";

import { HonoEnv } from "../types/types";

import {authMiddleWare} from '../middleware/authentication-middleware'
import { createSales, createSalesValidator, MONTH_VALIDATOR, YEAR_VALIDATOR } from "../validator/salesTransaction.validator";
import { createNewSalesTransactions, getSalesTransaction, getSalesTransactionWeekly } from "../service/salesTransactions.service";


export const salesTransactionController = new Hono<HonoEnv>()

salesTransactionController.use(authMiddleWare)

salesTransactionController.post('/sales',createSalesValidator,async(c)=>{
    // The middleware of zod will check first if the body validator passed or not 
    const body = await c.req.json() as createSales

    const dbResult = await createNewSalesTransactions(body)
    return c.json({
        result: dbResult
    },201)
})


salesTransactionController.get('/sales',async(c)=>{
    // console.log('Getting Sales')
    // 1. Change c.req.queries() to c.req.query()
    // const { page, month } = c.req.query()
    const page = c.req.query('page')
    const month = c.req.query('month')
    const year = c.req.query('year')

    // Now page and month are single strings (or undefined)
    const pageParam: number = parseInt(page ? page : "1", 10)

    // Month only accepted 01 - 12. Value under 10, need to add 0
    // Check month value 
    if(month){
    const monthValidate = MONTH_VALIDATOR.safeParse(month)
        if(monthValidate.success===false){
            console.log("Month is not valid")
            return c.json({
                error: monthValidate.error.issues.map((issue)=>issue.message)
            },400)
        }
    }


    // Filter based on year
    if(year){
        const validateYear = YEAR_VALIDATOR.safeParse(year)
        if(!validateYear.success){
            return c.json({
                error: validateYear.error.issues.map((issue)=>issue.message)
            },400)
        }
    }

    // New Feature sort by highest gross
    

    if(!month){
        const result = await getSalesTransaction(pageParam)
        return c.json({
            result
        },200)
    }


    // Filters by Years, And Month. So every week 


    // If months exist, 
    const result = await getSalesTransaction(pageParam,month)
    return c.json({
        result
    },200)
})


salesTransactionController.get('/sales/weekly',async(c)=>{
    const {year,month,week} = await c.req.query()
    const result = await getSalesTransactionWeekly(year,month,week)
    return c.json(result,200)
})
