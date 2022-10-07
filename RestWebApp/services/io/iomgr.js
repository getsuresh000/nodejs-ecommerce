//Data Persistance using File IO with 
import fs from 'fs';
const fileName="./data/products.json";


export default class FileManager{
    constructor(){    }
    
    getAll=()=>{
        fs.readFile(fileName, (err,data)=>{
            let products=JSON.parse(data.toString());
            console.log(products);
        })  
    };
    
    getById=(id)=>{ 
        fs.readFile(fileName, (err,data)=>{
            let products=JSON.parse(data.toString());
            let foundProduct=products.find((product)=>(product.id ==id));
            console.log(foundProduct);
        })  
    };
    
    remove=(id)=>{
        fs.readFile(fileName, (err,data)=>{
            let allProducts=JSON.parse(data.toString());
            products=allProducts.filter((product)=>(product.id !=id));
            let strProducts=JSON.stringify(products);
            fs.writeFile(fileName,strProducts,()=>{
                console.log('file is updated');
                getAll();
            })
        })  
    }
    
    insert=(product)=>{
        fs.readFile(fileName, (err,data)=>{
            let products=JSON.parse(data.toString());
            products.push(product);
            console.log(products);
            let strProducts=JSON.stringify(products);
            fs.writeFile(fileName,strProducts,()=>{
                console.log('file is updated');
                getAll();
            })
        })  
    }
    
    update=(productTobeUpdated)=>{
        fs.readFile(fileName, (err,data)=>{
            let products=JSON.parse(data.toString());
            products=products.filter((person)=>(person.id !=productTobeUpdated.id));
            products.push(productTobeUpdated);
            let strProducts=JSON.stringify(products);
            fs.writeFile(fileName,strProducts,()=>{
                console.log('file is updated');
                getAll();
            })
        })  
    }
}
