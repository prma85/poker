/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//names for the ranon function
var names = ["Vader", "Yoda", "Obi-Wan", "Anakin", "Jon Snow", "Aria", "Padme", "Leia", "Neo", "Lara Croft"];

function createRoom() {
    //get the number of players in the game to create the room and setting that it is a decimal number
    var nplayers = parseInt($("#nplayers").val(), 10);
    console.log("Number of players " + nplayers);

    //doing the validation for number of players
    if (nplayers < 2 || !$("#nplayers").val()) {
        alert("You need at least 2 players to play this game");
        return false;
    } else if (nplayers > 10) {
        alert("Let focus in a game with 10 players or less ;)");
        return false;
    }

    //creating the room (players and cards inputs)
    var html = generateRoomHTML(nplayers);
    //console.log(html);

    //adding the html and inputs in the form
    $("#game").html(html);
    $("#submit").on("click",checkWinner);

    //do not lose time and deal the cards randomly
    $("#dealcards").on("click", function (event) {
        event.preventDefault();

        var cards = Poker.randomGame(nplayers);
        //console.log(cards);
        for (var i = 0; i < nplayers; i++) {
            var j = i+1;
            $("#player_"+j).val(names[i]);
            $("#player_cards_"+j).val(cards[i]);
        }
    });


    //show the hidden form
    $("#newroom").show();

    //show the game rules to play
    $("#gameRules").show();
}

function generateRoomHTML(n) {
    var html = '';

    //creating the inputs for each player
    for (var i = 1; i <= n; i++) {
        html += '<fieldset>';
        html += '<legend>Player' + i + '</legend>';
        html += '<div class="row">';

        //player name
        html += '<div class="column">';
        html += '<input required type="text" name="player_' + i + '" id="player_' + i + '" placeholder="Inform the player name" />';
        html += '</div>';

        //cards input
        html += '<div class="column">';
        html += '<input required type="text" name="player_cards_' + i + '" id="player_cards_' + i + '" placeholder="Inform the player\'s cards" />';
        html += '</div>';

        //closes row
        html += '</div>';

        //closes fieldset
        html += '</fieldset>';
    }

    html += '<div class="row" style="text-align: center">';
    html += '<div class="column">';
    html += '<a href="#" class="button button-outline" id="dealcards">Deal cards randomly</a>';
    html += '</div>';
    html += '<div class="column">';
    html += '<a href="#" class="button button-primary" id="submit">Check winner</a>';
    html += '</div>';
    html += '</div>';

    return html;
}

function checkWinner(event) {
    event.preventDefault();
    $("#notice").hide();

    var game = $('#game').serializeArray();
    if (Poker.start(game)) {
        //show how to score in the game
        $("#gamePoints").show();
        return true;
    } else {
        $("#notice").show();
        return false;
    }
}
