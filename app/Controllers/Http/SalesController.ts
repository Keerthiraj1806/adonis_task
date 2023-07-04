import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Sale from 'App/Models/Sale'

export default class SalesController {
//inserting data to the sales table
    public async insert({request}:HttpContextContract){
        const sale=schema.create({
            salesId: schema.number(),
            customerId:schema.number(),
            productId:schema.number()
        })
        const message={'*':(field,rule)=>{return `${rule} error on ${field}`}}
        const payload=await request.validate({schema:sale,messages:message})
        const newSale=await Sale.create(payload)
        return newSale
    }
    public async view({response}:HttpContextContract){
        response.send(await Sale.all())
    }

//view with findby
    public async find({request}:HttpContextContract)
    {
        const id=schema.create({
            salesId: schema.number()
        })
        const message={'*':(rule,field)=>{return `${rule} error at ${field}`}}
        const payload=await request.validate({schema:id,messages:message})
        return await Sale.findBy('salesId',payload['salesId'])
    }
//view using params
    public async findparam({params}){
        const id = params.id
        return await Sale.findBy('salesId',id)
    }
//update
public async update({request}:HttpContextContract){
    const newSale=schema.create({
        salesId:schema.number(),
        customerId:schema.number(),
        productId:schema.number()
    })
    const message={'*':(rule,field)=>{return `${rule} error at ${field}`}}
    const payload=await request.validate({schema:newSale,messages:message})
//request id == product id
    const oldSale=await Sale.findBy('salesId',payload['salesId'])
    if(oldSale){
        oldSale.customerId=payload.customerId
        oldSale.productId=payload.productId
        await oldSale.save()
        return oldSale
    }
    else
    {
        return `Given productID ${payload.productId} not found!`
    }

}
//delete
    public async delete({request}:HttpContextContract){
        const selectedSale=schema.create({
            salesId:schema.number()
        })
        const message={'*':(rule,field)=>{return `${rule} error at ${field}`}}
        const payload=await request.validate({schema:selectedSale,messages:message})
//request id == product id
        const oldSale=await Sale.findBy('salesId',payload['salesId'])
        if(oldSale){
            await oldSale.delete()
        }
        else
        {
            return `Given salesId ${payload.salesId} not found!`
        }
}
}

