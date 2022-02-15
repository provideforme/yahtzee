/*-------------------------------- Constants --------------------------------*/
let dieOne =  "../images/Dice-1-b.svg"
let dieTwo= "../images/Dice-2-b.svg"
let dieThree = "../images/Dice-3-b.svg"
let dieFour = "../images/Dice-4-b.svg"
let dieFive = "../images/Dice-5-b.svg"
let dieSix = "../images/Dice-6a-b.svg"

let dieValue = {
  dieOne: 1,
  dieTwo: 2,
  dieThree: 3,
  dieFour: 4,
  dieFive: 5,
  dieSix: 6,
}

let images = [
  dieOne,
  dieTwo,
  dieThree,
  dieFour,
  dieFive,
  dieSix
];

//key value pairs. each image needs a value.

/*-------------------------------- Variables --------------------------------*/
let diceInPlay = []; //all potential dice
let currentRoll = [];
let diceKept = [];
let diceToRoll = [];
let count = 0
let rollNumber = 0





/*------------------------ Cached Element References ------------------------*/
const rollButton = document.getElementById("roll-btn");
const diceArea = document.getElementById("main-zone");
const diceKeptArea = document.getElementById("keep-zone");

const d1 = document.querySelector("#d1");
const d2 = document.querySelector("#d2");
const d3 = document.querySelector("#d3");
const d4 = document.querySelector("#d4");
const d5 = document.querySelector("#d5");
const diceArray = document.querySelectorAll(".diceIMG")
let numberDice = Array.from(diceArray)

/*----------------------------- Event Listeners -----------------------------*/
rollButton.addEventListener('click', roll);
diceArea.addEventListener('click', keepDie);


/*-------------------------------- Functions --------------------------------*/
function roll(){
  diceRollAnimation();
  
}

function diceRollAnimation(){
  clickCount();
  diceArea.style.visibility = "visible"


  currentRoll = []
  numberDice.forEach(function(die){
    die.classList.add("shake")
  });
  setTimeout(function(){
    numberDice.forEach(function(die){
      die.classList.remove("shake");
    });
    numberDice.forEach(function(die){
      const randomIndex = chooseRandomNumber();
      const value = randomIndex + 1
      die.src = images[randomIndex]
      die.setAttribute("id", randomIndex + 1)
      console.log("die", die)
      currentRoll.push(value)
    });
  }, 1000);
  // console.log(currentRoll)
}

function chooseRandomNumber(){
  let number = Math.floor(Math.random() * 6);

  return number
} 

function keepDie(evt) {
  let dieToBeRemoved = document.getElementById(evt.target.id);
  console.log("dieToBeRemoved: ", dieToBeRemoved);
  dieToBeRemoved.parentNode.removeChild(dieToBeRemoved);
  console.log(dieToBeRemoved.parentNode);
  console.log(
    "currentRoll: ", currentRoll,
    "numberDice: ", numberDice,
  );
  
  const id = parseInt(evt.target.id.replace("d", ""))
  const index = currentRoll.indexOf(id)
  console.log(index)
  currentRoll.splice(index, 1);
  // const ndIdx = numberDice.indexOf(id);
  // numberDice.splice(ndIdx, 1);
  console.log(
    "currentRoll: ", currentRoll,
    "numberDice: ", numberDice,
  );

  diceKeptArea.appendChild(dieToBeRemoved)
}


function clickCount(){

    if(count === 0 || count === 1){
      count += 1;
      rollNumber += 1;
    } else if (
      count === 2
      )
      {
      rollNumber += 1;
      rollButton.removeEventListener('click', roll)
    }
      }

// create a class for the images, dont just use IMG
// remove class in keepdie, so it doesn't animate.

// loop through array
// if dice === currentRoll push to diceToRoll
//remove currentRoll= []
//keep state (establish turns)
//write conditional tyhat rolls numberDice, for every other turn i am iterating over current roll.

//create an array that shows all current scoreabledie other turn i am iterating over current roll.

//create an array that shows all current scoreabledie