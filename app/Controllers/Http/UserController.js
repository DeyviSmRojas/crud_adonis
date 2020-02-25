'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
const User = use('App/Models/User')
const {validate} = use ('Validator')
const Hash = use ('Hash')


class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

   //Creation Login
  async login ({request,response,auth}){
    const {dni, password} = request.body
    const user = await User.query().where('dni', dni).first()   //  creation access to user
    if(!user){
      return response.status(400).json({
        message: 'El DNI ingresado no es valido'
      })
    }
    const isPasswordValid = await Hash.verify(password, user.password)  // creation access to password
    if(!isPasswordValid){
      return response.status(400).json({
        message: 'La contraseña es Incorrecta'
      })
    }
    const token = await auth.attempt(dni, password)
    response.header('token', token.token)
    return response.status(200).json({
      message: 'Login Exitoso',
      token
    })
  }

  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const rules = {
      dni: 'required|unique:user|min:8|max:8',
      password: 'required',
      name: 'required',
      last_name: 'required',
      email: 'required|unique:user'
    }
    const message = {
      'dni.required' : 'El DNI es obligatorio',
      'dni.unique' : 'El DNI ingresado ya se encuentra registrado',
      'dni.min' : 'El DNI debe tener 8 digitos',
      'dni.max' : 'El DNI debe tener 8 digitos',
      'password.required' : 'El password es obligatorio',
      'name.required' : 'Tiene que ingresar el Nombre',
      'last_name.required' : 'Tiene que ingresar el Apellido',
      'email.required' : 'Tienes que ingresar el email'
    }
    const validation = await validate(request.all(), rules, message)
    if (validation.fails()){
      return response.status(402).json({
        message: 'Error al enviar la informacion',
        validation:validation.messages()[0],
      })
    }
    const {dni, password, name, last_name} = request.body
    const user = new User ()
    user.dni = dni
    user.password = password
    user.name = name
    user.last_name = last_name
    user.email = email
    await user.save()
    return response.status(201).json({
      message: 'Usuario Registrado',
      user
    })
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = UserController
