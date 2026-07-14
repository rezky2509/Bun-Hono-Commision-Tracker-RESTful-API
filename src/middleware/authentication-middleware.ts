// Import From Hono
import { createMiddleware } from "hono/factory";

// Better Auth Configuration 
// import { auth } from "../utils/auth_postgresql";

// SQL Lite
import {auth} from '../utils/auth'

// Environment variable
import { HonoEnv } from "../types/types";

// We custom the middleware for integrating with Better Auth. Only Allow them that had 
// user current session

export const authMiddleWare = createMiddleware<HonoEnv>(async(context,next)=>{
    // Fetch Session 
    const session = await auth.api.getSession({
        headers: context.req.raw.headers
    })

    // Check using getSession or not. OR need to be specific
    // Check session if exist
    if(!session){
        console.log('Session not valid')
        return context.json({
            error: 'Unauthorized Acess'
        },401)
    }   

    context.set('user',session?.user);
    context.set('session',session?.session);
    return next()
})
