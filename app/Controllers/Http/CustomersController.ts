import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class CustomersController {
    public async insert({request}:HttpContextContract){
        const customer=await schema.create({
            customerId:schema.number(),
            customerName:schema.string()
        })
        const message={'*':(rule,field)=>{return`${rule} error on ${field}`}}
        const payload=await request.validate({schema:customer,messages:message})
        const newCustomer=await Customer.create(payload)
        return newCustomer
    }
    public async view(){
        return await Customer.all()
    }
//view with findby
    public async find({request}:HttpContextContract){
        const id=schema.create({
            customerId: schema.number()
        })
        const message={'*':(rule,field)=>{return `${rule} error at ${field}`}}
        const payload=await request.validate({schema:id,messages:message})
        return await Customer.findBy('customerId',payload['customerId'])
    }
//view using params
    public async findparam({params}){
        const id = params.id
        return await Customer.findBy('customerId',id)
    }
//update
    public async update({request}:HttpContextContract){
        const newCustomer=schema.create({
            customerId:schema.number(),
            customerName:schema.string()
        })
        const message={'*':(rule,field)=>{return `${rule} error at ${field}`}}
        const payload=await request.validate({schema:newCustomer,messages:message})
//request id == product id
        const oldCustomer=await Customer.findBy('customerId',payload['customerId'])
        if(oldCustomer){
            oldCustomer.customerName=payload.customerName
            await oldCustomer.save()
            return oldCustomer
        }
        else
        {
            return `Given productID ${payload.customerId} not found!`
        }
    }
//delete
    public async delete({request}:HttpContextContract){
        const selectedCustomer=schema.create({
            customerId:schema.number()
        })
        const message={'*':(rule,field)=>{return `${rule} error at ${field}`}}
        const payload=await request.validate({schema:selectedCustomer,messages:message})
//request id == product id
        const oldCustomer=await Customer.findBy('customerId',payload['customerId'])
        if(oldCustomer){
            await oldCustomer.delete()
        }
        else
        {
            return `Given customerId ${payload.customerId} not found!`
        }
}
}
