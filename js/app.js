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

let card = document.getElementsByClassName("cards");

//Generate a card
function generatedCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

//Select the deck of cards
const deck = document.getElementById("deck");

//declare the restart constant
const restart = document.getElementById("restart");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let openCards = [];
let allCards = document.querySelectorAll('.card');

initGame();

function initGame() {
    let deck = document.querySelector('.deck');
    let cardHTML = shuffle(cards).map(function(card) {
        return generatedCard(card);
    });

    deck.innerHTML = cardHTML.join('');
    allCards = document.querySelectorAll('.card');

    allCards.forEach(function(card) {
        card.addEventListener('click', function(e) {
            //if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match') && card.classList.contains('unmatched'));
            openCards.push(card);
            card.classList.add('open', 'show', 'disabled');

            if (openCards.length === 2) {
                if (openCards[0].dataset.card === openCards[1].dataset.card) {
                    matched();
                } else {
                    unmatched();
                }
            }
        });
    });
}

// match the 2 cards that are open if they are of the same type
function matched() {
    openCards[0].classList.add("match", "disabled");
    openCards[1].classList.add("match", "disabled");
    openCards = [];
};

//create an umatched function
function unmatched() {
    openCards[0].classList.add('unmatched');
    openCards[1].classList.add('unmatched');
    disable();
    setTimeout(function() {
        enable();
        openCards = [];
    }, 1100);
};

// restart the game and lopp into initialise game
function restartGame() {
    initGame();
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