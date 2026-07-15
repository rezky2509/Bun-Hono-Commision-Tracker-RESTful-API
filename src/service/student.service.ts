// Connection to db 
import { db } from "../database/connection_sqlite";

// The table schema 
import { studentsTable } from "../models/financial-management-schema";

// Infer NewStudent
import { NewStudent } from "../types/types";

import { like } from "drizzle-orm";

export const createStudent = async(studentName:string) =>{

    // Map with NewStudent
    const mapToStudent: NewStudent = {
        id: crypto.randomUUID(),
        full_name : studentName
    }

    // Return as single 
    // Destructure
    const [result] = await db.insert(studentsTable).values(mapToStudent).returning()
    
    return result.id
}


export const checkCurrentStudent = async(studentName:string) =>{
    const [result] = await db.select().from(studentsTable).where(
        like(studentsTable.full_name,'%'+studentName+'%')
    )

    return result
}


export const getAllStudents = async() => {
    const result = await db.select({
        student_name: studentsTable.full_name,
        student_id: studentsTable.id
    }).from(studentsTable)

    return result
}