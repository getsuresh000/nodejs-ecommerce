export default class Customer{
    //Parameterized constructor
    constructor(
        user_Id,
      name,
      mobile,
      location,
      created_at
    ) {
      this.user_Id = user_Id;
      this.name = name;
      this.mobile = mobile;
      this.location=location;
      this.created_at = created_at;
  
      this.table_name = "customers";
    }
  
    display() {
      console.log(`user_Id= ${this.user_Id}`);
      console.log(`name= ${this.name}`);
      console.log(`mobile= ${this.mobile}`);
      console.log(`location= ${this.location}`);
      console.log(`Created At= ${this.created_at}`);
    }
  }