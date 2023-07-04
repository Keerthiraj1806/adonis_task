import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sales'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.foreign('customer_id').references('customers.customer_id')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName,(table)=>{
      table.dropForeign('customer_id')
    })
  }
}
