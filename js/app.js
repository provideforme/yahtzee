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
const dice = document.querySelectorAll("img");
const rollButton = document.getElementById("roll-btn");
const diceArea = document.getElementById("main-zone");
const diceKeptArea = document.getElementById("keep-zone");

const d1 = document.querySelector("#d1");
const d2 = document.querySelector("#d2");
const d3 = document.querySelector("#d3");
const d4 = document.querySelector("#d4");
const d5 = document.querySelector("#d5");
let numberDice = [d1, d2, d3, d4, d5]
/*----------------------------- Event Listeners -----------------------------*/
rollButton.addEventListener('click', roll);
diceArea.addEventListener('click', keepDie);


/*-------------------------------- Functions --------------------------------*/
function roll(){
  clickCount();
  diceRollAnimation();

}

function diceRollAnimation(){
  diceArea.style.visibility = "visible"
  currentRoll = []
  dice.forEach(function(die){
    die.classList.add("shake")
  });
  setTimeout(function(){
    dice.forEach(function(die){
      die.classList.remove("shake");
    });
    numberDice.forEach(function(die){
      let value = chooseRandomNumber();
      die.setAttribute("src", images[value], "value", dieValue[value[1]])
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
  dieToBeRemoved.parentNode.removeChild(dieToBeRemoved);
  diceKept.push(evt.target.id)
  currentRoll.splice(evt.target.id, 1)
  numberDice.splice(evt.target.id, 1)

  diceKeptArea.appendChild(evt.target)
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
      
      console.log(rollNumber);
      }
// loop through array
// if dice === currentRoll push to diceToRoll

// if rollCount > 3 cut it

//define the roll count

//remove currentRoll= []
//keep state (establish turns)
//write conditional tyhat rolls numberDice, for every other turn i am iterating over current roll.