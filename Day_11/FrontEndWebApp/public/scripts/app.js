
//Javascript Code
//Client Side Javascript Code

var fetchData=()=>{
   // alert("button is clicked.....");
 let url="http://localhost:8000/api/products";

    //use Ajax mechanism to fetch data from  rest api

    //it is inbuilt function of jQuery Library
    $.ajax({
        dataType: "json",
        url: url,
        success: (data)=>{
            console.log(data);
            let strData=JSON.stringify(data)
            //alert(strData);
           /* let para1=document.getElementById("para");
            para1.innerHTML=strData;
            */
            //DOM tree Manipulation Code at Client Side
            let productList=document.getElementById("productList");
            for(var i=0;i<data.length;i++){
                const node = document.createElement("li");
                const textnode =document.createTextNode(data[i].title+'--');
                const textnode1 =document.createTextNode(data[i].description+'--');
                
                const textnode2 =document.createTextNode(data[i].unitprice+'--');
                const textnode3 =document.createTextNode(data[i].quantity+' ');
                node.appendChild(textnode);
                node.appendChild(textnode1);
                node.appendChild(textnode2);
                node.appendChild(textnode3);
                productList.appendChild(node);
            }  

        }
      });
    
    //on receive data dynamically append products names to existing HTML page
    //DOM Manipulation


}
