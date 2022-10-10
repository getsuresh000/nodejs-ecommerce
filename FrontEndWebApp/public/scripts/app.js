
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
        type:"GET",
        success: (data)=>{
            console.log(data);
            let strData=JSON.stringify(data)
            let productList=document.getElementById("productList");
            for(var i=0;i<data.length;i++){
                const node = document.createElement("li");
                const textnode = document.createTextNode(data[i].title);
                node.appendChild(textnode);
                productList.appendChild(node);
            }  
        }
      });
    //on receive data dynamically append products names to existing HTML page
    //DOM Manipulation
    console.log("Button is Clicked......");
}

var fetchProductDetails=()=>{
    let apiError;
    let result;

    fetch("//localhost:8000/api/products/2", {
        // NEW - add a Content-Type header
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(async response => {
          if (response.ok) {
            apiError = false;
            result = await response.json();
            console.log(result);
          } else {
            apiError = true;
          }
        })
        .catch(() => (apiError = true));
}

var onRegister=()=>{
  let fullname=document.getElementById("fullname").value;
  let email=document.getElementById("email").value;
  let password=document.getElementById("password").value;
  let address=document.getElementById("address").value;
  let mobile=document.getElementById("mobile").value;
  let role=document.getElementById("role").value;
  let credential={};
  credential.name=fullname;
  credential.email=email;
  credential.password=password;
  credential.address=address;
  credential.mobile=mobile;
  credential.role=role;
  let registerUrl="http://localhost:8000/api/users/register";
  $.ajax({
      url: registerUrl,
      type:"POST",
      data:credential,
      success: (data, status)=>{
          console.log("on successfull login");
          console.log(status);
          console.log(data); 
          alert("Registered Successfully!!!");
      }
  });
}

var onLogin=()=>{
    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value;
    let credential={};
    credential.email=email;
    credential.password=password;
    let loginUrl="http://localhost:8000/api/login";
    $.ajax({
        url: loginUrl,
        type:"POST",
        data:credential,
        success: (data, status)=>{
            console.log("on successfull login");
            console.log(status);
            console.log(data);
            localStorage.setItem("receivedtoken",data);  
        }
    });
}

var onLogout=(req,res)=>{
  let logoutUrl="http://localhost:8000/api/logout";
  let token=localStorage.getItem(receivedtoken);
  
  $.ajax({

    url: logoutUrl,
    type:"POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization":token,
    },
   
});
}

var fetchOrders=()=>{
    let apiError;
    let result;
    let token= localStorage.getItem("receivedtoken");
    console.log(token);
    fetch("//localhost:8000/api/orders", {
        headers: {
          "Content-Type": "application/json",
          "Authorization":token
        }
      })
        .then(async response => {
          if (response.ok) {
            apiError = false;
            result = await response.json();
            console.log(result);
            let ordersList=document.getElementById("lstOrders");
            for(var i=0;i<result.length;i++){
                const node = document.createElement("li");
                const textnode = document.createTextNode(result[i].orderid+" " +result[i].date  +" " +result[i].status );
                node.appendChild(textnode);
                ordersList.appendChild(node);
                
            }  
          } else {
            apiError = true;
          }
        })
        .catch(() => (apiError = true));
}