'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectSchema extends Schema {
  up () {
    this.create('projects', (table) => {
     
      table.increments()
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.date('duedate')
      table.string('status')
      table.string('assignTo')
     table.string('files', 60)
     
     table.timestamps()
    })
  }

  down () {
    this.drop('projects')
  }
}

module.exports = ProjectSchema
