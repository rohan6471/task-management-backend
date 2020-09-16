'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
    static get primaryKey(){
        return "id";
        
    }
    user_project(){
        return this.belongsToMany("App/Models/Project", "id", "id", "id", "id")
            .pivotTable("user_projects")
    }
}

module.exports = User
