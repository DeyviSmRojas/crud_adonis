'use strict'
const Model = use('Model') 
const Hash = use('Hash')


class User extends Model {
  static boot () {
    super.boot()
    this.addTrait('@provider:Lucid/SoftDeletes')
    this.addHook('beforeSave', async (user) => {
      if (user.dirty.password) {
        user.password = await Hash.make(user.password)
      }
    })
  }
}

module.exports = User
