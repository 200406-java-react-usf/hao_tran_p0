//new game
$("#newGame").on("click", function (event) {
    // init new game
    game.start();
});
// get 10 random passport and 2 random event

// show/hide event
$("#hide").on("click", function (event) {
    // init new game
});

$("#show").on("click", function (event) {
    // init new game
});
$("#approve").on("click", function (event) {
    // init new game
    game.round();
});

$("#deny").on("click", function (event) {
    // init new game
    game.round();
});
// show passport
const game = {
    rounds: 10,
    score: 0,
    eventCriteria: function () { },
    passportList: [],
    passportCurrent: undefined,
    //set up environment
    getRank: function () {
        this.rank = rank;
    },
    getEvent: function () {
        this.eventCriteria = new Function(criteria);
    },
    getPassports: function () {
        this.passportList.push(passport)
    },
    //load game data
    loadEvent: function () { },
    loadPassport: function () { },
    checkAnswer: function () {
        if (this.eventCriteria(this.passportCurrent)) {
            this.score += 100;
        } else {
            this.score -= 500;
        }
        this.rounds -= 1;
    },
    //end game and upload result
    endGame: function () {
        //update score
    },
    start: function () {
        this.getrank();
        this.getEvent();
        this.getPassports();
        this.loadEvent()

    },
    round: function () {
        if (this.rounds > 0) {
            this.loadPassport();
        } else {
            this.end();
        }
    }


};
