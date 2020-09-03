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
  Route.post("/deleteProject/:projectId", "ProjectController.deletetProject")
  Route.post("/editProject/:projectId", "ProjectController.newPassword")
}).prefix("/taskmanagement/api/project");

/*
|--------------------------------------------------------------------------
| Tasks Routes
|--------------------------------------------------------------------------
|
| Https routes used too authenticate user login and logout
| 
*/
Route.group(() => {
  Route.post("/createTask/:projectId", "TaskController.createTask")
  Route.get("/getTasks/:ProjectId", "UserController.getAllTasks")
  Route.post("/deleteTask/:taskId", "UserController.deletetTask")
  Route.post("/editTask/:taskId", "UserController.newPassword")
}).prefix("/taskmanagement/api/task");

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
  Route.post("/updateStudent/:studentId", "StudentController.newPassword")
  Route.post("/deleteStudent/:studentId", "StudentController.deletetStudent")
}).prefix("/taskmanagement/api/student");




