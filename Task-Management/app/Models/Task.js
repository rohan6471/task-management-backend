'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {
    static get primaryKey(){
        return "id";
    }
    project(){
        return this.belongsTo("App/Models/Project", "id", "id"); 
    }
}

module.exports = Task
