window.onload = function() {
  let randomNumber;
  let minNum,maxNum, challenger1, challenger2;
  let count = 0;
  var isGameOver = false;
  var isNewGame = true;

  class Player{
    constructor(whichOne, inName, loser){
      this.whichOne = whichOne;
      this.name = inName; //required
      this.guess = 0;
      this.loser = loser;
    }

    setGuess(){
      this.guess = parseInt(document.querySelector(`#${this.whichOne}-guess`).value);
    }
  }




  // Buttons
  const updateButton = document.querySelector('#update-button');
  const clearButton = document.querySelector('#clear-button');
  const resetButton = document.querySelector('#reset-button');
  const submitButton = document.querySelector('#submit-button');
  const deleteButton = document.querySelector("#right-section");
  const disableButtonsChecker = document.querySelector("#left-section");
  // const resetGameChecker = document.querySelector("#left-section");
  /*                  END OF VARIABLES                     */

  init(); //means set variables(do i need to?)

  // Updates Number Range
  updateButton.addEventListener('click', function(e) {
    e.preventDefault();
    updateMinMaxNumber();
    generateRandomNumber();
    //Enable reset Game
    document.querySelector('#reset-button').disabled = false; 
    document.querySelector('#reset-button').style.background = "#d0d2d3";
  });

  // Clear Button, clears just guess-input
  clearButton.addEventListener('click', function(e) {
    e.preventDefault();
    clearInputs();
    clearMinRangeInput();
    clearMaxRangeInput();
  });

  // Reset Button, reloads page
  resetButton.addEventListener('click', function() {
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
      challenger1 = new Player('challenger1', tempP1Name.value, 'challenger2');
      challenger2 = new Player('challenger2', tempP2Name.value, 'challenger1');
      // These functions assign the challenger name
      setChallengerName('challenger1', challenger1.name);
      setChallengerName('challenger2', challenger2.name);
      // These functions assign the losers
      challenger1.loser = challenger2.name;
      challenger2.loser = challenger1.name;
      //Ensures these values aren't set until another game is played.
      isNewGame = false;
   }

    //PER PLAYER GUESS
    challenger1.setGuess();
    challenger2.setGuess()
   guessChecker(challenger1);
   guessChecker(challenger2);
   //Enable reset game
   document.querySelector('#reset-button').disabled = false; 
   document.querySelector('#reset-button').style.background = "#6e6e6e";

  });

  deleteButton.addEventListener('click', deleteCard);
  disableButtonsChecker.addEventListener('keyup', buttonDisableToggler);
  // resetGameChecker.addEventListener()

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
  function clearInputs() {
    document.querySelectorAll('input').forEach(e => e.value = "");
    document.querySelector('#clear-button').disabled = true;
    document.querySelector('#clear-button').style.background = "#d0d2d3";
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
      count++;
    } else if (challenger.guess > randomNumber) {
      setGuessResponse(challenger,'Guess too High');
      setLastGuess(challenger, challenger.guess);
      count++;
    } else {
      setMinNumber(getMinNumber() - 10);
      setMaxNumber(getMaxNumber() + 10);
      count++;
      setLastGuess(challenger, challenger.guess);
      isNewGame = true;
      setGuessResponse(challenger,'BOOM');
      createCard(challenger);
    }
  }

  // Literally just sets the app to an initial state
  function init() {
    challenger1 = new Player('challenger1', 'Name', 'challenger2');
      challenger2 = new Player('challenger2', 'Name', 'challenger1');
      setChallengerName('challenger1', challenger1.name);
      setChallengerName('challenger2', challenger2.name);

    setMinNumber('1');
    setMaxNumber('100');
    setGuessResponse(challenger1,'');
    setGuessResponse(challenger2,'');
    setLastGuess(challenger1,'??');
    setLastGuess(challenger2,'??');
    generateRandomNumber();
    clearInputs();
    //Disables reset button...thanks tom..
    document.querySelector('#reset-button').disabled = true; 
    document.querySelector('#reset-button').style.background = "#d0d2d3";   
    // startEventListeners(); // can I do this?
  }

  function createCard(winner){
    var tempElement = document.querySelector("#right-section");
    tempElement.insertAdjacentHTML('beforeend',`
  <section class="card">
        <section class="challenger-names">
          <span class="challenger1-card-name">${winner.name}</span>                     <span class="vs">VS</span> 
          <span class="challenger2-card-name">${winner.loser}</span>
        </section>
      <section class="winner">
        <div class="winner-name">${winner.name}</div>
        <div =class"winner-style">WINNER</div>
      </section>
      <section class="stats">
        <span class="card-guess-count">${count}</span>
        <span class="del-button">X</span>
      </section>
  </section>
      `)
  }

  function deleteCard(e){
    if(e.target.className ===('del-button')){
      e.target.parentElement.parentElement.remove();
    }
  }

  function buttonDisableToggler(e){
    let shouldDisable = true;

    document.querySelectorAll('input').forEach(function (e){
      if(e.value){
        shouldDisable = false;
      }
    });

    if(shouldDisable){
    document.querySelector('#clear-button').disabled = true;
    document.querySelector('#clear-button').style.background = "#d0d2d3";
    }

    if(!shouldDisable){
    document.querySelector('#clear-button').disabled = false;
    document.querySelector('#clear-button').style.background = "#6e6e6e";
    }
  }
};