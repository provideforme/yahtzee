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



/*------------------------ Cached Element References ------------------------*/
const dice = document.querySelectorAll("img");

console.log(dice);

const rollButton = document.getElementById("roll-btn");
/*----------------------------- Event Listeners -----------------------------*/
rollButton.addEventListener('click', handleClick);

/*-------------------------------- Functions --------------------------------*/
function handleClick(){
  diceRollAnimation();
}

function diceRollAnimation(){
  dice.forEach(function(die){
    die.classList.add("shake")
  });
  setTimeout(function(){
    dice.forEach(function(die){
      die.classList.remove("shake");
    });
    let d1Value = Math.floor((Math.random() * 6));
    let d2Value = Math.floor((Math.random() * 6));
    let d3Value = Math.floor((Math.random() * 6));
    let d4Value = Math.floor((Math.random() * 6));
    let d5Value = Math.floor((Math.random() * 6));
    console.log(d1Value, d2Value, d3Value, d4Value, d5Value);
    document.querySelector("#d1").setAttribute("src", images[d1Value]);
    document.querySelector("#d2").setAttribute("src", images[d2Value]);
    document.querySelector("#d3").setAttribute("src", images[d3Value]);
    document.querySelector("#d4").setAttribute("src", images[d4Value]);
    document.querySelector("#d5").setAttribute("src", images[d5Value]);
  }, 1000);
}