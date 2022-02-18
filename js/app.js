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
let diceInPlay = [];
let currentRoll = [];
let keptDice = [];
let count = 0
let rollNumber = 0
let upperScore = 0
let lowerScore = 0
let sum = 0
let turn = 1






/*------------------------ Cached Element References ------------------------*/
const rollButton = document.getElementById("roll-btn");
const diceArea = document.getElementById("dice-area");
const diceKeptArea = document.getElementById("keep-zone");
const scoreSheet = document.getElementById("score-sheet")
const potentialScore = document.querySelectorAll("potential-score")
const scoreTable = document.getElementById("-sum")
const upperScoreBonus = document.getElementById("upper-bonus-score")


/*----------------------------- Event Listeners -----------------------------*/
rollButton.addEventListener('click', roll);

diceKeptArea.addEventListener('click', returnDie);


/*-------------------------------- Functions --------------------------------*/
function roll(){
  diceArea.addEventListener('click', keepDie);
  clickCount()
  scoreSheet.addEventListener('click', changeScore)
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
  }, 750);
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
  currentRoll.splice(index, 1);
  keptDice.push(id)
  diceKeptArea.appendChild(dieToBeRemoved)
  updateScoreableDie()
}

function returnDie(evt) {
  let dieToBeReturned = document.getElementById(evt.target.id);
  dieToBeReturned.parentNode.removeChild(dieToBeReturned);
  const id = parseInt(evt.target.id)
  const index = keptDice.indexOf(id)
  currentRoll.push(keptDice.splice(index, 1)[0])
  diceArea.appendChild(dieToBeReturned)
  updateScoreableDie()
}

function updateScoreableDie(){
  diceInPlay = currentRoll.concat(keptDice)
  console.log(diceInPlay)
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

    
function changeScore(evt) {
  if (evt.target.innerText === "") {
    let values
    
    let cellNum = parseInt(evt.target.id)
    
    scoreableCell = cellNum + "-sum"
    
    let scoreableNums =  diceInPlay.filter(num => num === cellNum)
    
    const keepScore = document.getElementById(scoreableCell)
    
    if(scoreableNums.length) {
      
      sum = scoreableNums.reduce((prev, cur) => prev + cur, 0)
      keepScore.innerText = sum
      upperScore += sum
      if(upperScore >= 63){
        upperScore += 35
        upperScoreBonus.innerText = 35
        console.log(upperScore)
      }
    } else {
      keepScore.innerText = 0
    }

    if(!scoreableNums.length && scoreableCell === "7-sum"){
      values = diceInPlay.reduce((obj, dice) => {
        if (obj[dice]) {
          obj[dice]++
        }else {
          obj[dice] = 1
        }
        return obj
      }, {})
      
      let obVal = Object.values(values)
      if(obVal.includes(3)){
        
        sum = diceInPlay.reduce((prev, cur) => prev + cur, 0)
        
        keepScore.innerText = sum
        lowerScore += sum
      } else {
        keepScore.innerText = 0
        lowerScore += sum
      } 
    }
    if(!scoreableNums.length && scoreableCell === "8-sum"){
      values = diceInPlay.reduce((obj, dice) => {
        if (obj[dice]) {
          obj[dice]++
        }else {
          obj[dice] = 1
        }
        return obj
      }, {})
      
      let obVal = Object.values(values)
      if(obVal.includes(4)){
        
        sum = diceInPlay.reduce((prev, cur) => prev + cur, 0)
        
        keepScore.innerText = sum
        lowerScore += sum
      } else {
        keepScore.innerText = 0
        lowerScore += sum
      }
    } 
    if(!scoreableNums.length && scoreableCell === "9-sum"){
      values = diceInPlay.reduce((obj, dice) => {
        if (obj[dice]) {
          obj[dice]++
        }else {
          obj[dice] = 1
        }
        return obj
      }, {})
      
      let obVal = Object.values(values)
      
      if(obVal.includes(3) && obVal.includes(2)){
        keepScore.innerText = 25
        lowerScore += sum
      } else {
        keepScore.innerText = 0
        lowerScore += sum
      }
    }  
    
    if(!scoreableNums.length && scoreableCell === "10-sum"){
      values = diceInPlay.reduce((obj, dice) => {
        if (obj[dice]) {
          obj[dice]++
        }else {
          obj[dice] = 1
        }
        return obj
      }, {})
      
      let obVal = Object.keys(values)
      console.log(obVal)
      if((obVal.includes("1") && obVal.includes("2") && obVal.includes("3") && obVal.includes("4")) || (obVal.includes("5") && obVal.includes("2") && obVal.includes("3") && obVal.includes("4"))  || (obVal.includes("5") && obVal.includes("6") && obVal.includes("3") && obVal.includes("4"))){
        keepScore.innerText = 30
        lowerScore += sum
      } else {
        keepScore.innerText = 0
        lowerScore += sum
      }
    }
    if(!scoreableNums.length && scoreableCell === "11-sum"){
      values = diceInPlay.reduce((obj, dice) => {
        if (obj[dice]) {
            obj[dice]++
          }else {
            obj[dice] = 1
            }
            return obj
          }, {})
        
          let obVal = Object.keys(values)
        
          if((obVal.includes("1") && obVal.includes("2") && obVal.includes("3") && obVal.includes("4") && obVal.includes("5")) || (obVal.includes("6") && obVal.includes("2") && obVal.includes("3") && obVal.includes("4") && obVal.includes("5"))){
              keepScore.innerText = 40
              lowerScore += sum
      } else {
        keepScore.innerText = 0
        lowerScore += sum
    }
    }  
    if(!scoreableNums.length && scoreableCell === "12-sum"){
      values = diceInPlay.reduce((obj, dice) => {
        if (obj[dice]) {
          obj[dice]++
        }else {
        obj[dice] = 1
        }
        return obj
      }, {})
      
      let obVal = Object.values(values)

      if(obVal.includes(5)){
        keepScore.innerText = 50
        lowerScore += sum
      } else {
        keepScore.innerText = 0
        lowerScore += sum
      }    
    }

    if(!scoreableNums.length && scoreableCell === "13-sum"){
      sum = diceInPlay.reduce((prev, cur) => prev + cur, 0)
        
      keepScore.innerText = sum
      lowerScore += sum
    }
        resetRoll()
  } else {
    return
  }
}
    
    
function resetRoll(){
  if(turn === 13){
    return endGame()
  }
  diceInPlay = []
  currentRoll = []
  keptDice = []
  count = 0
  rollNumber = 0
  scoreSheet.removeEventListener('click', changeScore)
  rollButton.addEventListener('click', roll);
  removeAllDice(diceArea)
  removeAllDice(diceKeptArea)
  turn += 1
}

function removeAllDice(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function endGame(){
  let message = document.getElementById("message")
  total = upperScore + lowerScore
  message.innerText = `Congratulations you scored ${total} points!`
}

// figure out why i can't return more than one die to upper section

  