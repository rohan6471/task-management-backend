'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserProjectSchema extends Schema {
  up () {
    this.create('user_projects', (table) => {
     
      table.integer('userId').unsigned().notNullable()
      table.foreign('userId').references('users.id').onDelete('cascade')
      table.integer('projectId').unsigned().notNullable()
      table.foreign('projectId').references('projects.id').onDelete('cascade') 
      table.timestamps()
    })
  }

  down () {
    this.drop('user_projects')
  }
}

module.exports = UserProjectSchema
