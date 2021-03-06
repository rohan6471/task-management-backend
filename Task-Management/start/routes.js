'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
|
| Https routes used too authenticate user login and logout
| 
*/
Route.group(() => {
 
 
  Route.post('/login', 'UserController.login');
  Route.post('/forgotPassword', 'UserController.forgotPassword');
  Route.post("/newpassword", "UserController.newPassword")
  Route.get("logout", "UserController.logout");
}).prefix("/taskmanagement/api/auth");
/*
|--------------------------------------------------------------------------
| Project Routes
|--------------------------------------------------------------------------
|
| Https routes used too authenticate user login and logout
| 
*/
Route.group(() => {
  Route.post("/createProject", "ProjectController.createProject")
  Route.get("/getProjects", "ProjectController.getAllProjects")
  Route.get("/getProject/:projectId", "ProjectController.getProject")
  Route.get("/search/:searchCode", "ProjectController.searchProject")
  Route.get("/deleteProject/:projectId", "ProjectController.deleteProject")
  Route.post("/updateProject/:projectId", "ProjectController.updateProject")
  Route.post("/upload/:projectId", "ProjectController.upload")
  Route.get("/download/:projectId", "ProjectController.download")
}).prefix("/taskmanagement/api/project")//.middleware("auth");

/*
|--------------------------------------------------------------------------
| Tasks Routes
|--------------------------------------------------------------------------
|
| Https routes used too authenticate user login and logout
| 
*/
Route.group(() => {
  Route.post("/createTask", "TaskController.createTask")
  Route.get("/getTasks/:ProjectId", "TaskController.getAllTasks")
  Route.get("/search/:projectId/:searchCode", "TaskController.searchTask")
  Route.get("/deleteTask/:taskId", "TaskController.deletetTask")
  Route.get("/getTask/:taskId", "TaskController.getTask")
  Route.get("/getUserTask/:projectId/:userId", "TaskController.getUserTask")
  Route.get("/updateStatus/:id/:taskStatus", "TaskController.updateTaskstatus")
  Route.post("/updateTask/:taskId", "TaskController.updateTask")
}).prefix("/taskmanagement/api/task").middleware("auth");

/*
|--------------------------------------------------------------------------
| Student Routes
|--------------------------------------------------------------------------
|
| Https routes used too authenticate user login and logout
| 
*/
Route.group(() => {
  Route.post("/addStudent", "StudentController.createStudent")
  Route.get("/getStudents", "StudentController.getAllStudents")
  Route.get("/getStudent/:studentId", "StudentController.getStudent")
  Route.get("/search/:searchCode", "StudentController.searchStudent")
  Route.get("/userProjects/:studentId", "StudentController.getUserProjects")
  Route.post("/updateStudent/:studentId", "StudentController.updateStudent")
  Route.get("/deleteStudent/:studentId", "StudentController.deletetStudent")
}).prefix("/taskmanagement/api/student").middleware("auth");




