export default class User {
    //Parameterized constructor
    constructor(
      email,
      password,
      role
    ) {
      this.email = email;
      this.password = password;
      this.role = role;
      this.table_name = "users";
    }
  
    display() {
      console.log(`Email= ${this.email}`);
      console.log(`Password= ${this.password}`);
      console.log(`Role= ${this.role}`);
    }
  }