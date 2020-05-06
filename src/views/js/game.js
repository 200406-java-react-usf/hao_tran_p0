window.onload = function() {
    const currentURL = window.location.origin;
    const timeout = async function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    let score = parseInt(localStorage.getItem('score'));
    let username = (localStorage.getItem('username')).trim();
    // let username = "test";

    const game = {
        score: 0,
        maxRound: 4,
        round: 1,
        group: '',
        passport1: 0,
        passport2: 0,
        answer: false,
        selection: false,

        start_ani: async function() {
            $('#box1').addClass('boxclicked');
            await timeout(100);
            $('#cube').removeClass('hide');
            await timeout(500);
            $('#cube').removeClass('inactive');
            await timeout(500);
            $('#book_conatianer').addClass('book_open');
            $('#book_conatianer').attr('clicked', 'true');
            await timeout(500);
            $('#back_page').removeClass('default_content_right');
            $('#back_page').addClass('unselected');
        },
        close_ani: async function() {
            if ($('#front_page').attr('clicked') == 'false') {
                $('#front_page').removeClass('unselected');
                $('#front_page').addClass('default_content_right');
            }
            if ($('#back_page').attr('clicked') == 'false') {
                $('#back_page').removeClass('unselected');
                $('#back_page').addClass('default_content_right');
            }
        },
        flipPage: async function() {
            $('#button_container').addClass('button_container_inflip');
            if ($('#back_page').attr('clicked') == 'false') {
                $('#back_page').addClass('ani_select');
                $('#back_page').removeClass('unselected');
                $('#back_page').attr('clicked', 'true');

                $('#front_page').removeClass('show_content_right');
                $('#front_page').addClass('unselected');
                $('#front_page').attr('clicked', 'false');

                await timeout(700);
                $('#back_page').removeClass('ani_select');
                $('#back_page').addClass('show_content_right');
            } else {
                $('#front_page').removeClass('unselected');
                $('#front_page').addClass('ani_select');
                $('#front_page').attr('clicked', 'true');

                $('#back_page').removeClass('show_content_right');
                $('#back_page').addClass('unselected');
                $('#back_page').attr('clicked', 'false');

                await timeout(700);
                $('#front_page').removeClass('ani_select');
                $('#front_page').addClass('show_content_right');
            }
            $('#button_container').removeClass('button_container_inflip');
        },
        getEvent: async function() {
            await $.get(currentURL + '/game/nextevent', function(data) {
                $('#event_title').text(data.title);
                $('#event_content').text(data.content);
                game.group = data.groupname;
            });
        },
        //check group, update boolean if in group
        checkGroup: async function(passportId, groupname) {

            let input = { passportId: passportId, groupname: groupname }
            await $.ajax({
                type: 'POST',
                url: currentURL + '/game/groupcheck',
                data: input,
                success: function(data) {
                    game.answer = data;
                }
            })
        },
        scoreUpdate: async function(decision) {
            if (game.answer == decision) {
                game.score += 5;
            } else {
                game.score -= 10;
            }
            $('#score').text(game.score + ' solidi');
        },
        getPassportFront: async function() {
            let id;
            await $.get(currentURL + '/game/nextpassport', async function(data) {
                $('#passport_firstname1').text(data.firstname);
                $('#passport_lastname1').text(data.lastname);
                $('#passport_nationality1').text(data.origin);
                $('#passport_occupation1').text(data.occupation);
                $('#passport_race1').text(data.race);
                $('#passport_religion1').text(data.religion);
                $('#passport_culture1').text(data.culture);
                $('#passport_property1').text(data.property);
                id = data.id;
            });
            return id;
        },
        getPassportBack: async function() {
            let id;
            await $.get(currentURL + '/game/nextpassport', async function(data) {
                $('#passport_firstname2').text(data.firstname);
                $('#passport_lastname2').text(data.lastname);
                $('#passport_nationality2').text(data.origin);
                $('#passport_occupation2').text(data.occupation);
                $('#passport_race2').text(data.race);
                $('#passport_religion2').text(data.religion);
                $('#passport_culture2').text(data.culture);
                $('#passport_property2').text(data.property);
                id = data.id;
            });
            return id;
        },
        roundOdd: async function() {
            game.passport1 = await game.getPassportFront();
        },
        roundEven: async function() {
            game.passport2 = await game.getPassportBack();
        },
        // default from 1
        loadRound: async function(roundCount) {
            if (roundCount % 2 == 0) {
                await game.roundEven();
                await game.checkGroup(game.passport2, game.group);
            } else {
                await game.roundOdd();
                await game.checkGroup(game.passport1, game.group);
            }
        },
        confirmAnswer: async function(selection) {
            if (game.round < game.maxRound) {
                game.scoreUpdate(selection);
                game.updateUserScore();
                game.round++;
                game.flipPage();
                game.loadRound(game.round);
            } else if (game.round == game.maxRound) {
                game.scoreUpdate(selection);
                game.updateUserScore();
                game.endround();
            }
        },
        endround: async function() {
            $('#button_container').addClass('button_container_inflip');
            if ($('#back_page').attr('clicked') == 'false') {
                $('#back_page').addClass('ani_select');
                $('#back_page').removeClass('unselected');
                $('#back_page').attr('clicked', 'true');

                $('#front_page').removeClass('show_content_right');
                $('#front_page').addClass('unselected');
                $('#front_page').attr('clicked', 'false');

                await timeout(700);
                $('#back_page').removeClass('ani_select');
                $('#back_page').addClass('show_content_right');
                $('#form_holder1').addClass('fade');
                $('#form_holder2').addClass('fade');
            } else {
                $('#front_page').removeClass('unselected');
                $('#front_page').addClass('ani_select');
                $('#front_page').attr('clicked', 'true');

                $('#back_page').removeClass('show_content_right');
                $('#back_page').addClass('unselected');
                $('#back_page').attr('clicked', 'false');

                await timeout(700);
                $('#front_page').removeClass('ani_select');
                $('#front_page').addClass('show_content_right');
                $('#form_holder1').addClass('fade');
                $('#form_holder2').addClass('fade');
            }
            $('#button_container').addClass('fade');
            $('#button_container2').addClass('button_container2_active');
            $('#button_container2').removeClass('button_container2');
        },
        restart_ani: async function() {
            $('#form_holder1').removeClass('fade');
            $('#form_holder2').removeClass('fade');
            $('#button_container').removeClass('fade');
            $('#button_container2').removeClass('button_container2_active');
            $('#button_container2').addClass('button_container2');
            $('#button_container').removeClass('button_container_inflip');
        },
        main: async function() {
            await game.getEvent();
            await game.loadRound(game.round);

            $('#approve').click(async function(event) {
                game.selection = true;
                game.confirmAnswer(true);
            })
            $('#deny').click(async function(event) {
                game.selection = false;
                game.confirmAnswer(false);
            })

        },
        reset: async function() {
            await $.get(currentURL + '/game/resetgame', function(data) {
                game.close_ani();
                timeout(100);
                window.location.href = "http://localhost:8080/";
            })
        },
        updateUserScore: async function() {

            let request = {
                username: username,
                score: game.score
            }
            await $.post(currentURL + '/user/asset', request, function() {
                return;
            })
        }
    };
    game.start_ani();
    game.score = score;
    $('#event_page').click(async function() {

            $('#event_page').attr('att_ready', 'false');
            $('#event_page').addClass('show_event');
            $('#form_holder1').removeClass('form_inactive');
            game.main()
            $('#continue').click(async function(event) {
                game.round = 1;
                game.restart_ani();
                game.main();
            })
            $('#end').click(async function(event) {
                console.log("resetting");
                game.reset();
            })
        }

    )



}