//event listeners for once the page was loaded
let nPlayers = 0;
$(document).ready(function() {
    //update the type of hands used in every change
    $('input[type=radio][name=allhands]').change(function() {
      Poker.allhands = this.value;
    });

    //on subit function for the game
    $("#submit").on("click",checkWinner);

    //do not lose time and deal the cards randomly
    $("#dealcards").on("click", function (event) {
        event.preventDefault();
        Poker.createRandomGame(nPlayers);
    });
});

//get the number of players in the game to create the room and setting that it is a decimal number
function createRoom() {
    nPlayers = parseInt($("#nPlayers").val(), 10);
    console.log("Number of players " + nPlayers);

    //doing the validation for number of players
    if (nPlayers < 2 || !$("#nPlayers").val()) {
        alert("You need at least 2 players to play this game");
        return false;
    } else if (nPlayers > 10) {
        alert("Let focus in a game with 10 players or less ;)");
        return false;
    }

    //creating the room (players and cards inputs)
    const html = generateRoomHTML(nPlayers);
    $("#newroom_content").html(html);

    //show the hidden form and game rules
    $("#newroom").show();
    $("#gameRules").show();
}

function generateRoomHTML(n) {
    let html = '';

    //creating the inputs for each player
    for (let i = 1; i <= n; i++) {
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

    return html;
}

function checkWinner(event) {
    event.preventDefault();
    $("#notice").hide();

    const game = $('#game').serializeArray();
    if (Poker.start(game)) {
        //show how to score in the game
        $("#gamePoints").show();
        return true;
    } else {
        $("#notice").show();
        return false;
    }
}
