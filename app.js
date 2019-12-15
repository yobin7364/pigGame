var scores, roundScore, activePlayer, gamePlaying, randomNo, fallPoint;
var ini = () => {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    fallPoint = 1;
    gamePlaying = true;
    document.querySelector('.die-list').dataset.roll = 1;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector(".numberLimit").style.display = "block";
    document.querySelector(".final-score").style.display = "block";
    document.querySelector(".fixedFallPoint").style.display = "none";
    document.querySelector(".numberLimit").style.display = "none";
}

document.querySelector('.btn-new').addEventListener('click', ini);

//fall point 
document.querySelector(".final-score").addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        fallPoint = document.querySelector(".final-score").value;
        if (fallPoint >= 1 && fallPoint <= 6) {
            document.querySelector(".final-score").style.display = "none";
            document.querySelector(".fixedFallPoint").style.display = "block";
            document.querySelector(".numberLimit").style.display = "none";
            document.getElementById("fallNo").innerHTML = fallPoint;
        } else {
            document.querySelector(".numberLimit").style.display = "block";
        }
    }
})

function rollDice() {
    const dice = document.querySelectorAll(".die-list");
    dice.forEach(die => {
        //toggles with all the classes of dice
        toggleClasses(die);
        randomNo = getRandomNumber(1, 6);
        die.dataset.roll = randomNo;
    });
    // 3. Update the round score IF the rolled number was NOT a 1
    if (randomNo !== parseInt(fallPoint)) {
        //Add score
        roundScore += randomNo;
        setTimeout(() => {
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }, 1250);

    } else {
        //Next player
        nextPlayer();
    }

}


var nextPlayer = () => {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    // document.getElementById('current-0').textContent = '0';
    // document.getElementById('current-1').textContent = '0';

    setTimeout(() => {
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
    }, 1250);

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    // document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= 30) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});


function toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
}

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.getElementById("roll-button").addEventListener("click", rollDice);

// call 
ini();