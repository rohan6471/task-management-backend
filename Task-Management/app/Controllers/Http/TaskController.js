'use strict'
const Project = use('App/Models/Task');
class TaskController {
    async createTask({ params, response }) {
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
          input.projectId = params.programId
          const savedTask = await Task.findOrCreate(input);
          return response.ok({
            status: 200,
            message: "Task created successfully",
        });
    
    }
    async getAllTasks({ params, response }) {
    
         const tasks = await Task.query()
         .where('programId', params.programId)
         
         .fetch();
          
         if (tasks == null) {
         // logger.error("StudentController-getAllStudentsInAProgram, Students for the given program not found");
          return response.status(404).json({
            message: "Tasks not found",
          });
        }
    
       // logger.debug("StudentController-getAllStudentsInAProgram, Succesfully retrived students for the given program");
        return response.json(tasks);
      }
    async deletetTask({ params, response }) {
        const task = await Task.query()
        .where('taskId', params.taskId)
        
        .fetch();
        if (!project) {
            return response.notFound({
                status: 404,
                message: "Task not found",
            });
        }
    
        await task.delete();
        return response.ok({
            status: 200,
            message: "Task deleted successfully",
        });
    }
    
    
    }


module.exports = TaskController
