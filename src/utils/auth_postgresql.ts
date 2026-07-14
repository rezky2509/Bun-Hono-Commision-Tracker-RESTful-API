// Better Auth Configuration 

// import {betterAuth} from 'better-auth'
// import {drizzleAdapter} from 'better-auth/adapters/drizzle';
// import  {databaseConnection}  from '../database/connection_postgresql';
// import { openAPI } from "better-auth/plugins"

// export const auth = betterAuth({
//     database: drizzleAdapter(databaseConnection,{
//         provider: "pg",
//     }),
//     plugins:[
//         openAPI()
//     ],
//     baseURL: process.env.BETTER_AUTH_URL,
//     emailAndPassword: { 
//         enabled: true, 
//     }, 
// })