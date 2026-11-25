
/* Variables to store scores and game results */
var wins = 0;
var losses = 0;
var draws = 0;
var results = [];
var round = 0;
var gameStarted = false;

/* Start Game */
function startGame() {
    var name = document.getElementById("playerName").value;

    if (name == "") {
        alert("Please enter your name.");
        return;
    }

    gameStarted = true;

    document.getElementById("welcome").innerHTML =
        "Welcome, " + name + "!";

    document.getElementById("startTime").innerHTML =
        "Game started on: " + new Date();
}

/* Get random computer choice */
function getComputerChoice() {
    var choices = ["rock", "paper", "scissors"];

    var randomIndex = Math.floor(Math.random() * 3);

    return choices[randomIndex];
}

/* Play one round */
function playRound(playerChoice) {

    if (gameStarted == false) {
        alert("Click Start Game first.");
        return;
    }

    var computerChoice = getComputerChoice();
    var result;

    round++;

    /* Decide the winner */
    if (playerChoice == computerChoice) {
        result = "Draw";
        draws++;
    }
    else if (
        (playerChoice == "rock" && computerChoice == "scissors") ||
        (playerChoice == "scissors" && computerChoice == "paper") ||
        (playerChoice == "paper" && computerChoice == "rock")
    ) {
        result = "Win";
        wins++;
    }
    else {
        result = "Lose";
        losses++;
    }

    /* Change images */
    document.getElementById("playerImg").src =
        playerChoice + ".png";

    document.getElementById("computerImg").src =
        computerChoice + ".png";

    /* Display result and colour */
    document.getElementById("result").innerHTML =
        "You chose " + playerChoice +
        ". Computer chose " + computerChoice +
        ". You " + result + "!";

    if (result == "Win") {
        document.getElementById("result").style.color = "green";
    }
    else if (result == "Lose") {
        document.getElementById("result").style.color = "red";
    }
    else {
        document.getElementById("result").style.color = "grey";
    }

    /* Update scoreboard */
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    /* Store result in array */
    results.push(result);

    /* Add round to history table */
    document.getElementById("history").innerHTML +=
        "<tr>" +
        "<td>" + round + "</td>" +
        "<td>" + playerChoice + "</td>" +
        "<td>" + computerChoice + "</td>" +
        "<td>" + result + "</td>" +
        "</tr>";
}

/* Show game summary */
function showSummary() {

    var totalRounds = results.length;
    var totalWins = 0;

    /* Count total wins using for loop */
    for (var i = 0; i < results.length; i++) {
        if (results[i] == "Win") {
            totalWins++;
        }
    }

    var percentage = 0;

    if (totalRounds > 0) {
        percentage = Math.round((totalWins / totalRounds) * 100);
    }

    document.getElementById("summary").innerHTML =
        "You played " + totalRounds +
        " rounds and won " + percentage + "%.";
}

/* Reset game */
function resetGame() {

    wins = 0;
    losses = 0;
    draws = 0;
    round = 0;
    results = [];
    gameStarted = false;

    /* Reset scoreboard */
    document.getElementById("wins").innerHTML = 0;
    document.getElementById("losses").innerHTML = 0;
    document.getElementById("draws").innerHTML = 0;

    /* Clear history except header */
    document.getElementById("history").innerHTML =
        "<tr>" +
        "<th>Round</th>" +
        "<th>You</th>" +
        "<th>Computer</th>" +
        "<th>Result</th>" +
        "</tr>";

    /* Clear result and summary */
    document.getElementById("result").innerHTML = "";
    document.getElementById("summary").innerHTML = "";
    document.getElementById("welcome").innerHTML = "";
    document.getElementById("startTime").innerHTML = "";

    /* Reset images */
    document.getElementById("playerImg").src = "rock.png";
    document.getElementById("computerImg").src = "rock.png";
}
