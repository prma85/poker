/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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
    $("#game").submit(checkWinner);


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

    html += '<input class="button-primary" type="submit" value="Check winner">';

    return html;
}

function checkWinner(event) {
    event.preventDefault();
    $("#notice").hide();
    
    var game = $('#' + event.target.id).serializeArray();
    if (Poker.playGame(game)) {
        //show how to score in the game
        $("#gamePoints").show();
    } else {
        $("#notice").show();
        return false;
    }
}
