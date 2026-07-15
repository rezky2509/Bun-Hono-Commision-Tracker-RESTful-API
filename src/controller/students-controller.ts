import { Hono } from "hono";
import { HonoEnv } from "../types/types";
import { authMiddleWare } from "../middleware/authentication-middleware";
import { getAllStudents } from "../service/student.service";

export const studentsController = new Hono<HonoEnv>()

studentsController.use(authMiddleWare)

// As data grows, it can get tricky. 
// Need to use redis
studentsController.get('/students',async(c)=>{
    const result = await getAllStudents()

    return c.json(result,200)
})