var randomNumber;

//Buttons
var updateButton = document.querySelector("#update-button");
var clearButton = document.querySelector("#clear-button");
var resetButton = document.querySelector("#reset-button");
var submitButton = document.querySelector("#submit-button");
///////                  END OF VARIABLES              /////// 

window.onload = function () {
    init(); //means set variables(do i need to?)

// Updates Number Range
updateButton.addEventListener("click", function(e) {
  e.preventDefault();
  updateMinMaxNumber();
  generateRandomNumber();

});

// Clear Button, clears just guess-input
clearButton.addEventListener("click", function(e) {
  e.preventDefault();
  setGuessInput("");
  setMinNumber("");
  setMaxNumber("");
});

// Reset Button, reloads page
resetButton.addEventListener("click", function() {
  //Can we reset state instead please?
  //refreshes the page;
  location.reload();
});

// Guess Button, 
submitButton.addEventListener("click", function(e) {
  //Error check input
  if(getGuessInput() == "NaN"){
   setGuessResponse("Enter a Number in Range");
   //break;
  }else if(getGuessInput() < getMinNumber() || 
   getGuessInput() > getMaxNumber()){
  setGuessResponse("Number out of Range");
  }else if(getGuessInput() < randomNumber){
  setGuessResponse("Guess too Low");
  setLastGuess(getGuessInput());
  }else if(getGuessInput() > randomNumber){
  setGuessResponse("Guess too High");
  setLastGuess(getGuessInput());
  }else{
  setGuessResponse("BOOM");
  }
  e.preventDefault();
});
}


// Function Section
function generateRandomNumber(){
  let min = getMinNumber();
  let max = getMaxNumber();
  randomNumber = Math.floor(Math.random() * (max - min)) + min + 1;
}

function getMinNumber(){
  return parseInt(document.querySelector("#min-range-number").innerText);
}
function setMinNumber(inValue){
  document.querySelector("#min-range-number").innerText = inValue;
}

function getMinRangeInput(){
  return document.querySelector("#min-range-input").value;
}
function getMaxRangeInput(){
  return parseInt(document.querySelector("#max-range-input").value);
}

function getMaxNumber(){
  return parseInt(document.querySelector("#max-range-number").innerText);
}
function setMaxNumber(inValue){
  document.querySelector("#max-range-number").innerText = inValue;
}

function getGuessInput(){
  return document.querySelector("#guess-number-input").value;
}
function setGuessInput(inValue){
  document.querySelector("#guess-number-input").value = inValue;
}

function getGuessResponse(){
  return document.querySelector("#guess-response").innerText;
}
function setGuessResponse(inValue){
  document.querySelector("#guess-response").innerText = inValue;
}

function getLastGuess(){
  return parseInt(document.querySelector("#guessed-number").innerText);
}
function setLastGuess(inValue){
  document.querySelector("#guessed-number").innerText = inValue;
}

function updateMinMaxNumber(){
var maxRangeErrorElement = document.querySelector("#max-range-error");
var minRangeErrorElement = document.querySelector("#min-range-error");

//if minNumberInput is empty set default values
if(getMinRangeInput() ==""){
  document.querySelector("#min-range-error").style.visibility = "visible";
}if(getMaxRangeInput() == ""){
  document.querySelector("#max-range-error").style.visibility = "visible";  
  }else{//else take input and set maxrange number
    setMinNumber(getMinRangeInput());
    setMaxNumber(getMaxRangeInput());
  }
}

function init(){
  setMinNumber("1");
  setMaxNumber(100);
  setGuessResponse(" ");
  setLastGuess("??");
  generateRandomNumber();
  console.log("Initialized");
  //startEventListeners();//can I do this?
}