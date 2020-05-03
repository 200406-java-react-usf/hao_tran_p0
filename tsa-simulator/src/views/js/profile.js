window.onload = function () {
    //define timeout
    const timeout = function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms)
        )
    }
    async function start_ani() {
        document.getElementById("box1").classList.add("boxclicked");
        await timeout(500);
        document.getElementById("cube").classList.remove("hide");
        await timeout(500);
        document.getElementById("cube").classList.remove("inactive");
        await timeout(500);
        document.getElementById("book_conatianer").classList.add("book_open");
        document.getElementById("book_conatianer").setAttribute("clicked", "true");
        await timeout(500);
        document.getElementById("back_page").classList.remove("default_content_right");
        document.getElementById("back_page").classList.add("unselected");
    }
    start_ani();
    document.getElementById("cube").onclick = async function (event) {
        if (document.getElementById("book_conatianer").getAttribute("clicked") == "false") {
            document.getElementById("book_conatianer").classList.add("book_open");
            document.getElementById("book_conatianer").setAttribute("clicked", "true");
            await timeout(500);
            document.getElementById("back_page").classList.remove("default_content_right");
            document.getElementById("back_page").classList.add("unselected");
        }
    };

    document.getElementById("back_page").onclick = async function (event) {
        if (document.getElementById("back_page").getAttribute("clicked") == "false") {
            document.getElementById("back_page").classList.add("ani_select");
            document.getElementById("back_page").classList.remove("unselected");
            document.getElementById("back_page").setAttribute("clicked", "true");

            document.getElementById("front_page").classList.remove("show_content_right");
            document.getElementById("front_page").classList.add("unselected");
            document.getElementById("front_page").setAttribute("clicked", "false");

            await timeout(1000);
            document.getElementById("back_page").classList.remove("ani_select");
            document.getElementById("back_page").classList.add("show_content_right");
        }
    };
    document.getElementById("front_page").onclick = async function (event) {
        if (document.getElementById("front_page").getAttribute("clicked") == "false") {
            document.getElementById("front_page").classList.remove("unselected");
            document.getElementById("front_page").classList.add("ani_select");
            document.getElementById("front_page").setAttribute("clicked", "true");

            document.getElementById("back_page").classList.remove("show_content_right");
            document.getElementById("back_page").classList.add("unselected");
            document.getElementById("back_page").setAttribute("clicked", "false");

            await timeout(1000);
            document.getElementById("front_page").classList.remove("ani_select");
            document.getElementById("front_page").classList.add("show_content_right");
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



