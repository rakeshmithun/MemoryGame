//Create an array of cards
let cards = ['fa fa-diamond', 'fa fa-diamond',
    'fa fa-paper-plane-o', 'fa fa-paper-plane-o',
    'fa fa-anchor', 'fa fa-anchor',
    'fa fa-bolt', 'fa fa-bolt',
    'fa fa-cube', 'fa fa-cube',
    'fa fa-bomb', 'fa fa-bomb',
    'fa fa-leaf', 'fa fa-leaf',
    'fa fa-bicycle', 'fa fa-bicycle'
];

//generate a card 
function generatedCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

//declare empty array as openCards
let openCards = [];

// declare variables for star icons
const stars = document.querySelectorAll(".fa-star");

// stars list
let starsList = document.querySelectorAll(".stars li");

//Select the deck of cards
const deck = document.getElementById("deck");

//declare the restart constant
const restart = document.getElementById("restart");

//select each card
let allCards = document.querySelectorAll('.card');

//declare the move variable
let moves = 0;
let counter = document.querySelector(".moves");

//select timer class
let timer = document.querySelector(".timer");

// close icon in modal
let closeicon = document.querySelector(".close");

// declare modal
let modal = document.getElementById("popup1")

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

initGame();

// function to intialise game
function initGame() {
    //set initial timer value
    timer.innerHTML = '0 mins 0 secs';
    //set initial star rating
    for (var i = 0; i < stars.length; i++) {
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }

    //deck selection and populating with generated card
    let deck = document.querySelector('.deck');
    let cardHTML = shuffle(cards).map(function(card) {
        return generatedCard(card);
    });
    deck.innerHTML = cardHTML.join('');
    allCards = document.querySelectorAll('.card');
    //card function
    allCards.forEach(function(card) {
        card.addEventListener('click', function(e) {
            openCards.push(card);
            card.classList.add('open', 'show', 'disabled');
            // setting move counter and matched/unmatched cards based on open cards length
            if (openCards.length === 2) {
                movesCounter();
                if (openCards[0].dataset.card === openCards[1].dataset.card) {
                    matched();
                } else {
                    unmatched();
                }
            }
        })
    });
};


// match the 2 cards that are open if they are of the same type
function matched() {
    openCards[0].classList.add("match", "disabled");
    openCards[1].classList.add("match", "disabled");
    openCards = [];
}

//all cards matched function which calls on the congrats modal function
//TODO: currently not returning the length 4 of matched cards
function allMatched() {
    let matchedCards = document.getElementsByClassName("match");
    if (matchedCards.length === 4) {
        console.log(fourcards);
        congratulations();
    }
}

//create an umatched function
function unmatched() {
    openCards[0].classList.add('unmatched');
    openCards[1].classList.add('unmatched');
    disable();
    setTimeout(function() {
        enable();
        openCards = [];
    }, 1100);
}

// restart the game and lopp into initialise game
function restartGame() {
    initGame();
    moves = 0;
    counter.innerHTML = moves;
    clearAllFunction();
    clearInterval(interval);
};

//clear timer function
function clearAllFunction() {
    second = 0;
    minute = 0;
    hour = 0;
    timer.innerHTML = "0 mins 0 secs";
};

// disable the unopened cards
function disable() {
    openCards[0].classList.add('disabled');
    openCards[1].classList.add('disabled');
    allCards.forEach(function(card) {
        card.classList.add('disabled');
    });
};

//enable all cards
function enable() {
    allCards.forEach(function(card) {
        card.classList.remove('disabled', 'open', 'show', 'unmatched');
    });
};

//declare timer variables
second = 0;
minute = 0;
hour = 0;
let interval;
let rating = 3;

//apply star rating function: 
function applyRating() {
    for (var i = 0; i < 3; i++) {
        stars[i].style.visibility = (i < rating) ? "show" : "collapse";
    }
}

//move counter function
function movesCounter() {
    moves++
    counter.innerHTML = moves;
    if (moves === 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    if (moves > 8 && moves < 12) {
        if (rating > 0) {
            rating--;
            applyRating();
        }
    } else if (moves > 13) {
        if (rating < 0) {
            applyRating();
        }
    }
}

//timer function
function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = minute + "mins " + second + "secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
};


// congratulations modal
function congratulations() {
    modal.classList.add('show');
    clearInterval(interval);
    finalTime = timer.innerHTML;
    // declare star rating variable
    var starRating = document.querySelector(".stars").innerHTML;
    //showing move, rating, time on modal
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;
    //closeicon on modal
    closeModal();
};


// close icon on modal
function closeModal() {
    modal.classList.remove("show");
    initGame();
};

// reset the game by clicking the play again button
function playAgain() {
    modal.classList.remove("show");
    initGame();
}