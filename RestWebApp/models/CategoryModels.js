export default class Category {
    //Parameterized constructor
    constructor(
      id,
      categoryName,
      description,
      created_at
    ) {
      this.id = id;
      this.categoryName = categoryName;
      this.description = description;
      this.created_at = created_at;
  
      this.table_name = "categories";
    }
  
    display() {
      console.log(`Id= ${this.id}`);
      console.log(`categoryName= ${this.categoryName}`);
      console.log(`description= ${this.description}`);
      console.log(`Created At= ${this.created_at}`);
    }
  }