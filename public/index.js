
let  signupwithemail = ()=>{
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var passwordConfirmation = document.getElementById("passwordConfirmation").value
    if(password== passwordConfirmation){

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(result=>{
            alert("Account successfuly created")
            console.log(result)
        })
        .catch(function(error) {
           // Handle Errors here.
           var errorCode = error.code;
           var errorMessage = error.message;
           alert(errorMessage)
           // ...
         });
    }else{
        alert("Password did not match")
    }


}

let loginwithemail = ()=>{
   var email = document.getElementById("email").value;
   var password = document.getElementById("password").value;
       firebase.auth().signInWithEmailAndPassword(email, password)
       .then(result=>{
           alert("user login successfuly")
           window.name = email
           location.href = "chat.html"
        //    console.log(myName)
        //    window.open("index.html" ,"_self" )
       })
       .catch(function(error) {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       alert(errorMessage)

       // ...
     });
}

let loginwithgoogle = ()=>{

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        alert("user login succesfully")
        console.log(user)
        window.name = user.email
        location.href = "chat.html"
        // ...
      }).catch(function(error) {

          alert(error);
        
      });
}

   let loginwithfacebook = ()=>{
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        alert("user login succesfully")
        console.log(user)
        window.name = user.email
        location.href = "chat.html"

        // ...
      }).catch(function(error) {
          alert(error)
       
      });
   }

