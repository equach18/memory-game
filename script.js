const gameContainer = document.getElementById("game");
const startBtn = document.querySelector("button");
const restartBtn = document.getElementById("restart");
const outputCounter = document.getElementById("output"); 
let numOfTries = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);

    //output of number of guesses the user has done
    outputCounter.innerHTML = `Number of Guesses: ${numOfTries || 0}`;
  }
}


let card1 = null;
let card2 = null;
let numOfMatches = 0;
let flipped = false;
let noClicking = false; 


// TODO: Implement this function!
function handleCardClick(event) {
  if(noClicking) return;
  //changes card color background color to color of the class
  const currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.className;
  

  if(!flipped){
    card1 = card1?? currentCard; 
    flipped = true;
    numOfTries++;
  }
  else if(card1 !== currentCard && !card2){
    card2 = currentCard;
    card2.style.backgroundColor = currentCard.className;
    flipped = false;
    numOfTries++;
  }

 
  if(card1 && card2){
    let tempCard1 = card1;
    let tempCard2 = card2;
    
    if(tempCard1.className === tempCard2.className){
      numOfMatches++;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1.style.backgroundColor = card1.className;
      card2.style.backgroundColor = card2.className;
      card1 = null;
      card2 = null;
    }
    else{
      noClicking = true;
      setTimeout(function() {
        noClicking = false;
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1 = null;
        card2 = null;
      }, 1000);
    }
  }
  
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);

  outputCounter.innerHTML = `Number of Guesses: ${numOfTries}`;
  if(numOfMatches*2 === COLORS.length) alert('YOU WIN!');
}


// when the DOM loads

//start button
startBtn.addEventListener('click', function startGame(){
  createDivsForColors(shuffledColors);
  startBtn.removeEventListener('click', startGame);
});
//restart button 
restartBtn.addEventListener('click', function restartGame(){
  numOfTries = 0;
  gameContainer.innerHTML = "";
  createDivsForColors(shuffledColors);
  numOfMatches = 0;
});
