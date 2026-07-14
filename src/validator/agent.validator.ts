// Agent Table Validator for GET, INSERT, UPDATE and DELETE

import {zValidator} from '@hono/zod-validator'
import {z} from 'zod'


// Zod Schema 
// Implies for Insert and Update
export const createAgentSchema = z.object({
    agent_code: z.string().min(1,'Agent Code is Required'),
    full_name: z.string().min(5,'Minimum of 5 character'),
    team_type: z.string().min(1,'Minimum 1 character')
}).strict()

// Implies for delete
export const deleteAgentSchema = z.object({
    agent_code: z.string().min(1,'Agent Code is Required'),
    full_name: z.string().min(5,'Minimum of 5 character'),
}).strict()



// Inferring the zod type to be validator 
// If the parse is not success, it will return as context
export const createAgent = zValidator('json',
    createAgentSchema,
    (result, context)=>{
        // If parsing failed(success is failed)
        if(!result.success){
            return context.json({
                error: result.error.issues.map((error)=>{
                    error.message
                })
            },400)
        }
    }
)


export const deleteAgent = zValidator('json',
    createAgentSchema,
    (result, context)=>{
        // If parsing failed(success is failed)
        if(!result.success){
            return context.json({
                error: result.error.issues.map((error)=>{
                    error.message
                })
            },400)
        }
    }
)