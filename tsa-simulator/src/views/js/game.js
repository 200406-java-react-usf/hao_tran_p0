window.onload = function () {
    //define timeout
    const timeout = function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms)
        )
    }
    async function start_ani() {
        $("#box1").addClass("boxclicked");
        await timeout(100);
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
    async function flipPage() {
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
        } else {
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
    }
    start_ani();

    // //ready
    async function game() {
        console.log("game start");
        let currentURL = window.location.origin;
        let scoreDelta = 0;
        // call the list of events
        //1 session = 1 event, total 1 session
        async function session() {
            console.log("session start");
            let groupName;
            let scoreDeltaSession = 0;
            // get event content of group name
            async function getEvent() {
                console.log("getEvent start");
                $.get(currentURL + "/game/nextevent", function (data) {
                    $("#event_title").text(data.title);
                    $("#event_content").text(data.content);
                    groupName = data.group;
                });
            }
            await getEvent();
            // total 3 rounds
            async function round(groupname) {
                let passport1;
                let passport2;
                let answer;
                let decision;
                // load the set up
                async function getPassportFront() {
                    $.get(currentURL + "/game/nextevent", function (data) {
                        $("#passport_firstname1").text(data.firstName);
                        $("#passport_lastname1").text(data.lastName);
                        $("#passport_nationality1").text(data.nationality);
                        $("#passport_occupation1").text(data.occupation);
                        $("#passport_race1").text(data.race);
                        $("#passport_religion1").text(data.religion);
                        $("#passport_culture1").text(data.culture);
                        $("#passport_property1").text(data.property);
                        passport1 = data;
                    });
                }
                async function getPassportBack() {
                    $.get(currentURL + "/game/nextevent", function (data) {
                        $("#passport_firstname2").text(data.firstName);
                        $("#passport_lastname2").text(data.lastName);
                        $("#passport_nationality2").text(data.nationality);
                        $("#passport_occupation2").text(data.occupation);
                        $("#passport_race2").text(data.race);
                        $("#passport_religion2").text(data.religion);
                        $("#passport_culture2").text(data.culture);
                        $("#passport_property2").text(data.property);
                        passport2 = data;
                    });
                }
                async function chooseAns() {
                    $("#approve").click(async function (event) {
            
                        if ($("#button_container").attr("clicked") == "false") {
                            console.log("clicked approve");
                            decision = true;
                            $("#button_container").attr("clicked", "true");
                        }
                    })
                    $("#deny").click(async function (event) {
            
                        if ($("#button_container").attr("clicked") == "false") {
                            console.log("clicked deny");
                            decision = false;
                            $("#button_container").attr("clicked", "true");
                        }
                    })
                }
                //choose answer
                async function checkGroup(answer, passport, groupname) {
                    $.post(currentURL + "/game/group",
                        {
                            passport: passport,
                            groupname: groupName
                        },
                        function (data) {
                            if (data == answer) {
                                scoreDeltaSession += 5;
                            } else {
                                scoreDeltaSession -= 10;
                            }
                            console.log(scoreDeltaSession);
                        });
                }
                //choose decision

                await getPassportFront();
                for(let i = 0; i<3; i++){
                    if(i%2 == 0){
                        await getPassportBack();
                        await chooseAns();
                        await checkGroup(answer, passport1, groupname);
                        //update score

                        //
                        await flipPage();
                    }else{
                        await getPassportFront();
                        await chooseAns();
                        await checkGroup(answer, passport2, groupname);
                        //update score

                        //
                        await flipPage();
                    }
                }
            }
            round(groupName);
        }
        session();
    }
    game();
}