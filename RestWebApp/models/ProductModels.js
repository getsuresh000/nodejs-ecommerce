export  default class Product{ 
    //Parameterized constructor
    constructor(product_id,category_id,seller_id, title, description, unitprice, quantity){
        this.id=product_id;
        this.category_id=category_id;
        this.seller_id=seller_id;
        this.title=title;
        this.description=description;
        this.unitprice=unitprice;
        this.quantity=quantity;
        this.table_name = "products";
    }

    display(){
        console.log( "Id="+this.id);
        console.log( "Category Id="+this.category_id);
        console.log( "Seller Id="+this.seller_id);
        console.log( "Title="+this.title);
        console.log( "Description="+this.description);
        console.log( "Unit Price="+this.unitprice);
        console.log( "Quantities Available="+this.quantity);
    }
};
