'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
    static get primaryKey(){
        return "id";
    }
    task(){
         return this.hasMany("App/Models/Task", "id", "id"); 
    }
    project_user(){
        return this.belongsToMany("App/Models/User", "id", "id", "id", "id")
            .pivotTable("user_projects")
    }
}

module.exports = Project
