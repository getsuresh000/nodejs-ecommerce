export default class Category {
    //Parameterized constructor
    constructor(
      order_id,
      customer_id,
      status,
      created_at
    ) {
      this.id = order_id;
      this.customer_id = customer_id;
      this.status = status;
      this.created_at = created_at;
  
      this.table_name = "orderDetails";
    }
  
    display() {
      console.log(`order_id= ${this.id}`);
      console.log(`customer_id= ${this.customer_id}`);
      console.log(`status= ${this.status}`);
      console.log(`Created At= ${this.created_at}`);
    }
  }