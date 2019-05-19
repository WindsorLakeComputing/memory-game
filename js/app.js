/*
 * Create a list that holds all of your cards
 */
let restart = document.getElementsByClassName("restart");
let deck = document.getElementsByClassName("deck")[0];
let cards = deck.getElementsByTagName("li");
let openedCards = [];
let movesElement = document.getElementsByClassName("moves")[0]
let numMoves = 0;
let finishedGame = document.getElementById("finishedGame");

restart[0].addEventListener("click", resetBoard);


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length,
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

 function flipCard(card) {
    if(! card.getElementsByTagName("i")[0].parentElement.className.includes("match")){
    if(openedCards.length == 0){
        openedCards.push(card)
        card.className += " show open";
    }
    else if(openedCards.length == 1){
        openedCard = openedCards.pop(); 
        console.log("openedCard == ", openedCard)
        console.log("[0].className.parentElement", openedCard.getElementsByTagName("i")[0].parentElement)
         //openedCard.getElementsByTagName("i")[0].parentElement.classList.remove("open", "show");
         //card.getElementsByTagName("i")[0].parentElement.classList.remove("open", "show");
         numMoves += 1;
         movesElement.innerHTML = numMoves;
        if(openedCard.getElementsByTagName("i")[0].className == card.getElementsByTagName("i")[0].className){
            openedCard.removeEventListener('click', flipCard);
            //card.getElementsByTagName("i")[0].removeEventListener('click', function, false);
            openedCard.getElementsByTagName("i")[0].parentElement.classList.remove("open", "show");
            card.getElementsByTagName("i")[0].parentElement.classList.remove("open", "show");
            openedCard.getElementsByTagName("i")[0].parentElement.className += " match"
            card.getElementsByTagName("i")[0].parentElement.className += " match"
            console.log("It's a MATCH!!!!")
            openedCards.length = 0;
            if(deck.getElementsByClassName("match").length == 16){
                console.log("deck.getElementsByClassName().className.length")
                console.log(deck.getElementsByClassName("match").length)
                finishedGame.style.display = "block";

            }
        }
        else{
            card.className += " show open";
            setTimeout(function(){ 
                card.classList.remove("open", "show"); 
                openedCard.classList.remove("open", "show")
            }, 250);

            
            console.log("moves: ", numMoves);
            
            //openedCard.remove("open", "show")
            //card.remove("open", "show")
        }
        //openCards.length = 0;

    }
    
    
    console.log("This element was clicked: ", card)
    
    console.log("The OPEN cards are ", openedCards)
 }

}



function resetBoard() {
    finishedGame.style.display = "none";
    cards = shuffle(Array.from(cards))
    while (deck.firstChild) {
        deck.removeChild(deck.firstChild);
    }
    for (const card of cards) {
        card.classList.remove("match", "open", "show")
        card.addEventListener("click", function(){
        console.log("card.classList ",card.classList )
        flipCard(card);
    }, false);
        deck.appendChild(card)
    }
}