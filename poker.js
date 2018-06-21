/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Poker = {
    room: new Array(),
    winner: new Array(),

    //these 2 variables will be used to check if 2 or more players have the same card;
    allGameCards: new Array(),
    CARDS: {"2c": 1, "2d": 2, "2h": 3, "2s": 4, "3c": 5, "3d": 6, "3h": 7, "3s": 8, "4c": 9, "4d": 10, "4h": 11, "4s": 12, "5c": 13, "5d": 14, "5h": 15, "5s": 16, "6c": 17, "6d": 18, "6h": 19, "6s": 20, "7c": 21, "7d": 22, "7h": 23, "7s": 24, "8c": 25, "8d": 26, "8h": 27, "8s": 28, "9c": 29, "9d": 30, "9h": 31, "9s": 32, "10c": 33, "10d": 34, "10h": 35, "10s": 36, jc: 37, jd: 38, jh: 39, js: 40, qc: 41, qd: 42, qh: 43, qs: 44, kc: 45, kd: 46, kh: 47, ks: 48, ac: 49, ad: 50, ah: 51, as: 52},
    CARDSREV: {1: "2c", 2: "2d", 3: "2h", 4: "2s", 5: "3c", 6: "3d", 7: "3h", 8: "3s", 9: "4c", 10: "4d", 11: "4h", 12: "4s", 13: "5c", 14: "5d", 15: "5h", 16: "5s", 17: "6c", 18: "6d", 19: "6h", 20: "6s", 21: "7c", 22: "7d", 23: "7h", 24: "7s", 25: "8c", 26: "8d", 27: "8h", 28: "8s", 29: "9c", 30: "9d", 31: "9h", 32: "9s", 33: "10c", 34: "10d", 35: "10h", 36: "10s", 37: "jc", 38: "jd", 39: "jh", 40: "js", 41: "qc", 42: "qd", 43: "qh", 44: "qs", 45: "kc", 46: "kd", 47: "kh", 48: "ks", 49: "ac", 50: "ad", 51: "ah", 52: "as"},
    //used to set values for suites
    SUITES: {"h": 0, "c": 1, "s": 2, "d": 3},
    SUITESREV: {0: "h", 1: "c", 2: "s", 3: "d"},

    //used to determine the winner
    GAME: {
        0: "high card",
        1: "pair",
        2: "two pairs",
        3: "three of kind",
        4: "straight",
        5: "flush",
        6: "full house",
        7: "four of a kind",
        8: "straight flush",
        9: "royal flush"
    },

    playGame: function (val) {
        //get the number of players
        var size = (val.length) / 2;


        //initialize variables
        Poker.room = new Array();
        Poker.winner = [[], [], [], [], [], [], [], [], [], []]; //create the array to save winners
        Poker.allGameCards = new Array();

        //check the game
        if (Poker.checkValidGame(val, size)) {
            console.log(Poker.room);
            console.log(Poker.winner);

            //check the winner
            for (var i = 9; i >= 0; i--) {
                if (Array.isArray(Poker.winner[i]) && Poker.winner[i].length) {
                    alert("Winner(s): " + Poker.winner[i] + "\nPoker Hand: " + Poker.GAME[i]);
                    break;
                }
            }


            return true;
        } else {
            return false;
        }
    },

    checkValidGame: function (game, n) {
        //initializing variables
        var valid = true;
        var msg = "";

        //run each hand to see if the player have 5 cards
        for (var i = 0; i <= n + 2; i += 2) {
            //get individual cards
            var cards = game[i + 1].value.split(',');
            var nCards = cards.length;

            //validation
            if (nCards < 5) {
                msg += "The player " + game[i].value + " has less than 5 cards \n";
                valid = false;
            } else if (nCards < 5) {
                msg += "The player " + game[i].value + " has more than 5 cards \n";
                valid = false;
            } else {
                //add the hand and check if there is any game
                let player = {};
                player.name = game[i].value;
                player.hand = cards;
                var newCards = Poker.checkPlayerGame(game[i].value, cards);
                if (!newCards) {
                    return false;
                }
                player.handTemp = newCards;
                player.gameNun = Poker.checkHand(newCards);
                player.game = Poker.GAME[player.gameNun];

                //console.log(player);

                //add the player to the game
                Poker.room.push(player);
                ;
                Poker.winner[player.gameNun].push(player.name);
            }

        }



        //if is there anyone withou 5 cards, stop the game and send the alert
        if (!valid) {
            alert(msg);
        }
        return valid;
    },

    checkPlayerGame: function (player, cards) {
        var newCards = new Array();
        var valid = true;
        var msg = "";

        for (var i = 0; i < 5; i++) {
            var temp = cards[i].toLowerCase().trim();

            //check if the card exists in the deck
            if (!(temp in Poker.CARDS)) {
                alert("The player " + player + " chose a card that does not exist: " + cards[i]);
                Poker.winner = false;
                return false;

                //check if someone else already chose the card (jQuery version)
            } else if (Poker.allGameCards.indexOf(Poker.CARDS[temp]) !== -1) {
                alert("The player " + player + " chose a card alredy taked for someone else: " + cards[i]);
                Poker.winner = false;
                return false;

                //everything is ok
            } else {
                Poker.allGameCards.push(Poker.CARDS[temp]);
                //check the new card value
                newCards[i] = Poker.checkCardValue(temp);
            }
        }

        //help to check for pairs and sequence
        newCards.sort();

        return newCards;
    },

    checkHand: function (cards) {
        var hand = 0;
        var pairs = 0, threes = 0, fours = 0;
        var flush = false, straight = false;

        //will help to check for a flush
        var suits = [0, 0, 0, 0];
        //will help to check for pairs, threes, fours
        var sames = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        //help to compare games
        var newCardsNumbers = new Array(5);


        //go through all the cards
        for (var i = 0; i < 5; i++) {
            //separate number and suites
            var cardNumber = parseInt(cards[i]);
            var cardSuite = Poker.SUITES[cards[i].slice(-1)];

            //have an array without suites
            newCardsNumbers[i] = cardNumber;
            //update matched for cards
            sames[cardNumber]++;
            //update suits for cards
            suits[cardSuite]++;
        }

        //fixing JS ordering bug when has number and letters (10S, AS ==> 10S, 1S)
        newCardsNumbers.sort(Poker.sorter);

        //check for pairs, threes and fours
        for (var i = 0; i < 13; i++) {
            if (sames[i] === 2) {
                pairs++;
            } else if (sames[i] === 3) {
                threes++;
            } else if (sames[i] === 4) {
                fours++;
            }
        }

        //check for a flush
        for (var i = 0; i < 4; i++) {
            if (suits[i] === 5) {
                flush = true;
            }
        }

        //console.log(newCardsNumbers);

        //check for Royal Flush (10, J=12, Q=12, K=13, A=1)
        if (newCardsNumbers[4] - newCardsNumbers[1] === 3 && //checking 10, J, Q, K / sequence
                newCardsNumbers[4] - newCardsNumbers[0] === 12) { //checking for K and A
            if (flush) {
                hand = 9;
            } else {
                hand = 4;
            }
        } else if (newCardsNumbers[4] - newCardsNumbers[0] === 4) { //check for straight and straight flush (sequence)
            if (flush) {
                hand = 8;
            } else {
                hand = 4;
            }
        } else if (fours === 1) {
            hand = 7;
        } else if (threes === 1 && pairs === 1) {
            hand = 6;
        } else if (flush) {
            hand = 5;
        } else if (threes === 1) {
            hand = 3;
        } else if (pairs === 2) {
            hand = 2;
        } else if (pairs === 1) {
            hand = 1;
        }

        return hand;

    },

    //Javascript sorts alphabetically. This means that "10" is lower than "5", because "1" is lower than "5".
    sorter: function (a, b) {
        return a - b;
    },

    //helps to order and check card sequence
    checkCardValue: function (card) {
        var value = "";
        switch (card) {
            case "jc":
                value = "11c";
                break;
            case "jd":
                value = "11d";
                break;
            case "jh":
                value = "11h";
                break;
            case "js":
                value = "11s";
                break;
            case "qc":
                value = "12c";
                break;
            case "qd":
                value = "12d";
                break;
            case "qh":
                value = "12h";
                break;
            case "qs":
                value = "12s";
                break;
            case "kc":
                value = "13c";
                break;
            case "kd":
                value = "13d";
                break;
            case "kh":
                value = "13h";
                break;
            case "ks":
                value = "13s";
                break;
            case "ac":
                value = "1c";
                break;
            case "ad":
                value = "1d";
                break;
            case "ah":
                value = " 1h";
                break;
            case "as":
                value = "1s";
                break;
            default:
                value = card;
        }
        return value;
    },

    //helps to order and check card sequence
    checkCardValueReversal: function (card) {
        var value = "";
        switch (card) {
            case "11c":
                value = "jc";
                break;
            case "11d":
                value = "jd";
                break;
            case "11h":
                value = "jh";
                break;
            case "11s":
                value = "js";
                break;
            case "qc":
                value = "qc";
                break;
            case "12d":
                value = "qd";
                break;
            case "12h":
                value = "qh";
                break;
            case "12s":
                value = "qs";
                break;
            case "13c":
                value = "kc";
                break;
            case "13d":
                value = "kd";
                break;
            case "13h":
                value = "kh";
                break;
            case "13s":
                value = "ks";
                break;
            case "1c":
                value = "ac";
                break;
            case "1d":
                value = "ad";
                break;
            case "1h":
                value = " ah";
                break;
            case "1s":
                value = "as";
                break;
            default:
                value = card;
        }
        return value;
    },
    

    //used to generate CARDSREV from CARDS
    swap: function (json) {
        var ret = {};
        for (var key in json) {
            ret[json[key]] = key;
        }
        return ret;
    }
};
