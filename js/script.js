// variables
var minRange = document.querySelector("#min-range-input");
var maxRange = document.querySelector("#max-range-input");
var maxRangeError = document.querySelector("#max-range-error");
var minRangeError = document.querySelector("#min-range-error");
var updateButton = document.querySelector("#update-button");
var clearButton = document.querySelector("#clear-button");
var numberRange = document.querySelector("#number-range");
var minNumber = document.querySelector("#min-range-number");
var maxNumber = document.querySelector("#max-range-number");
var guessInput = document.querySelector("#guess-number-input");
var guessButton = document.querySelector("#submit-button");
var youGuessed = document.querySelector("#guessed-number");
var guessNumberInput = document.querySelector("#guess-number-input");
var guessResponse = document.querySelector("#guess-response");
var resetButton = document.querySelector("#reset-button")
var rangeDiff = document.querySelector(maxRange - minRange);
var randomNumber = Math.floor(Math.random * (rangeDiff + 1) + minRange);
console.log(randomNumber);

// Range
updateButton.addEventListener("click", function(e) {
 e.preventDefault();
 minNumber.innerText = minRange.value;
 maxNumber.innerText = maxRange.value;


});

// Clear Button
clearButton.addEventListener("click", function(e) {
 e.preventDefault();
 minNumber.innerText = "0";
 maxNumber.innerText = "100";
 minRange.value = "";
 maxRange.value = "";
 guessNumberInput.value = "";
 youGuessed.innerText = "?";

});

// Reset Button

resetButton.addEventListener("click", function() {
 location.reload();
});

// Guess Button

guessButton.addEventListener("click", function(e) {
 e.preventDefault();
 youGuessed.innerText = guessNumberInput.value;
 //if less than 0
 if(minRange < 0) {
   //then error message(minError)
   minRangeError.style.display = "none"
 }
 //if max range is over 100
   //then error message(maxError)


});