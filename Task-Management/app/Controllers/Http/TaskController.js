'use strict'
const Task = use('App/Models/Task');
const _ = use("lodash");
class TaskController {
    async createTask({ request,params, response }) {
      console.log("enteredd camee into task controller")
      console.log(request.all())
        const input = request.all();

       
       
          const savedTask = await Task.findOrCreate(input);
          console.log(savedTask)
          return response.ok({
            status: 200,
            message: "Task created successfully",
        });
    
    }
    async updateTask({ params,request, response }) {
      console.log("entereed update")
     let projectUpdated = request.all();
     console.log(projectUpdated)
     let project = await Task.find(params.taskId);
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
         message: "Task updated successfully",
         data : project
     });
      // return response.ok(project);
      
    }
    async getAllTasks({ params, response }) {
    
         const tasks = await Task.query()
         .where('projectId', params.ProjectId)
         
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
      async getTask({ params, response }) {

        const project = await Task.query()
        
        .where('id', params.taskId)
        
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
     async getUserTask({ params, response }) {

      const project = await Task.query()
      
      .where('projectId', params.projectId)
      .where('assignedTo',params.userId)
      
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
   async updateTaskstatus({ request, response, auth,params }) {
    const task = await Task.find(params.id);
    task.status = params.taskStatus;
    await task.save()
   // const orderData = await Order.query().select('*').with('order_medicines').with('order_card').with('order_address').orderBy('created_at','desc').fetch();
    return response.json(task);
  //  const order = await Order.query().where("id", "=", params.orderId).with('order_medicines').with('order_card').with('order_address').fetch();
  
  //return response.json(order);
  }
    async deletetTask({ params, response }) {
      console.log("delete task camee")
        const task = await Task.find(params.taskId)
        if (!task) {
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

    async searchTask({ params, request, response }) {
      console.log(params.searchCode)
    // const queryParam = request.all();
    let project;
    // console.log(queryParam.search)
    // if (queryParam && queryParam.search) {
      project = await Task.query()
         
          .where(function () {
              this.where('projectId', '=',  params.projectId )
                  .andWhere('taskName', 'like', '%' + params.searchCode + '%')
          })
          .fetch();
    
    return response.ok(project);
    }
    
    
    }


module.exports = TaskController
