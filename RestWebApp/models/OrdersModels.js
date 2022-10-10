export default class Category {
    //Parameterized constructor
    constructor(
      cart_id,
      status,
      created_at
    ) {
      this.cart_id = cart_id;
      this.status = status;
      this.created_at = created_at;
  
      this.table_name = "orders";
    }
  
    display() {
      console.log(`cart_id= ${this.cart_id}`);
      console.log(`status= ${this.status}`);
      console.log(`Created At= ${this.created_at}`);
    }
  }