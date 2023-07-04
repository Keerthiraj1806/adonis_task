//import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//import Product from 'App/Models/Product'
//import Customer from 'App/Models/Customer'
import Sale from 'App/Models/Sale'
export default class FinalsController {
    public async result(){
        const a = await Sale.query()
                            .join('customers','sales.customer_id','=','customers.customer_id')
                            .join('products','sales.product_id','=','products.product_id')
                            .select('customers.customer_name')
                            .select('products.product_name')
                            .select('sales.*')

        const result = a.map( (list) => {
            return{
                customerName: list.$extras.customer_name,
                productName: list.$extras.product_name,
                salesId: list.$original.salesId,
                customerId: list.$original.customerId,
                productId: list.$original.productId
            }
        })
        return result
    }
}
