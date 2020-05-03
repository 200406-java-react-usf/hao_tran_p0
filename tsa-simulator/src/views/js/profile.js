window.onload = function () {
    //define timeout
    const timeout = function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms)
        )
    }

    document.getElementById("box1").onclick = async function (event) {
        console.log("main clicked");
        if (document.getElementById("box1").getAttribute("clicked") == "false") {
            document.getElementById("box1").classList.add("boxclicked");
            document.getElementById("box1").setAttribute("clicked", "true");
        }
        document.getElementById("cube").classList.remove("hide");
        await timeout(500);
        document.getElementById("cube").classList.remove("inactive");
        await timeout(500);
    };
    document.getElementById("cube").onclick = async function (event) {
        if (document.getElementById("book_conatianer").getAttribute("clicked") == "false") {
            document.getElementById("book_conatianer").classList.add("book_open");
            document.getElementById("book_conatianer").setAttribute("clicked", "true");
            await timeout(500);
            document.getElementById("register").classList.remove("default_content_right");
            document.getElementById("register").classList.add("unselected");
        }
        
        // else {
        //     document.getElementById("book_conatianer").classList.remove("book_open");
        //     document.getElementById("book_conatianer").setAttribute("clicked", "false");
        // }
    };

    document.getElementById("register").onclick = async function (event) {
        if (document.getElementById("register").getAttribute("clicked") == "false") {
            document.getElementById("register").classList.add("ani_select");
            document.getElementById("register").classList.remove("unselected");
            document.getElementById("register").setAttribute("clicked", "true");

            document.getElementById("login").classList.remove("show_content_right");
            document.getElementById("login").classList.add("unselected");
            document.getElementById("login").setAttribute("clicked", "false");

            await timeout(1000);
            document.getElementById("register").classList.remove("ani_select");
            document.getElementById("register").classList.add("show_content_right");
        }
    };
    document.getElementById("login").onclick = async function (event) {
        if (document.getElementById("login").getAttribute("clicked") == "false") {
            document.getElementById("login").classList.remove("unselected");
            document.getElementById("login").classList.add("ani_select");
            document.getElementById("login").setAttribute("clicked", "true");

            document.getElementById("register").classList.remove("show_content_right");
            document.getElementById("register").classList.add("unselected");
            document.getElementById("register").setAttribute("clicked", "false");

            await timeout(1000);
            document.getElementById("login").classList.remove("ani_select");
            document.getElementById("login").classList.add("show_content_right");
        }
    };
    document.getElementById("login_form_submit").onclick = async function (event) {
        document.getElementById("book_conatianer").classList.remove("book_open");
        await timeout(1000);
        document.getElementById("cube").classList.add("inactive");
        await timeout(1000);
        document.getElementById("login_form").submit();
    };
    document.getElementById("register_form_submit").onclick = async function (event) {
        document.getElementById("book_conatianer").classList.remove("book_open");
        await timeout(1000);
        document.getElementById("cube").classList.add("inactive");
        await timeout(1000);
        document.getElementById("register_form").submit();
    };
}



