'use strict'
const Project = use('App/Models/Project');
class ProjectController {
//Add Project 
async createProject({ request,params, response }) {
  console.log("create projectttt")
  console.log(request.all())
   
      const savedStudent = await Project.findOrCreate(request.all());
      return response.ok({
        status: 200,
        message: "project successfully",
    });

}
async getAllProjects({ params, response }) {

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
async deleteProject({ params, response }) {
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
