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
const scoreSheet = document.getElementById("score-sheet")

/*----------------------------- Event Listeners -----------------------------*/
rollButton.addEventListener('click', roll);
diceArea.addEventListener('click', keepDie);
diceKeptArea.addEventListener('click', returnDie);
scoreSheet.addEventListener('click', changeScore)


/*-------------------------------- Functions --------------------------------*/
function roll(){
  clickCount()
  if(rollNumber > 3) return
  while(diceArea.firstChild){
    diceArea.removeChild(diceArea.lastChild)
  }
  if(currentRoll.length){
    const length = currentRoll.length
    currentRoll = [1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,5,5,5,5,5,5,6,6,6,6,6,6]
    currentRoll = shuffleOrder(currentRoll)
    currentRoll = currentRoll.splice(0, length)
    updateScoreableDie()
    rollAnimation()
  } else {
    currentRoll = [1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,5,5,5,5,5,5,6,6,6,6,6,6]
    currentRoll = shuffleOrder(currentRoll)
    currentRoll = currentRoll.splice(0, 5)
    updateScoreableDie()
    rollAnimation()
  }
}

function rollAnimation(){
  currentRoll.forEach(die => createDie(die))
  setTimeout(function(){
    for(let i = 0; i < diceArea.childNodes.length; i++ ){
      diceArea.childNodes[i].classList.remove("shake")
    }
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
    console.log(arr)
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
  updateScoreableDie()
  console.log(getTotal())
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
  updateScoreableDie()
}

function updateScoreableDie(){
  diceInPlay = currentRoll.concat(keptDice)
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

let scoreSheetArray = [];
for (let i = 1; i < 14; i++) {
  scoreSheetArray[i] = document.getElementById(i + "-score");
  }

let potentialScoreArray = [];
for (let i = 1; i < 14; i++) {
    potentialScoreArray[i] = scoreSheetArray[i].nextSibling.nextSibling;
  }

function isInArray(value, array) {
  return array.indexOf(value) > -1;
  }

function getTotal () {
  let arrayTotal = diceInPlay.reduce(function(previousValue, currentValue) {
    return previousValue + currentValue;
  });
  return arrayTotal
}

function changeScore(params) {
  
}


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