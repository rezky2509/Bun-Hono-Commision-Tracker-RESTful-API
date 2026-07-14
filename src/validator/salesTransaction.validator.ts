import {zValidator} from '@hono/zod-validator'
import {z} from 'zod'


// https://zod.dev/api?id=iso-dates#iso-dates
// The support date format "YYYY/MM/DD"

export const CREATE_SALES_SCHEMA = z.object({
    student_name: z.string().min(5,"5 Character minimum for student name"),
    agent_name: z.string().min(5,"5 Character minimum for agent name"),
    agent_code:  z.string().min(1,"1 Character minimum for agent code"),
    // Need to update to support format DD/MM/YYYY
    transaction_date: z.coerce.date(),
    target_account: z.string(),
    gross_payment: z.number('Please enter number only')
})


// Not using object because we only need as one string to receive 
export const MONTH_VALIDATOR = z.string().regex(/^(0[1-9]|1[0-2])$/, "Invalid month format")
export const YEAR_VALIDATOR = z.string().regex(/^\d{4}$/,'Invalid Year.')


// Infer as zod validator
export const createSalesValidator = zValidator('json',CREATE_SALES_SCHEMA,
    (result,context)=>{
        // if the parsing failed
        if(!result.success){
            console.log('The error')
            // Bug on the Error Collector sending as Null 
            return context.json({
                error: result.error.issues.map((error)=>
                    // When using arrow functions with curly braces, you need an explicit return statement.
                    error.message
                ),
            },400)
        }
    }
)

export type createSales = z.infer<typeof CREATE_SALES_SCHEMA>


