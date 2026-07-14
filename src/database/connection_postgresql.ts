// This the connection 

import {drizzle} from 'drizzle-orm/node-postgres'
import {Pool} from 'pg'
import * as schema from '../models/auth-schema_postgresql'
import * as financialSchema from '../models/financial-management-schema'


// console.log('Connecting to database')
// export const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     max: 10,
//     // If idle
//     idleTimeoutMillis: 30000
// })
// console.log('Pool connection')

// let flag:boolean = false

// First Tries Connecting to database 
// try{
//     const clientConnection = await pool.connect()
//     clientConnection.release() //Release Pool
//     console.log('Connected to Database')    
//     flag = true
// }catch(error){
//     console.error('Unable to connect to database. Retrying..')
//     flag = false

// }

// setTimeout is fire-and-forget
// setTimeout is a callback-based API, not a Promise-based one. It's part of JavaScript from way before 
// Promises and async/await even existed. What it returns is a Timeout object 
// setTimeout(callback, 5000) // returns a Timeout object, not a Promise
// That's why this code runs instantly. Because it return as AN OBJECT. NOT PROMISE
// await only knows how to pause for Promises.
//  It has no idea what to do with a raw Timeout object, so it doesn't pause at all.
// setTimeout does not return as promise 
// setTimeout(async()=>{
//     await pool.connect() 
// },5000) // Timeout object / number — NOT a Promise
// 

// Better version 
// const MAX_RETRIES = 5
// const RETRY_DELAY = 5000

// function sleep(ms:number):Promise<void>{
//     // A Promise is an object representing a value that doesn't exist yet, but will (or will fail to) at some point in the future. Think of it like a receipt or a tracking number — you get it immediately, but the actual "thing" (the resolved value) shows up later.
//     // A Promise has three possible states:

//     // pending — still waiting, not resolved or rejected yet
//     // fulfilled — finished successfully, has a value
//     // rejected — failed, has an error

//     // In short, Promises are the "future value" container
//     return new Promise((resolve)=>setTimeout(resolve,ms)) //Making sure that it return as promise 
//     // To ensure that the it only return as promise not fire and forget to run the resolve
//     // Which this case it run the callback of the resolve which is the datrabaseConnection function
// }

// async function checkDatabaseConnection():Promise<boolean>{
//     for(let attempt:number=1; attempt<=5; attempt++){
//         try {
//             const clientConnection = await pool.connect()
//             console.log('Connected to Database')
//             clientConnection.release()
//             return true
//         } catch (error) {
//             console.error(`Unable to connect to database (attempt ${attempt}/${MAX_RETRIES + 1})`);
//             if(attempt <= MAX_RETRIES){
//                 console.log(`Retrying in ${RETRY_DELAY/1000}s`)
//                 // This code To ensure this run DELAYING FIRST then loop to the second loop
//                 // Since sleep is PROMISE, it need to await for 5 seconds 
//                 await sleep(RETRY_DELAY)
//                 // Then it will loop again 
//             }
//         }
//     }
//     return false
// }

// async function callConnection(){
//     const connectionStatus = await checkDatabaseConnection()
//     if(!connectionStatus){
//         console.error('Unable to connect database. Please check database server status health')
//         process.exit(1)
//     }
// }

// callConnection()

// export const databaseConnection = drizzle(pool, {
//     // This params is where the schema list
//     schema, 
//     // the type for the naming scheme is snake case 
//     casing: 'snake_case'
// })

