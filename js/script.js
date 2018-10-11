//section for min-max manipulation
var minRange, maxRange, minNumber, maxNumber;
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



// Updates Number Range
updateButton.addEventListener("click", function(e) {
  updateMinMaxNumber();

 e.preventDefault();

});

// Clear Button, clears just guess-input
clearButton.addEventListener("click", function(e) {
  guessInput.value = ""
 e.preventDefault();
});

// Reset Button, reloads page
resetButton.addEventListener("click", function() {
  //refreshes the page;
 location.reload();
});

// Guess Button, 
submitButton.addEventListener("click", function(e) {
 e.preventDefault();
 
});

function updateMinMaxNumber(){
  var tempMinRangeInput = document.querySelector("#min-range-input");
  var tempMaxRangeInput = document.querySelector("#max-range-input");
  document.querySelector("#min-range-number").innerText = tempMinRangeInput.value;
  document.querySelector("#max-range-number").innerText = tempMaxRangeInput.value;
  tempMaxRangeInput.value=tempMinRangeInput.value="";
  alert(tempMinRangeInput);

}