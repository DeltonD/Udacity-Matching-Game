var started = false;
var moves = 0;
var stars = 3;
var timer = 0;
var interval;
var match = 0;
var starsE = document.getElementsByClassName("stars")[0];
var counter = document.getElementsByClassName("moves")[0];
var timerE = document.getElementsByClassName("timer")[0];
var deck = document.getElementsByClassName("deck")[0];
var cards = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];
cards = cards.concat(cards);

var currentCard;

/**
* Create all the cards and assign their icons
* Set the click listener on each card
*/
function InitDeck(){
    for(var i = 0; i < 16; i++){
        var icon = document.createElement("i");
        icon.setAttribute("class", "fa fa-" + cards[i]);

        var card = document.createElement("li");
        card.setAttribute("class", "card");
        card.setAttribute("id", i);
        card.addEventListener("click", cardClick);
        card.append(icon);

        var cardc = document.createElement("div");
        cardc.setAttribute("class", "cardcontainer");
        cardc.append(card);

        deck.append(cardc);
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/**
* The start function starts the time counter, suffle the cards and init the deck.
* The for adds the 3 stars to the panel.
* When the time function is called, the timer is updated and so the element that shows its value.
*/
function start(){
    interval = setInterval(time, 1000);
    cards = shuffle(cards);
    InitDeck();

    for(i = 0; i < 3; i++){
        starsE.innerHTML += '<li><i class="fa fa-star"></i></li>';
    }

}

function time(){
    if(started){
        timer++;
        timerE.textContent = timer;
    }else{
        timerE.textContent = 0;
    }
}

/**
* The restart function resets all the stats, clean the deck and restarts the time counter.
* Then the start function is called to restart the game.
*/
function restart(){
    document.getElementsByClassName("popup")[0].style.display = "none";
    deck.innerHTML = "";
    starsE.innerHTML = "";
    timer = 0;
    moves = 0;
    stars = 3;
    match = 0;
    currentCard = null;
    counter.textContent = moves;
    started = false;
    clearInterval(interval);
    start();
}

/**
* These functions change the cards classes according with the result.
* The first one change the card class to "show", so the card flips.
* The last one also count on combinations, and if there is already 8, the player wins.
*/
function showCard(c){
    c.target.className = "card show";
    deck.style.pointerEvents = "none";
    window.setTimeout(function(){
        deck.style.pointerEvents = "auto";
    }, 1000);
}
function Wrong(card, currentc){
    card.className = "card wrong";
    currentc.className = "card wrong";
    window.setTimeout(function(){
        card.className = "card close";
        currentc.className= "card close";
    }, 500);
}
function Match(card, currentc){
    card.className = "card match";
    currentc.className = "card match";
    match++;
    if(match == 8){
        win();
    }
}

function win(){
    clearInterval(interval);
    var popup = document.getElementsByClassName("popup")[0];
    popup.children[2].textContent = `With ${moves} Moves and ${stars} Stars in ${timer} Minutes.`;
    popup.style.display = "flex";
}

/**
* The cardClick function checks if the clicked card and the previously stored one are the same, if so, the Match function is called, if not, the Wrong function.
* The function also calls the updateScore function, that will increase the move counter and update the star rating when needed.
*/
function cardClick(c){
    showCard(c);
    if(!started) started = true;
    var card = c.target;
    if(currentCard == null){
        currentCard = card;
    }else{
        updateScore();
        if(cards[card.id] === cards[currentCard.id]){
            Match(card, currentCard);
        }else{
            Wrong(card, currentCard);
        }
        currentCard = null;
    }
}

function updateScore(){
    moves++;
    counter.textContent = moves;
    if(Number.isInteger((moves/10))){
        if(stars > 0){
            stars = 3 - (moves/10);
        }
        if(stars < 3){
            document.getElementsByClassName("fa fa-star")[stars].className = "fa fa-star-o";
        }
    }
}

start();

