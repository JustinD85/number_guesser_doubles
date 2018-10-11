//section for min-max manipulation
var minRange;
var maxRange;
var minNumber;
var maxNumber;

var maxRangeError = document.querySelector("#max-range-error");
var minRangeError = document.querySelector("#min-range-error");

var updateButton = document.querySelector("#update-button");
var clearButton = document.querySelector("#clear-button");
var numberRange = document.querySelector("#number-range");

var guessInput = document.querySelector("#guess-number-input");
var guessButton = document.querySelector("#submit-button");
var youGuessed = document.querySelector("#guessed-number");
var guessNumberInput = document.querySelector("#guess-number-input");
var guessResponse = document.querySelector("#guess-response");
var resetButton = document.querySelector("#reset-button")
var randomNumber = Math.floor(Math.random() );
console.log(minNumber);

// Range
updateButton.addEventListener("click", function(e) {
  updateMinMaxNumber();

 e.preventDefault();

});

// Clear Button
clearButton.addEventListener("click", function(e) {
  guessInput.value = ""
 e.preventDefault();
});

// Reset Button

resetButton.addEventListener("click", function() {
  //refreshes the page;
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

function updateMinMaxNumber(){
document.querySelector("#min-range-number").innerText = document.querySelector("#min-range-input").value;
document.querySelector("#max-range-number").innerText = document.querySelector("#max-range-input").value;
}