'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
    static get primaryKey(){
        return "userId";
        
    }
    user_project(){
        return this.belongsToMany("App/Models/Project", "projectId", "userId", "projectId", "userId")
            .pivotTable("user_projects")
    }
}

module.exports = User
