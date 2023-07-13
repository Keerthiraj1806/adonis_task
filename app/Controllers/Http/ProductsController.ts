import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Product from 'App/Models/Product'
export default class ForstudentsController {
//inserting data to the product table
    public async insert({request}:HttpContextContract){
        const product=schema.create({
            productId:schema.number(),
            productName:schema.string(),
            productPrice:schema.number()
        })
        const message={'*':(field,rule) => {return `${rule} erron on ${field}`}}
        const payload=await request.validate({schema:product,messages:message})
        const newProduct= await Product.create(payload)
        return newProduct
        
    }
//view the data in the product table
    public async view({response}:HttpContextContract){
        response.send(await Product.all())
    }
//view with findby
    public async find({request}:HttpContextContract){
        const id=schema.create({
            productId: schema.number()
        })
        const message={'*':(rule,field)=>{return `${rule} error at ${field}`}}
        const payload=await request.validate({schema:id,messages:message})
        return await Product.findBy('productId',payload['productId'])
    }
//view using params
    public async findparam({params}){
        const id = params.id
        return await Product.findBy('productId',id)
    }
//update
    public async update({request}:HttpContextContract){
        const newProduct=schema.create({
            productId:schema.number(),
            productName:schema.string(),
            productPrice:schema.number()
        })
        const message={'*':(rule,field)=>{return `${rule} error at ${field}`}}
        const payload=await request.validate({schema:newProduct,messages:message})
//request id == product id
        const oldProduct=await Product.findBy('productId',payload['productId'])
        if(oldProduct){
            oldProduct.productName=payload.productName
            oldProduct.productPrice=payload.productPrice
            await oldProduct.save()
            return oldProduct
        }
        else
        {
            return `Given productID ${payload.productId} not found!`
        }
    }
//delete
    public async delete({request,params}:HttpContextContract){
        // const selectedProduct=schema.create({
        //     productId:schema.number()
        // })
        // const message={'*':(rule,field)=>{return `${rule} error at ${field}`}}
        // const payload=await request.validate({schema:selectedProduct,messages:message})
//request id == product id
        const product=params.id
        const oldProduct=await Product.findBy('productId',product)
        if(oldProduct){
            await oldProduct.delete()
        }
        else
        {
            return `Given productID ${product} not found!`
        }
}
//search function
public async search({request,response}:HttpContextContract){
        const { searchQuery }=request.all()
        console.log(searchQuery)
        const searchProduct=await Product.query()
                                    .select('*')
                                    .from('products')
                                    .whereRaw('product_id::text ILIKE ?',`%${searchQuery}%`)
                                    .orWhere('product_name','ILIKE',`%${searchQuery}%`)
                                    .orWhereRaw('product_price::text ILIKE ?',`%${searchQuery}%`)
        return response.json(searchProduct)
}
}
