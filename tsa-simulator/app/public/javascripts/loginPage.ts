const loginRoutes = require("../../route/api/loginRoutes")


$("#loginsubmitBtn").on("click", function (event) {
    event.preventDefault();
    const currentURL = window.location.origin;
    // Form validation
    if ($("#name").val() && $("#name").val()) {
        let user = {
            username: $("#username").val(),
            password: $("#password").val()
        };
        // Ajax call for receiving response after POST req
        $.post(currentURL + "/auth", user);
    } else {
        // If a required field is missing, show alert
        alert("missing");
    }
});