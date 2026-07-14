import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../database/connection_sqlite";
import {openAPI} from 'better-auth/plugins'

// Better auth Schema
import * as schema from '../models/auth-schema'

// Authentication Configuration For SQLite
export const auth = betterAuth({
  // For SQLITE only usecases
  // You need to defined the base url
    baseURL:'http://localhost:3060',
    database: drizzleAdapter(db,
      {provider:"sqlite",
        // Crucial. You need to explicitly stated the auth schema 
        schema
      }
    ),
    plugins:[
      openAPI()
    ],
    emailAndPassword:{
      enabled: true
    },
    advanced:{
      database:{
        // generateId:() => crypto.randomUUID() 
        generateId: 'uuid'
      }
    }
});