window.onload = function() {
    //define timeout
    const timeout = function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    async function close_ani() {
        if ($("#front_page").attr("clicked") == "false") {
            $("#front_page").removeClass("unselected");
            $("#front_page").addClass("default_content_right");
        }
        if ($("#back_page").attr("clicked") == "false") {
            $("#back_page").removeClass("unselected");
            $("#back_page").addClass("default_content_right");
        }
    };
    $("#box1").click(async function(event) {
        console.log("main clicked");
        if ($("#box1").attr("clicked") == "false") {
            $("#box1").addClass("boxclicked");
            $("#box1").attr("clicked", "true");
        }
        $("#cube").removeClass("hide");
        await timeout(500);
        $("#cube").removeClass("inactive");
        await timeout(500);
    });
    $("#cube").click(async function(event) {
        if ($("#book_conatianer").attr("clicked") == "false") {
            $("#book_conatianer").addClass("book_open");
            $("#book_conatianer").attr("clicked", "true");
            await timeout(100);
            $("#back_page").removeClass("default_content_right");
            $("#back_page").addClass("unselected");
        }

    })

    $("#back_page").click(async function(event) {
        if ($("#back_page").attr("clicked") == "false") {
            $("#back_page").addClass("ani_select");
            $("#back_page").removeClass("unselected");
            $("#back_page").attr("clicked", "true");

            $("#front_page").removeClass("show_content_right");
            $("#front_page").addClass("unselected");
            $("#front_page").attr("clicked", "false");

            await timeout(700);
            $("#back_page").removeClass("ani_select");
            $("#back_page").addClass("show_content_right");
        }
    });

    $("#front_page").click(async function(event) {
        if ($("#front_page").attr("clicked") == "false") {
            $("#front_page").removeClass("unselected");
            $("#front_page").addClass("ani_select");
            $("#front_page").attr("clicked", "true");

            $("#back_page").removeClass("show_content_right");
            $("#back_page").addClass("unselected");
            $("#back_page").attr("clicked", "false");

            await timeout(700);
            $("#front_page").removeClass("ani_select");
            $("#front_page").addClass("show_content_right");
        }
    });

    $("#login_form_submit").click(async function(event) {
        close_ani()
        await timeout(500);
        $("#book_conatianer").removeClass("book_open");
        await timeout(500);
        $("#cube").addClass("inactive");
        await timeout(500);
        $("#login_form").submit();
    });

    $("#register_form_submit").click(async function(event) {
        close_ani()
        await timeout(500);
        $("#book_conatianer").removeClass("book_open");
        await timeout(500);
        $("#cube").addClass("inactive");
        await timeout(500);
        $("#register_form").submit();
    });
}