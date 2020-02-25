'use strict'
const Model = use('Model') 
const Hash = use('Hash')

class User extends Model {
  //hidden para ocultar el password cuando devuelva el registro
  static get hidden (){
    return['password']
  }

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
