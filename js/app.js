/*-------------------------------- Constants --------------------------------*/

let images = [
  "../images/Dice-1-b.svg",
  "../images/Dice-2-b.svg",
  "../images/Dice-3-b.svg",
  "../images/Dice-4-b.svg",
  "../images/Dice-5-b.svg",
  "../images/Dice-6a-b.svg"
];

/*-------------------------------- Variables --------------------------------*/
let diceInPlay = []; //all potential dice
let currentRoll = [];




/*------------------------ Cached Element References ------------------------*/
const dice = document.querySelectorAll("img");
const rollButton = document.getElementById("roll-btn");
const diceArea = document.getElementById("main-zone")
const d1 = document.querySelector("#d1");
const d2 = document.querySelector("#d2");
const d3 = document.querySelector("#d3");
const d4 = document.querySelector("#d4");
const d5 = document.querySelector("#d5");
const numberDice = [d1, d2, d3, d4, d5]
console.log(d1)
/*----------------------------- Event Listeners -----------------------------*/
rollButton.addEventListener('click', roll);
diceArea.addEventListener('click', removeFromMain);


/*-------------------------------- Functions --------------------------------*/
function roll(){
  diceRollAnimation();
}

function diceRollAnimation(){
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
      die.setAttribute("src", images[value]);
      currentRoll.push(value)
    });
  }, 1000);
  console.log(currentRoll)
}

function chooseRandomNumber(){
  let number = Math.floor((Math.random() * 6));

  return number
} 

function removeFromMain(evt){
  let ele = evt.target.id

  console.log(ele)
}

