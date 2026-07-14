import { Hono } from "hono";
import { fetchAgentByName, fetchAgents, paginateResult } from "../service/agent.service";
import { HonoEnv } from "../types/types";
import { authMiddleWare } from "../middleware/authentication-middleware";

// Use the Middleware


// Make sure every request must go through the environment Variable Validation 
export const agentController = new Hono<HonoEnv>()

agentController.use(authMiddleWare)


// Temporary for only
// Soon redis implementation
agentController.get('/agents',async(c)=>{

  const result = await fetchAgents()

  return c.json({
    result
  },200)

  // This endpoint only accept one Query

  // Check if the user send a query 
  // use desctructure to assign individual value
  // const {page, name} = c.req.query()

  // console.log(`Page ${page}`)
  // console.log(`Name ${name}`)
  
  // // if both query does not exist 
  // if(!page && !name){
  //   return c.json({
  //     error: 'Bad Request. Please enter valid query'
  //   },400)
  // }

  // if(page){
  //   const convertedQuery : number = parseInt(page)
  //   if(isNaN(convertedQuery!)){
  //     return c.json({
  //       error: 'Bad Request. Only accept number'
  //     },400)
  //   }
  //   const agentResult = await paginateResult(convertedQuery)
  //   return c.json({
  //     result: agentResult
  //   })
  // }

  // if(name){
  //   const agentNameResult = await fetchAgentByName(name)
  //   return c.json({
  //     result: agentNameResult
  //     },200)
  // }

  // if(queryParamsName){
  //   // If Query Params is exist 
  //   console.log("Query Exist")
  //   const resultBasedQuery = await fetchAgentByName(queryParams)
  //   return c.json({
  //     data: resultBasedQuery
  //   },200)
  // }
  
  // if(queryParams === 'page'){
    
  // }

})



