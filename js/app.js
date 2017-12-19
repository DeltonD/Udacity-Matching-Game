/*
 * Create a list that holds all of your cards
 */
var play = true;
var moves = 0;
var stars = 3;
var timer = 0;
var matchs = 0;
var counter = document.getElementsByClassName("moves")[0];
var timerE = document.getElementsByClassName("timer")[0];
var deck = document.getElementsByClassName("deck")[0];
var cards = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb", "diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];
cards = shuffle(cards);

var currentCard;

//Create all the cards and assign their icons

function InitDeck(){
    for(var i = 0; i < 16; i++){
        var cardc = document.createElement("div");
        cardc.setAttribute("class", "cardcontainer");
    
        var card = document.createElement("li");
        card.setAttribute("class", "card");
        card.setAttribute("id", i);
        var icon = document.createElement("i");
        icon.setAttribute("class", "fa fa-" + cards[i]);

        card.append(icon);
        cardc.append(card);
        deck.append(cardc);
    }
}
InitEventSystem();
start();
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
function start(){
    setInterval(time, 1000);
    InitDeck();
}
function restart(){
    deck.innerHTML = "";
    timer = 0;
    counter = 0;
    stars = 3;
    start();
    
}
function time(){
    timer++;
    timerE.textContent = timer;
}
function showCard(c){
    c.target.className = "card show";
}
function Wrong(card, currentc){
    card.className = "card wrong";
    currentc.className = "card wrong";
}
function Match(card, currentc){
    card.className = "card match";
    currentc.className = "card match";
    matchs++;
    if(matchs == 8){
        win();
    }
}
function win(){
    var popup = document.getElementsByClassName("popup")[0];
    popup.children[2].textContent = "With " + moves + " Moves and " + stars + " Stars.";
    popup.style.display = "flex";
    
    
}
function cardClick(c){
    var card = c.target;
    if(currentCard == null){
        currentCard = card;
    }else{
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
        if(cards[card.getAttribute("id")] === cards[currentCard.getAttribute("id")]){
            Match(card, currentCard);   
        }else{
            Wrong(card, currentCard);
        }
        currentCard = null;
    }
}
/*
When triggered calls the function that shows the card and the function that checks if there is a match
*/
function InitEventSystem(){
    deck.addEventListener("animationstart", (e)=>{
        play = false;
    });
    deck.addEventListener("animationend", (e) => {
        play = true;
        var c = e.target.className;
        if(c == "card wrong"){
            e.target.className = "card close";
        }
    });
    deck.addEventListener("click", (e) => {
        if(play){
            showCard(e); 
            cardClick(e);
        }
    });
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
