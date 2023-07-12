import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Trial {
  public async handle({request}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    console.log(`-> ${request.method()}: ${request.url()}`)
    await next()
  }
}
