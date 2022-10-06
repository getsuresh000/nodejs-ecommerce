var fs=require('fs');
const fileName="products.json";

export default class FileManager{
    constructor(){

    }
    getAll=()=>{
        fs.readFile(fileName,(err,data)=>{
            let products=JSON.parse(data.toString());
            console.log(products);
        })
    }
}