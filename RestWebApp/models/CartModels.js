export default class Cart {
    //Parameterized constructor
    constructor(
      customer_id,
      product_id,
      quantity,
      created_at
    ) {
      this.customer_id = customer_id;
      this.product_id = product_id;
      this.quantity = quantity;
      this.created_at = created_at;
  
      this.table_name = "cart";
    }
  
    display() {
      console.log(`customer_id= ${this.customer_id}`);
      console.log(`product_id= ${this.product_id}`);
      console.log(`quantity= ${this.quantity}`);
      console.log(`Created At= ${this.created_at}`);
    }
  }