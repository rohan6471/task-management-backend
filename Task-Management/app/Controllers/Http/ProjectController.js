'use strict'
const Project = use('App/Models/Project');
class ProjectController {
//Add Project 
async createProject({ params, response }) {
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
      const savedStudent = await Project.findOrCreate(input);
      return response.ok({
        status: 200,
        message: "project created successfully",
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
async deletetProject({ params, response }) {
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
