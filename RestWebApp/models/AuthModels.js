export default class Auth {
    //Parameterized constructor
    constructor(
      id,
      name,
      email,
      password,
      address,
      mobile,
      created_at
    ) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password = password;
      this.address = address;
      this.mobile = mobile;
      this.created_at = created_at;
  
      this.table_name = "users";
    }
  
    display() {
      console.log(`Id= ${this.id}`);
      console.log(`Name= ${this.name}`);
      console.log(`Email= ${this.email}`);
      console.log(`Password= ${this.password}`);
      console.log(`Address= ${this.address}`);
      console.log(`mobile= ${this.mobile}`);
      console.log(`Created At= ${this.created_at}`);
    }
  }