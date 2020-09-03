'use strict'
const Student = use('App/Models/User');
class StudentController {
    async createStudent({ params, response }) {
        const input = request.all();
        const rules = {
            id: "required",
            firstName: "required",
            lastName: "required",
            email: "required",
            startTerm: "required",
            category: "required",
            programId: "required",
          };
    
          const validation = await validateAll(input, rules);
          if (validation.fails()) {
            return response.status(401).json({
              error: {
                status: 401,
                message: "bad request, missing some required properties",
                fields: validation.messages(),
              },
            });
          }
          const savedStudent = await User.findOrCreate(input);
          return response.ok({
            status: 200,
            message: "student created successfully",
        });
    
    }
    async getAllStudents({ params, response }) {
    
         const student = await Student.all()
          
         if (student == null) {
         // logger.error("StudentController-getAllStudentsInAProgram, Students for the given program not found");
          return response.status(404).json({
            message: "students not found",
          });
        }
    
       // logger.debug("StudentController-getAllStudentsInAProgram, Succesfully retrived students for the given program");
        return response.json(student);
      }
    async deletetStudent({ params, response }) {
        const student = await Student.find(params.studentId);
        if (!project) {
            return response.notFound({
                status: 404,
                message: "Student not found",
            });
        }
    
        await student.delete();
        return response.ok({
            status: 200,
            message: "Student deleted successfully",
        });
    }
}

module.exports = StudentController
