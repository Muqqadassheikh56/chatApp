document.onreadystatechange = function () {
    var state = document.readyState
    if (state == 'interactive') {
         document.getElementById('contents').style.visibility="hidden";
    } else if (state == 'complete') {
        setTimeout(function(){
           document.getElementById('loader').style.visibility="hidden";
           document.getElementById('contents').style.visibility="visible";  
        },5000);
    }
}

var loadingCounter = setInterval(function () {
    var count = document.getElementById("countdown").innerHTML;
    if (count != "0") {
        document.getElementById("countdown").innerHTML = count -1; 
    } else {
        clearInterval();
    }
}, 1000);

var mail = window.name.split("@");
var myName = mail[0];
document.getElementById("welcome").innerHTML = "Welcome to WorldWide Group Chat, Mr. <span style='color:green'>" + myName+"</span>";
document.getElementById("loginId").innerHTML= "<b> You are login in as " + window.name + "</b>";
// console.log(window.name)


// if (myName == "") {
//     alert("Please enter something");
//     editBtn.disabled = true;

// }
function sendMessage(){
    var message = document.getElementById("message").value;

    firebase.database().ref("message").push().set({
        "sender": myName,
     "message":  message
    });

    return false;
}

firebase.database().ref("message").on("child_added" , function(snapshot){

    var html = "";
    html += "<li id='message-" + snapshot.key + "'>";
   
    // console.log(snapshot.key)
     html += snapshot.val().sender + ": " + snapshot.val().message;
    
    if(snapshot.val().sender ==myName){
        html += " &nbsp; &nbsp;<button data-id='" + snapshot.key+"' onclick='deleteMessage(this);'>Delete</button>"
    }
    html += "</li>";
    document.getElementById("messages").innerHTML += html;
    document.getElementById("scroll_message").scrollTo(0, document.getElementById("scroll_message").scrollHeight)
});

function deleteMessage(self){

    var messageId = self.getAttribute("data-id");
  
    // firebase.database().ref('message/' + messageId).remove()
    // showdata()
    // self.parentNode.remove()
    // firebase.database().ref("messages").on("child_removed" , function(snapshot){
        firebase.database().ref('message/' + messageId).set({
            sender : myName ,
            message: "This Message has been deleted"
        })
        document.getElementById("message-" + messageId).innerHTML = myName + ": This Message has been deleted";
    
    // })
}
