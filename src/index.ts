import { Hono } from 'hono'
// import { poolConnection } from './database/connection'
// import { auth } from './utils/auth_postgresql'
import { auth } from './utils/auth'

import {Scalar} from '@scalar/hono-api-reference'

import {cors} from 'hono/cors'
import { salesTransactionController } from './controller/sales-transcation-controller'
import { studentsController } from './controller/students-controller'
import { agentController } from './controller/agent-controller'


const app = new Hono()

// Serve OpenAPI spec
// Read the file as JSON first
app.get('/openapi.json', async (c) => {
  const spec = await Bun.file('./docs/financial-management.json').text()
  return c.json(JSON.parse(spec))
})

// Then read as openapi standard
app.get('/apiSpecs',Scalar({
    url:'/openapi.json',
    theme: 'purple',
    pageTitle: 'Financial Management API Documentation'
}))


// The database connection will run once this endpoint is called
// You need to register the endpoint AFTER the .on and use .route
app.
    on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw))
    // If the user is verified and authorized, user will able to go to this route
    // You can chain the route definition
    .route('/api/v1/',agentController)
    .route('/api/v1/',salesTransactionController)
    .route('/api/v1/',studentsController)
    // No need
    // .get('/',async(c)=>{
    //     return c.text('Hai from hono')
    // })


// Cors Protection
// Protect all endpoint
app.use('/api/auth/*',
    cors({
        origin: ['http://localhost:3060','http://localhost:3000'],
        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: ["POST","GET"],
        maxAge: 600,
        // Need to signup first
        credentials: true
    })
)

export default {
  port: 3060,
  fetch: app.fetch,
  request: app.request
}