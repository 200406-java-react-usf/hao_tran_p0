import $ from "jquery";
window.onload = function () {
    //define timeout
    const timeout = function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms)
        )
    }
    async function start_ani() {
        $("#box1").addClass("boxclicked");
        await timeout(500);
        $("#cube").removeClass("hide");
        await timeout(500);
        $("#cube").removeClass("inactive");
        await timeout(500);
        $("#book_conatianer").addClass("book_open");
        $("#book_conatianer").attr("clicked", "true");
        await timeout(500);
        $("#back_page").removeClass("default_content_right");
        $("#back_page").addClass("unselected");
    }
    async function close_ani(){
        if ($("#front_page").attr("clicked") == "false") {
            $("#front_page").removeClass("unselected");
            $("#front_page").addClass("default_content_right");
        }
        if ($("#back_page").attr("clicked") == "false") {
            $("#back_page").removeClass("unselected");
            $("#back_page").addClass("default_content_right");
        }
    };
    start_ani();

    //ready
    let currentURL = window.location.origin;

    //left get event
    async function getEvent(){
        $.post(currentURL + "/api/friends", function(data) {
            event.preventDefault();
            $("#bestFriend").text(data.name);
            $("#bestFriendPhoto").attr("src", data.photo);
            //$("#bestFriendModal").modal("toggle");
        });
    }


    //get passport list

    //load passport * 10

    //score

}



