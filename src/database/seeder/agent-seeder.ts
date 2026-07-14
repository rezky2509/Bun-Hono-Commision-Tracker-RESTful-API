import {reset, seed} from 'drizzle-seed'
// import { databaseConnection } from '../connection_postgresql'
// import { db } from '../connection_sqlite'
// import { agentsTable } from '../../models/financial-management-schema.ts'
// import { agentsTable } from '../../models/financial-management-schema'


// Only Works for POSTGRESQL
// const seedAgents = async() => {
//     await seed(db,{agentsTable},{count:100})
// }

// const resetSeed = async()=>{
//     await reset(db,{agentsTable})
// }

// await seedAgents()

// // If no argument send 
// const argument = process.argv.slice(2)

// try{
//     if(argument.length === 0){
//         console.log('Length is zero')
//         await seedAgents()
//         process.exit(1)
//     }else if(argument.length !== 0){
//         await resetSeed()
//     }
// }catch(error){
//     console.error("No Argument")
// }
// process.exit(1)


// seed.ts
import { db } from "../connection_sqlite"; // Adjust this path to your connection file
import { agentsTable, studentsTable, salesTransactions } from "../../models/financial-management-schema"; 

// async function main() {
//   console.log("⏳ Seeding database...");

  // 1. Clean up existing data safely
  // await db.delete(salesTransactions);
  // await db.delete(agentsTable);
  // await db.delete(studentsTable);

  // 2. Insert Mock Agents
  // const agentIds = {
  //   alpha: crypto.randomUUID(),
  //   beta: crypto.randomUUID()
  // };

  // const mockAgents = Array.from({ length: 50 }, (_, index) => {
  //   const agentNumber = String(index + 1).padStart(3, '0'); // e.g., 001, 002, 050
    
  //   return {
  //     id: crypto.randomUUID(), // Generates a unique secure text ID
  //     agent_code: `AGT${agentNumber}`, // e.g., AGT001, AGT050 (satisfies unique constraint)
  //     full_name: `Agent Falcon ${index + 1}`,
  //     team_type: index % 2 === 0 ? "Direct" : "Referral" // Alternates team types
  //   };
  // });
  type agentJSON = {
    agent_code : string,
    agent_name : string
  }

  // Reading the Existing Agent Name
  console.log('Reading json')
  // Since it's still withinin the same directory, just call directly
  // ${import.meta.dir}/currentAgent.json
  // Reading the current directory
  const agentList = Bun.file('./src/database/seeder/currentSales.json')
  // Reading the list 
  const fileToText = await agentList.json()

  console.log('Seeding to Database')
  fileToText.forEach(async(agent: agentJSON)=>{
    await db.insert(agentsTable).values(
      {id: crypto.randomUUID(), agent_code: agent.agent_code, full_name: agent.agent_name}
    )
  })
    console.log("✅ Seeding completed successfully!");
  
  // await db.insert(agentsTable).values(fileToText)
  // await db.insert(agentsTable).values(mockAgents);

  // 3. Insert Mock Students
//   const studentId = crypto.randomUUID();
//   await db.insert(studentsTable).values([
//     { id: studentId, full_name: "John Doe" }
//   ]);

//   // 4. Insert Mock Sales Transactions
//   await db.insert(salesTransactions).values([
//     {
//       id: crypto.randomUUID(),
//       agent_id: agentIds.alpha,
//       student_id: studentId,
//       target_account: "ACC-12345",
//       gross_amount: 1500.50,
//       transaction_date: new Date(),
//       created_at: new Date()
//     }
//   ]);

//   console.log("✅ Seeding completed successfully!");
// }

// main()
//   .catch((err) => {
//     console.error("❌ Seeding failed:", err);
//     process.exit(1);
//   });