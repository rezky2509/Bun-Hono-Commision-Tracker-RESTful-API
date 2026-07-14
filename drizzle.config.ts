// import {defineConfig} from 'drizzle-kit'


// PostgreSQL
// export default defineConfig({
//     out: './src/database/',
//     // Run multiple schema
//     schema: ['./src/models/auth-schema.ts','./src/models/financial-management-schema.ts'],
//     dialect: 'postgresql',
//     dbCredentials:{
//         url: process.env.DATABASE_URL!
//     }
// })


// SQL Lite
import 'dotenv/config';
import {defineConfig} from 'drizzle-kit';

export default defineConfig({
    out:'./src/database',
    schema:['./src/models/financial-management-schema.ts','./src/models/auth-schema.ts'],
    dialect:'sqlite',
    dbCredentials:{
        url: process.env.DB_SQLITE!
    }
})
