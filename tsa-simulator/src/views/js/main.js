window.onload = function () {
    const timeout = function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms)
        )
    }
    function main() {
            
    };
    function game(){
        // load daily event
        
        // load exclusion grp
        // load passport
    }
    function showProfile() {
        new Promise(async (resolve, reject) => {
            await timeout(1000);

            document.getElementById("cube1").classList.add("inactive");
            await timeout(500);

            document.getElementById("cube1").classList.add("hide");
            document.getElementById("loginHolder").classList.add("hide");
            document.getElementById("cube2").classList.remove("hide");
            document.getElementById("profileHolder").classList.remove("hide");
            await timeout(500);

            document.getElementById("cube2").classList.remove("inactive");
            await timeout(500); 
        });
    };
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
            document.getElementById("box1").classList.remove("boxclicked");
            document.getElementById("box1").setAttribute("clicked", "false");
            showProfile()
        };
        // register
        document.getElementById("registerSubmitBtn").onclick = function (event) {
            document.getElementById("box1").classList.remove("boxclicked");
            document.getElementById("box1").setAttribute("clicked", "false");
            showProfile()
        };
        document.getElementById("start").onclick = function (event) {
            game()
        };
    }
    listeners()

};
