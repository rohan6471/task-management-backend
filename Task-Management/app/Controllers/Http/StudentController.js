'use strict'
const Student = use('App/Models/User');
class StudentController {
    async createStudent({ request,params, response }) {
        // console.log("enterdsdfdfsdf")
        // console.log(request.all())
          const savedStudent = await Student.findOrCreate(request.all());
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
