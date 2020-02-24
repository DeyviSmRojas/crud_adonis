'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments('id')
      table.string('dni', 8).unique()
      table.string('name', 150)
      table.string('last_name', 150)
      table.string('email', 150).unique
      table.datetime('deleted_at')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
