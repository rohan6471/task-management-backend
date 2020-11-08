'use strict'
const Student = use('App/Models/User');
const _ = use("lodash");
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

      async getStudent({ params, response }) {

        const student = await Student.query()
        
        .where('id', params.studentId)
        
        .fetch();
         
        if (student == null) {
        // logger.error("StudentController-getAllStudentsInAProgram, Students for the given program not found");
         return response.status(404).json({
           message: "Student not found",
         });
       }
    
      // logger.debug("StudentController-getAllStudentsInAProgram, Succesfully retrived students for the given program");
       return response.json(student);
     }
     async updateStudent({ params,request, response }) {
       console.log("entereed update")
      let studentUpdated = request.all();
      studentUpdated.role = "user"
     // console.log(studentUpdated)
      let student = await Student.find(params.studentId);
     // console.log(student)
      if (student == null) {
        logger.error("ProgramController-editProgram, Program not found");
        return response.status(404).json({
          error: {
            status: 401,
            message: "project not found",
          },
        });
      }
      console.log(student)
      console.log(studentUpdated)
      student = _.merge(student, studentUpdated);
      console.log("cameeeeeeeeeeeee")
      //  program.updatedBy = auth.user.name;
        await student.save();
        return response.ok({
          status: 200,
          message: "student updated successfully",
          data : student
      });
       // return response.ok(project);
       
     }
    async deletetStudent({ params, response }) {
        const student = await Student.find(params.studentId);
        if (!student) {
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
    async searchStudent({ params, request, response }) {
      console.log("entereddd")
      console.log(params.searchCode)
    // const queryParam = request.all();
    let student;
    if(params.searchCode== null){
      console.log("cameee")
    }
    // console.log(queryParam.search)
    // if (queryParam && queryParam.search) {
      student = await Student.query()
         
          .where(function () {
              this.where('firstName', 'like', '%' + params.searchCode + '%')
                  .orWhere('lastName', 'like', '%' + params.searchCode + '%')
          })
          .fetch();
    
    return response.ok(student);
    }
    
    async getUserProjects({ params, response }) {
      const student = await Student.query() .where('id', params.studentId).with("user_project").fetch();
      if (!student) {
        return response.notFound({
            status: 404,
            message: "Student not found",
        });
    }

   
    return response.ok({
        status: 200,
        data: student
    });

    }
}

module.exports = StudentController
