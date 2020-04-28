
window.onload = function () {

    function main() {

    };
    function submit() {
        console.log((document.getElementById("usernameLogin"))["value"]);
        let user = {
            username: (document.getElementById("usernameLogin"))["value"],
            password: (document.getElementById("passwordLogin"))["value"],
        };
        let currentURL = window.location.origin;
        app.post(currentURL + "/auth", user, function (results) {
            if (res.body.result == true) {
                start();
            } else {
                alert("wrong password");
            }
        });
    }
    function start() {
        console.log(user);
        new Promise((resolve, reject) => {
            setTimeout(() => {
                document.getElementById("cube1").classList.add("inactive");
            }, 1000)
        }
        ).then(
            setTimeout(() => {
                document.getElementById("cube1").classList.add("hide");
                document.getElementById("loginHolder").classList.add("hide");
                document.getElementById("cube2").classList.remove("hide");
                document.getElementById("profileHolder").classList.remove("hide");
            }, 1500)
        ).then(
            setTimeout(() => {
                document.getElementById("cube2").classList.remove("inactive");
            }, 2000)
        ).then(
            main()
        )
    }
    //show sign up || register
    function listeners() {
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

        document.getElementById("cube1").onclick = function (event) {
            if (document.getElementById("box1").getAttribute("clicked") == "false") {
                document.getElementById("box1").classList.add("boxclicked");
                document.getElementById("box1").setAttribute("clicked", "true");
            } else {
                document.getElementById("box1").classList.remove("boxclicked");
                document.getElementById("box1").setAttribute("clicked", "false");
            }

        };

        document.getElementById("cube2").onclick = function (event) {
            if (document.getElementById("box1").getAttribute("clicked") == "false") {
                document.getElementById("box1").classList.add("boxclicked");
                document.getElementById("box1").setAttribute("clicked", "true");
            } else {
                document.getElementById("box1").classList.remove("boxclicked");
                document.getElementById("box1").setAttribute("clicked", "false");
            }

        };
        // login
        document.getElementById("loginSubmitBtn").onclick = function (event) {
            console.log("clicked");
            document.getElementById("box1").classList.remove("boxclicked");
            document.getElementById("box1").setAttribute("clicked", "false");
            submit();
        };
        // register
        document.getElementById("registerSubmitBtn").onclick = function (event) {
            console.log("clicked");
            document.getElementById("box1").classList.remove("boxclicked");
            document.getElementById("box1").setAttribute("clicked", "false");
            submit();
        };
    }
    listeners()

};
