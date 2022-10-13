
//Javascript Code
//Client Side Javascript Code
//Registration

$(document).on('click','#btn_register',function(e){
  e.preventDefault();


  let credential={};
  credential.name=$('#txt_username').val();
  credential.email=$('#txt_email').val();
  credential.password=$('#txt_password').val();
  credential.location=$('#txt_address').val();
  credential.mobile=$('#txt_mobile').val();
  credential.role=$('#txt_role').val();

  let registerUrl="http://localhost:8000/api/users/register";
  
  $.ajax({
      url: registerUrl,
      type:"POST",
      data:credential,
      success: (response)=>{
          console.log(response.message);
         $("#message").html(response.message);
         
      }
      
  });
  $("#registraion_form")[0].reset();
});


$(document).on('click','#btn_login',function(e){
  e.preventDefault();
  let email=$('#txt_email').val();
  let password=$('#txt_password').val();
  let role=$('#txt_role').val();

  let credential={};
  credential.email=email;
  credential.role=role;

  let loginUrl="http://localhost:8000/api/users/inventory";
 
  $.ajax({
      url: loginUrl,
      type:"POST",
      data:credential,
     
      
      success: (data,response)=>{
         console.log(response.message);
         localStorage.setItem("Authorization",data);
         $("#message").html(response.userData);
      }
  });
});

/*
  var onRegister=()=>{
		
			
		var username = $('#txt_username').val();
		var _email 	 = $('#txt_email').val();
		var _password = $('#txt_password').val();
    var _mobile=$('#txt_mobile').val();
    var _address=$('#txt_address').val();
		var _role=$('#txt_role').val();
		var atpos  = email.indexOf('@');
		var dotpos = email.lastIndexOf('.com');

    

		if(username == ''){
			alert('please enter username !!'); 
		}
    /*
		else if(!/^[a-z A-Z]+$/.test(username)){ 
			alert('username only capital and small letters are allowed !!'); 
		}
		else if(email == ''){ 
			alert('please enter email address !!'); 
		}
    
		else if(atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length){ 
			alert('please enter valid email address !!'); 
		}
		else if(password == ''){ 
			alert('please enter password !!'); 
		}
		else if(password.length < 6){ 
			alert('password must be 6 !!');
		} 
    if(mobile == ''){ 
			alert('please enter mobile no !!'); 
		}
    if(address == ''){ 
			alert('please enter address !!'); 
		}
    if(role == ''){ 
			alert('please select role !!'); 
		}
    
		else{			
    
			$.ajax({
				url: 'http://localhost:8000/api/users/register',
				type: 'post',
				data:  {
        
        email:_email,
        password:_password,
        role:_role,
        name:username,
        mobile:_mobile,
        location:_address
       
        },
				success:(data,response)=>{
          alert(response);
          console.log(response);
          console.log(data); 
				}
       
			});
				
		
		}
	}
*/


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