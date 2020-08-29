'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserProjectSchema extends Schema {
  up () {
    this.create('user_projects', (table) => {
     
       table.integer('userId')
      table.foreign('userId').references('users.userId').onDelete('cascade')
      table.integer('projectId')
      table.foreign('projectId').references('projects.projectId').onDelete('cascade') 
      table.timestamps()
    })
  }

  down () {
    this.drop('user_projects')
  }
}

module.exports = UserProjectSchema
