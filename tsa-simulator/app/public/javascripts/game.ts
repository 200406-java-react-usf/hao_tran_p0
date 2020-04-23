//new game
$("#newGame").on("click", function (event) {
    // init new game
    game.main();
});
// get 10 random passport and 2 random event

// show/hide event
$("#hide").on("click", function (event) {
    // init new game
});

$("#show").on("click", function (event) {
    // init new game
});
// show passport
const game = {
    rounds: 10,
    eventCriteria: undefined, 
    passportList: [],
    //set up environment
    getRank: function(){},
    getEvent: function(){},
    getPassports: function(){},
    //load game data
    loadEvent: function(){},
    loadPassport: function(){},
    checkAnswer: function(){},
    //end game and upload result
    endGame: function(){},




    main: function() {}


};
