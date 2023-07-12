/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'


Route
  .get('/', async () => {
  return { hello: 'world' }
})
.middleware(async (ctx, next) => {
  console.log(`Inside middleware ${ctx.request.url()}`)
  await next()})
//trying group
//Route.group(()=>{
//  Route.get('/:id',async({params})=>{
//    return `${params.id}`
//  }).where('id', /^[a-z]+$/)
//  Route.get('/:name?',async({params})=>{
//    return `second:${params.name}`
//  }) .where('name', /^[0-9]+$/)
//}).prefix('/post')

//request
//Route.get('/req',async ({request}:HttpContextContract)=>{
//  return request.qs()
//})

//product table
Route.group(()=>{
  Route.get('/','ProductsController.view')
  Route.post('/','ProductsController.insert')
  Route.get('/find','ProductsController.find')
  Route.get('/find/:id','ProductsController.findparam')
  Route.put('/update','ProductsController.update')
  Route.delete('/','ProductsController.delete')
}).prefix('/products')
//sales table
Route.group(()=>{
  Route.get('/','SalesController.view')
  Route.post('/','SalesController.insert')
  Route.get('/find','SalesController.find')
  Route.get('/find/:id','SalesController.findparam')
  Route.patch('/update','SalesController.update')
  Route.delete('/','SalesController.delete')
}).prefix('/sales')
//customer table
Route.group(()=>{
  Route.get('/','CustomersController.view')
  Route.post('/','CustomersController.insert')
  Route.get('/find','CustomersController.find')
  Route.get('/find/:id','CustomersController.findparam')
  Route.patch('/update','CustomersController.update')
  Route.delete('/','CustomersController.delete')
}).prefix('/customers')
//final route
Route.get('/final','FinalsController.result')
