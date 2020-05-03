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
    start_ani();

    //ready
    let currentURL = window.location.origin;
    let eventList: number[];
    let scoreDelta: number;
    //left get event
    async function getEventList() {
        $.get(currentURL + "/game/eventlist", function (data) {
            eventList = data;
        });
    }
    async function session(i) {
        let eventId: number = eventList[i];
        let groupName: string;
        await getEventList()
        async function getEvent() {
            $.get(currentURL + "/game/nextevent", function (data) {
                $("#event_title").text(data.title);
                $("#event_content").text(data.content);
                groupName = data.group;
            });
        }


        async function round(groupname) {
            await getEvent();
            let passport;
            async function getPassport() {
                $.get(currentURL + "/game/nextevent", function (data) {
                    $("#passport_firstname").text(data.firstName);
                    $("#passport_lastname").text(data.lastName);
                    $("#passport_nationality").text(data.nationality);
                    $("#passport_occupation").text(data.occupation);
                    $("#passport_race").text(data.race);
                    $("#passport_religion").text(data.religion);
                    $("#passport_culture").text(data.culture);
                    $("#passport_property").text(data.property);
                    passport = data;
                });
            }
            let answer: boolean;
            async function checkGroup(ans, passport, groupname){
                $.post(currentURL + "/game/group",
                    {
                        passport: passport,
                        groupname: groupName
                    },
                    function (data) {
                        if (data == ans) {
                            answer = true;
                        } else {
                            answer = false;
                        }
                    });
            }
            let decision: boolean;
            async function chooseAns(){
                $("#admit").click(async function (event) {
                    if ($("#button_container").attr("checked") == "false"){
                        decision = true;
                        $("#button_container").attr("checked", "true");
                        return;
                    }
                })
                $("#deny").click(async function (event) {
                    if ($("#button_container").attr("checked") == "false"){
                        decision = false;
                        $("#button_container").attr("checked", "true");
                        return;
                    }
                })
            }
            for (let i = 0; i < 5; i++) {
                await getPassport();
                await chooseAns()
                let ans:boolean;
                await checkGroup(decision, passport, groupname);
                if(ans){
                    scoreDelta += 5
                }else{
                    scoreDelta -= 10
                }
            }
        }
        round(groupName);
    }
    session(1);


    //get passport list

    //load passport * 10

    //score

}



