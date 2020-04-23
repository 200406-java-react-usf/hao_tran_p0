const loginRoutes = require("../../route/api/loginRoutes")
//show sign up || register
$("#signUp").on("click", function (event) {

});
$("#register").on("click", function (event) {

});

//login
$("#loginSubmitBtn").on("click", function (event) {
    event.preventDefault();
    const currentURL = window.location.origin;
    // Form validation
    if ($("#username").val() && $("#password").val()) {
        let user = {
            username: $("#username").val(),
            password: $("#password").val()
        };
        // Ajax call for receiving response after POST req
        $.post(currentURL + "/newUser", user => {
            //update page

        });
    } else {
        // If a required field is missing, show alert
        alert("missing");
    }
});
//register
$("#registerSubmitBtn").on("click", function (event) {
    event.preventDefault();
    const currentURL = window.location.origin;
    // Form validation
    if ($("#username").val() && $("#password").val()) {
        let user = {
            username: $("#username").val(),
            password: $("#password").val()
        };
        // Ajax call for receiving response after POST req
        $.post(currentURL + "/newUser", user => {
            //update page

        });
    } else {
        // If a required field is missing, show alert
        alert("missing");
    }
});
