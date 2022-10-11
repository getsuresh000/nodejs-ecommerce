export default class Seller{
    //Parameterized constructor
    constructor(
       
      name,
      mobile,
      location
    ) {
      
      this.name = name;
      this.mobile = mobile;
      this.location=location;
      
  
      this.table_name = "sellers";
    }
  
    display() {
    
      console.log(`name= ${this.name}`);
      console.log(`mobile= ${this.mobile}`);
      console.log(`location= ${this.location}`);
    }
  }