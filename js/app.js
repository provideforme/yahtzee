/*-------------------------------- Constants --------------------------------*/
const diceObject = {
  1: "../images/Dice-1-b.svg",
  2: "../images/Dice-2-b.svg",
  3: "../images/Dice-3-b.svg",
  4: "../images/Dice-4-b.svg",
  5: "../images/Dice-5-b.svg",
  6: "../images/Dice-6a-b.svg"
}

//key value pairs. each image needs a value.

/*-------------------------------- Variables --------------------------------*/
let diceInPlay = []; //all potential dice
let currentRoll = [];
let keptDice = [];
let diceToRoll = [];
let count = 0
let rollNumber = 0





/*------------------------ Cached Element References ------------------------*/
const rollButton = document.getElementById("roll-btn");
const diceArea = document.getElementById("dice-area");
const diceKeptArea = document.getElementById("keep-zone");

/*----------------------------- Event Listeners -----------------------------*/
rollButton.addEventListener('click', roll);
diceArea.addEventListener('click', keepDie);
diceKeptArea.addEventListener('click', returnDie);


/*-------------------------------- Functions --------------------------------*/
function roll(){
  clickCount()
  if(rollNumber > 3) return
  while(diceArea.firstChild){
    diceArea.removeChild(diceArea.lastChild)
  }
  if(currentRoll.length){
    const length = currentRoll.length
    currentRoll = [1,2,3,4,5,6]
    currentRoll = shuffleOrder(currentRoll)
    currentRoll = currentRoll.splice(0, length)
    rollAnimation()
  } else {
    currentRoll = [1,2,3,4,5,6]
    currentRoll = shuffleOrder(currentRoll)
    currentRoll.pop()
    rollAnimation()
  }
}

function rollAnimation(){
  currentRoll.forEach(die => createDie(die))
  setTimeout(function(){
    currentRoll.forEach(function(die){
      document.getElementById(die).classList.remove("shake")
    });
  }, 1000);
}

function createDie(value){
  const die = document.createElement("img")
  die.classList.add("diceIMG", "shake", "die")
  die.id = value
  die.src = diceObject[value]
  diceArea.appendChild(die)
}


function shuffleOrder(arr) {
  // Fisher-Yates - Source: Instructors
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  return arr
}


function keepDie(evt) {
  let dieToBeRemoved = document.getElementById(evt.target.id);
  dieToBeRemoved.parentNode.removeChild(dieToBeRemoved);
  
  const id = parseInt(evt.target.id)
  const index = currentRoll.indexOf(id)
  console.log(index)
  currentRoll.splice(index, 1);
  keptDice.push(id)
  diceKeptArea.appendChild(dieToBeRemoved)
  console.log(keptDice)
}

function returnDie(evt) {
  let dieToBeReturned = document.getElementById(evt.target.id);
  dieToBeReturned.parentNode.removeChild(dieToBeReturned);
  
  const id = parseInt(evt.target.id)
  const index = keptDice.indexOf(id)
  console.log(index)
  keptDice.splice(index, 1);
  currentRoll.push(id)
  diceArea.appendChild(dieToBeReturned)
  console.log(keptDice)
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

// function diceRollAnimation(){
//   clickCount();
//   diceArea.style.visibility = "visible"
//   console.log(rollNumber);
//   if(rollNumber === 1){
//     currentRoll = []
//     numberDice.forEach(function(die){
//       die.classList.add("shake")
//     });
//     setTimeout(function(){
//       numberDice.forEach(function(die){
//         die.classList.remove("shake");
//       });
//       numberDice.forEach(function(die){
//         const randomIndex = chooseRandomNumber();
//         const value = randomIndex + 1
//         die.src = images[randomIndex]
//         die.setAttribute("id", randomIndex + 1)
//         console.log("die", die)
//         currentRoll.push(value)
//       });
//     }, 1000);}
//     else if (rollNumber > 1){
//       currentRoll.forEach(function(die){
//         die.classList.add("shake")
//       }, 1000);
//   }
//   // console.log(currentRoll)
// }