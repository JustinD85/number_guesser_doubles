window.onload = function() {
  let randomNumber;
  let minNum,maxNum, challenger1, challenger2;

  class Player{
    constructor(whichOne, inName){
      this.whichOne = whichOne;
      this.name = inName; //required
      this.guess = 0;
      this.guessCount = 0;
    }

    setGuess(){
      this.guess = parseInt(document.querySelector(`#${this.whichOne}-guess`).value);
    }
  }

  var isGameOver = false;
  var isNewGame = true;


  // Buttons
  const updateButton = document.querySelector('#update-button');
  const clearButton = document.querySelector('#clear-button');
  const resetButton = document.querySelector('#reset-button');
  const submitButton = document.querySelector('#submit-button');
  /*                  END OF VARIABLES                     */

  init(); //means set variables(do i need to?)

  // Updates Number Range
  updateButton.addEventListener('click', function(e) {
    e.preventDefault();
    updateMinMaxNumber();
    generateRandomNumber();
  });

  // Clear Button, clears just guess-input
  clearButton.addEventListener('click', function(e) {
    e.preventDefault();
    clearGuessInput();
    clearMinRangeInput();
    clearMaxRangeInput();
  });

  // Reset Button, reloads page
  resetButton.addEventListener('click', function() {
    // Can we reset state instead please?
    // refreshes the page;
    init();
  });

  // Guess Button,
  submitButton.addEventListener('click', function(e) {
    // Error check input
    /*
      :Default player name if none entered
      :
    */
    e.preventDefault();
    
      if(isNewGame) {
      var tempP1Name = document.querySelector('#challenger1-name-input');
      var tempP2Name = document.querySelector('#challenger2-name-input');

      // This sets the player's names based on input from DOM
      challenger1 = new Player('challenger1', tempP1Name.value)
      challenger2 = new Player('challenger2', tempP2Name.value)
      // These functions assign the challenger name
      setChallengerName('challenger1', challenger1.name);
      setChallengerName('challenger2', challenger2.name);
      isNewGame = false;
   }

    //PER PLAYER GUESS
    challenger1.setGuess();
    challenger2.setGuess()
   guessChecker(challenger1);
   guessChecker(challenger2);

  });

  //CARD FROM COMP


  // Function Section
  function generateRandomNumber() {
    const min = getMinNumber();
    const max = getMaxNumber();
    randomNumber = Math.floor(Math.random() * (max - min)) + min + 1;
  }

  function getMinNumber() {
    return parseInt(document.querySelector('#min-range-number').innerText);
  }
  function setMinNumber(inValue) {
    document.querySelector('#min-range-number').innerText = inValue;
  }

  function getMinRangeInput() {
    return document.querySelector('#min-range-input').value;
  }
  function clearMinRangeInput() {
    document.querySelector('#min-range-input').value = "";
  }

  function getMaxRangeInput() {
    return parseInt(document.querySelector('#max-range-input').value);
  }
  function clearMaxRangeInput() {
    document.querySelector('#max-range-input').value = "";
  }

  function getMaxNumber() {
    return parseInt(document.querySelector('#max-range-number').innerText);
  }
  function setMaxNumber(inValue) {
    document.querySelector('#max-range-number').innerText = inValue;
  }

  function setChallengerName(challengerNum,name) {
    /* This is to iterate through all the names on the page because we get an
        array back from querySelectorAll. We then need to for loop each
    */
     document.querySelectorAll(`.${challengerNum}-name`).forEach(nameElementOnWebPage => nameElementOnWebPage.innerText = name);
    //document.querySelector(`.${challengerNum}-name`).innerText = name;
  }

  function getGuessInput(player) { 
    return parseInt(document.querySelector(`#${player}-guess`).value);
  }
  function clearGuessInput() {
    document.querySelector('#guess-number-input').value = "";
  }

  function getGuessResponse(challenger) {
    return document.querySelector(`#${challenger.whichOne}-guess-response`).innerText;
  }
  function setGuessResponse(challenger, inValue) {
    document.querySelector(`#${challenger.whichOne}-guess-response`).innerText = inValue;
  }

  function getLastGuess() {
    return parseInt(document.querySelector('#guessed-number').innerText);
  }
  function setLastGuess(challenger, inValue) {
    document.querySelector(`#${challenger.whichOne}-guessed-number`).innerText = inValue;
  }

  function toggleError(minOrMax, showOrHide){
    const tempErrorEle = document.querySelector(`#${minOrMax}-range-error`);
    tempErrorEle.style.visibility = showOrHide;
  }

  function updateMinMaxNumber() {

    // If this func does not return a num, set error message to visible
    if (!getMinRangeInput()) {
      toggleError('min','visible');
    } else { // else take input and set minrange number
      toggleError('min', 'hidden');
      setMinNumber(getMinRangeInput());
    }

    // If this func does not return a num, set error message to visible
    if(!getMaxRangeInput()) {
      toggleError('max','visible');
    }else{ // else take input and set minrange number
      toggleError('max','hidden');
      setMaxNumber(getMaxRangeInput());
    }
  }

  function guessChecker(challenger, inValue){
     if (!challenger.guess) {
      console.log(challenger.guess);
      setGuessResponse(challenger, 'Enter a Number');
      // break;
    } else if (challenger.guess < getMinNumber()
      || challenger.guess > getMaxNumber()) {
        setGuessResponse(challenger,'Number out of Range');
    } else if (challenger.guess < randomNumber) {
      setGuessResponse(challenger,'Guess too Low');
      setLastGuess(challenger, challenger.guess);
      challenger.guessCount++;
    } else if (challenger.guess > randomNumber) {
      setGuessResponse(challenger,'Guess too High');
      setLastGuess(challenger, challenger.guess);
      challenger.guessCount++;
    } else {
      challenger.guessCount++;
      setGuessResponse(challenger,'BOOM');
      //makes cards
        //both names as title
        //winner name and winner as title 
        //number of tries for the winner
    }
  }

  // Literally just sets the app to an initial state
  function init() {
    challenger1 = new Player('challenger1','challenger1');
    challenger2 = new Player('challenger2', 'challenger2');
    setMinNumber('1');
    setMaxNumber('100');
    setGuessResponse(challenger1,'Guess too high');
    setGuessResponse(challenger2,'Guess too low');
    setLastGuess(challenger1,'??');
    setLastGuess(challenger2,'??');
    generateRandomNumber();
    
    // startEventListeners(); // can I do this?
  }
};
