//const loginRoutes = require("../../route/api/loginRoutes")
window.onload = function(){ 
    console.log("js loaded");
//show sign up || register
document.getElementById("signUpBtn").onclick = function (event) {
    console.log("clicked");
    document.getElementById("registerBtn").classList.add("binaryBtnUnclicked");
    document.getElementById("registerBtn").classList.remove("binaryBtn");
    document.getElementById("signUpBtn").classList.remove("binaryBtnUnclicked");
    document.getElementById("signUpBtn").classList.add("binaryBtn");

    document.getElementById("login").classList.add("show");
    document.getElementById("login").classList.remove("hide");
    document.getElementById("register").classList.add("hide");
    document.getElementById("register").classList.remove("show");
};
document.getElementById("registerBtn").onclick = function (event) {
    document.getElementById("signUpBtn").classList.add("binaryBtnUnclicked");
    document.getElementById("signUpBtn").classList.remove("binaryBtn");
    document.getElementById("registerBtn").classList.remove("binaryBtnUnclicked");
    document.getElementById("registerBtn").classList.add("binaryBtn");

    document.getElementById("register").classList.add("show");
    document.getElementById("register").classList.remove("hide");
    document.getElementById("login").classList.add("hide");
    document.getElementById("login").classList.remove("show");
};
// $("#register").on("click", function (event) {
//     $("#register").removeClass("binaryBtnUnclicked");
//     $("#register").addClass("binaryBtn");
//     $("#signUp").removeClass("binaryBtn");
//     $("#signUp").addClass("binaryBtnUnclicked");
// });

// //login
// $("#loginSubmitBtn").on("click", function (event) {
//     event.preventDefault();
//     const currentURL = window.location.origin;
//     // Form validation
//     if ($("#username").val() && $("#password").val()) {
//         let user = {
//             username: $("#username").val(),
//             password: $("#password").val()
//         };
//         // Ajax call for receiving response after POST req
//         $.post(currentURL + "/newUser", user => {
//             //update page

//         });
//     } else {
//         // If a required field is missing, show alert
//         alert("missing");
//     }
// });
// //register
// $("#registerSubmitBtn").on("click", function (event) {
//     event.preventDefault();
//     const currentURL = window.location.origin;
//     // Form validation
//     if ($("#username").val() && $("#password").val()) {
//         let user = {
//             username: $("#username").val(),
//             password: $("#password").val()
//         };
//         // Ajax call for receiving response after POST req
//         $.post(currentURL + "/newUser", user => {
//             //update page

//         });
//     } else {
//         // If a required field is missing, show alert
//         alert("missing");
//     }
// });
};

