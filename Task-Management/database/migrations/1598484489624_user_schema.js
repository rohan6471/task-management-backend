'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
        table.increments()
         table.string('firstName').notNullable()
         table.string('lastName').notNullable()
         table.integer('contactNumber').notNullable()
        table.string('email', 60).notNullable()
        table.string('password').notNullable()
        table.string('role').notNullable().defaultTo("user")
       table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
