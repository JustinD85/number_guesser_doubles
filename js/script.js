//section for min-max manipulation
var minNumber = document.querySelector("#min-range-number");
var maxNumber = document.querySelector("#max-range-number");
var randomNumber;
// var minNumber, maxNumber;
var maxRangeError = document.querySelector("#max-range-error");
var minRangeError = document.querySelector("#min-range-error");

//Buttons
var updateButton = document.querySelector("#update-button");
var clearButton = document.querySelector("#clear-button");
var resetButton = document.querySelector("#reset-button");
var submitButton = document.querySelector("#submit-button");

// Guess related activities
var guessInput = document.querySelector("#guess-number-input");
var guessLastGuess = document.querySelector("#guessed-number");
var guessResponse = document.querySelector("#guess-response");
///////                  END OF VARIABLES              /////// 


  updateMinMaxNumber();
  randomNumber = generateRandomNumber(minNumber.innerText, maxNumber.innerText);


// Updates Number Range
updateButton.addEventListener("click", function(e) {
  updateMinMaxNumber();
  randomNumber = generateRandomNumber(minNumber.innerText, maxNumber.innerText);
 e.preventDefault();

});

// Clear Button, clears just guess-input
clearButton.addEventListener("click", function(e) {
  parseInt(guessInput.value) = ""
 e.preventDefault();
});

// Reset Button, reloads page
resetButton.addEventListener("click", function() {
  //refreshes the page;
 location.reload();
});
 
// Guess Button, 
submitButton.addEventListener("click", function(e) {
 alert(randomNumber);
  //Error check input
  if(guessInput.value === /^[0-9]+$/){
   guessResponse.innerText = "Enter a Number";
   // break;
  }
  else if(parseInt(guessInput.value) < parseInt(minNumber.innerText) || 
    parseInt(guessInput.value) > parseInt(maxNumber.innerText)){
    guessResponse.innerText = "Number out of Range";
  }
  else if(parseInt(guessInput.value) < randomNumber){
    guessResponse.innerText = "Guess too Low";
    guessLastGuess.innerText = parseInt(guessInput.value);
  }else if(parseInt(guessInput.value) > randomNumber){
    guessResponse.innerText = "Guess too High";
    guessLastGuess.innerText = parseInt(guessInput.value);
  }else{
    guessResponse.innerText = "BOOM";
  }
 e.preventDefault();
 
});

// Function Section
function generateRandomNumber(min, max){
  return Math.floor(Math.random() * (parseInt(max) - parseInt(min))) + parseInt(min) + 1;
}

function updateMinMaxNumber(){
  var minNumberInput = document.querySelector("#min-range-input");
  var maxNumberInput = document.querySelector("#max-range-input");

//if input minMax is empty set default
  if(minNumberInput.value === "" || maxNumberInput.value === ""){
      minNumber.innerText = 1;
      maxNumber.innerText = 100;
  }else{
    minNumber.innerText = minNumberInput.value;
    maxNumber.innerText = maxNumberInput.value;
  }

  //else take input and set maxrange number
}