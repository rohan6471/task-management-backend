'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
    static get primaryKey(){
        return "projectId";
    }
    task(){
         return this.hasMany("App/Models/Task", "projectId", "taskId"); 
    }
    project_user(){
        return this.belongsToMany("App/Models/User", "userId", "projectId", "userId", "projectId")
            .pivotTable("user_projects")
    }
}

module.exports = Project
