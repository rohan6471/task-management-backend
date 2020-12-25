'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up () {
    this.create('tasks', (table) => {
      table.increments()
     
      table.string('taskName').notNullable()
      table.string('description').notNullable()
      table.string('status').notNullable()
      table.string('assignedTo').notNullable()
      table.date('startDate').notNullable()
      table.date('expectedEndDate').notNullable()
      table.string('files', 60)
      table.integer('projectId').unsigned().notNullable()
      table.foreign('projectId').references('projects.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
