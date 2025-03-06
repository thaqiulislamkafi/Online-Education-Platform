

// Log in Button

document.getElementById("login-btn").addEventListener("click",function(event){
    event.preventDefault();
    const mobileNumber = document.getElementById("mobile-number").value ;
    // console.log(mobileNumber);
    const pin = document.getElementById("pin").value ;

    if(mobileNumber.length === 11 && pin.length === 4) {
        window.location.href="dashboard.html" ;
    }
   else if (pin.length !== 4) {
        alert("Please Insert 4 digit pin");
   }

   else {
        alert("Please Insert 11 digit mobile number");
   }
})



