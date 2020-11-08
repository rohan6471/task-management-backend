'use strict'
const Project = use('App/Models/Project');
const Student = use('App/Models/User');
const UserProject = use('App/Models/UserProject');
const _ = use("lodash");
class ProjectController {
//Add Project 
async createProject({ request,params, response }) {
  console.log("create projectttt")
  const userProject = {}
  console.log(request.all())
  const k = request.all()
   
      const savedStudent = await Project.findOrCreate(request.all());
      console.log(savedStudent.toJSON())
      const student = await Student.query()
        
      .where('firstName', k.assignTo)
      
      .fetch();
      console.log(student.toJSON())
        userProject.projectId = savedStudent.toJSON().id
        userProject.userId = student.toJSON()[0].id
        await UserProject.create(userProject)


      return response.ok({
        status: 200,
        message: "project successfully",
    });

}
async getAllProjects({ params, response }) {
      console.log("cameeee")
     const project = await Project.all()
      
     if (project == null) {
     // logger.error("StudentController-getAllStudentsInAProgram, Students for the given program not found");
      return response.status(404).json({
        message: "Projects not found",
      });
    }

   // logger.debug("StudentController-getAllStudentsInAProgram, Succesfully retrived students for the given program");
    return response.json(project);
  }

  async getProject({ params, response }) {

    const project = await Project.query()
    
    .where('id', params.projectId)
    
    .fetch();
     
    if (project == null) {
    // logger.error("StudentController-getAllStudentsInAProgram, Students for the given program not found");
     return response.status(404).json({
       message: "Projects not found",
     });
   }

  // logger.debug("StudentController-getAllStudentsInAProgram, Succesfully retrived students for the given program");
   return response.json(project);
 }
 async updateProject({ params,request, response }) {
   console.log("entereed update")
  let projectUpdated = request.all();
  console.log(projectUpdated)
  let project = await Project.find(params.projectId);
  if (project == null) {
    logger.error("ProgramController-editProgram, Program not found");
    return response.status(404).json({
      error: {
        status: 401,
        message: "project not found",
      },
    });
  }
  project = _.merge(project, projectUpdated);
  //  program.updatedBy = auth.user.name;
    await project.save();
    return response.ok({
      status: 200,
      message: "project updated successfully",
      data : project
  });
   // return response.ok(project);
   
 }
 async searchProject({ params, request, response }) {
  console.log(params.searchCode)
// const queryParam = request.all();
let project;
// console.log(queryParam.search)
// if (queryParam && queryParam.search) {
  project = await Project.query()
     
      .where(function () {
          this.where('name', 'like', '%' + params.searchCode + '%')
              .orWhere('description', 'like', '%' + params.searchCode + '%')
      })
      .fetch();

return response.ok(project);
}

async deleteProject({ params, response }) {
  console.log("PROJECTSSS")
    const project = await Project.find(params.projectId);
    if (!project) {
        return response.notFound({
            status: 404,
            message: "project not found",
        });
    }

    await project.delete();
    return response.ok({
        status: 200,
        message: "project deleted successfully",
    });
}


}

module.exports = ProjectController
