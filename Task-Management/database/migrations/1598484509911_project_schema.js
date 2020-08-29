'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectSchema extends Schema {
  up () {
    this.create('projects', (table) => {
     
      table.integer('projectId').primary().notNullable()
      table.string('title').notNullable()
      table.date('duedate').notNullable()
      table.string('status').notNullable()
     table.string('files', 60).notNullable()
     table.integer('taskId').notNullable()
     table.foreign('taskId').references('tasks.taskId').onDelete('cascade')
     table.timestamps()
    })
  }

  down () {
    this.drop('projects')
  }
}

module.exports = ProjectSchema
