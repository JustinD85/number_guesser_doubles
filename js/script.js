/*Only run our code after the DOM has loaded, this just helps prevent
  people from changing/running our code in console, it's is also kewl */
window.onload = function() {
  /*************************BEGIN VARIABLES************************/
  let randomNumber, challenger1, challenger2;
  let count = 0;
  let isNewGame = true;
  let canStartGame = true;

  class Challenger {
    constructor(whichOne, inName, loser) {
      this.whichOne = whichOne;
      this.name = inName; //required
      this.guess = 0;
      this.loser = loser;
    }

    setGuess() {
      this.guess = parseInt(document.querySelector(`#${this.whichOne}-guess`).value);
    }
  }

  // Buttons
  const updateButton = document.querySelector('#update-button');
  const clearButton = document.querySelector('#clear-button');
  const resetButton = document.querySelector('#reset-button');
  const guessButton = document.querySelector('#submit-button');
  const deleteButton = document.querySelector("#right-section");
  const disableButtonsChecker = document.querySelector("#left-section");
  /*************************END OF VARIABLES****************************/

  /************************START OF EVENT LISTENERS*********************/
  init(); // sets initial state

  // Updates Number-Range, Button***************
  updateButton.addEventListener('click', function(e) {
    e.preventDefault();
    if(updateMinMaxNumber()){
      generateRandomNumber();
    }
    
    // Enable reset Game
    toggleDisableButton('reset', false, "#6e6e6e");
  });

  // Clear Button, clears every input************
  clearButton.addEventListener('click', function(e) {
    e.preventDefault();
    clearInputs();
  });

  // Reset Button, reloads page******************
  resetButton.addEventListener('click', function(e) {
    e.preventDefault();
    init();
  });

  // Guess Button********************************
  guessButton.addEventListener('click', function(e) {
    e.preventDefault();
    /* Instantiate both players, if no errors, set isNewGame to false so we
        don't set new Objs from the class again , unless a reset  happens*/
    if(checkInitChallenger('challenger1','challenger2')
      && checkInitChallenger('challenger2','challenger1')){
        isNewGame = false;
    }
    // If 
    if(!isNewGame){
      checkGuesses();
    }
  });

  // When delete button is pressed***************
  deleteButton.addEventListener('click', deleteCard);

  // Constantly checks if can disable buttons*************
  disableButtonsChecker.addEventListener('keyup', buttonDisableToggler);
  //////////////////       END OF EVENT LISTENERS    //////////////////

  ////////////////////////////////////////////////////////////////
  /*                  Functions Section                          */
  function generateRandomNumber() {
    const min = getMinNumber();
    const max = getMaxNumber();
    if(min === max){
      randomNumber = min;
    }else{
      randomNumber = Math.floor(Math.random() * (max - min)) + min + 1;
    }
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

  function getMaxRangeInput() {
      return parseInt(document.querySelector('#max-range-input').value);
  }

  function getMaxNumber() {
      return parseInt(document.querySelector('#max-range-number').innerText);
  }

  function setMaxNumber(inValue) {
      document.querySelector('#max-range-number').innerText = inValue;
  }

  function setChallengerName(challengerNum, name) {
      /* This is to iterate through all the names on the page because we get an
          array back from querySelectorAll. We then need to for loop each
      */
      document.querySelectorAll(`.${challengerNum}-name`).forEach(nameElementOnWebPage => nameElementOnWebPage.innerText = name);
  }

  function clearInputs() {
      document.querySelectorAll('input').forEach(e => e.value = "");
      document.querySelector('#clear-button').disabled = true;
      document.querySelector('#clear-button').style.background = "#d0d2d3";
  }

  function setGuessResponse(challenger, inValue) {
      document.querySelector(`#${challenger.whichOne}-guess-response`).innerText = inValue;
  }

  function setLastGuess(challenger, inValue) {
      document.querySelector(`#${challenger.whichOne}-guessed-number`).innerText = inValue;
  }

  function toggleError(minOrMax, showOrHide) {
      const tempErrorEle = document.querySelector(`#${minOrMax}-error`);
      tempErrorEle.style.visibility = showOrHide;
  }

  function updateMinMaxNumber() {
    let min = getMinRangeInput();
    let max = getMaxRangeInput();

      // If this func does not return a num, set error message to visible
      if (!min || min > max) {
          toggleError('min-range', 'visible');
          return false;
      } else if(!max || max < min){
          toggleError('max-range', 'visible');
          return false;
      } else{ // else take input and set minrange number
          toggleError('min-range', 'hidden');
          setMinNumber(getMinRangeInput());
          toggleError('max-range', 'hidden');
          setMaxNumber(getMaxRangeInput());
          return true;
      }
  }

  function guessChecker(challenger, inValue) {
      if (!challenger.guess) {
          console.log(challenger.guess);
          setGuessResponse(challenger, 'Enter a Number');
          // break;
      } else if (challenger.guess < getMinNumber() ||
          challenger.guess > getMaxNumber()) {
          setGuessResponse(challenger, 'Number out of Range');
      } else if (challenger.guess < randomNumber) {
          setGuessResponse(challenger, 'Guess too Low');
          setLastGuess(challenger, challenger.guess);
          count++;
      } else if (challenger.guess > randomNumber) {
          setGuessResponse(challenger, 'Guess too High');
          setLastGuess(challenger, challenger.guess);
          count++;
      } else {
          setMinNumber(getMinNumber() - 10);
          setMaxNumber(getMaxNumber() + 10);
          count++;
          setLastGuess(challenger, challenger.guess);
          isNewGame = true;
          setGuessResponse(challenger, 'BOOM');
          createCard(challenger);
      }
  }

  // Literally just sets the app to an initial state
  function init() {
    challenger1 = new Challenger('challenger1', 'Name', 'challenger2');
    challenger2 = new Challenger('challenger2', 'Name', 'challenger1');
    //sets default values for two challenger objects
    setChallengerName('challenger1', challenger1.name);
    setChallengerName('challenger2', challenger2.name);
    //The text on the DOM is set here
    setMinNumber('1');
    setMaxNumber('100');
    setGuessResponse(challenger1, '');
    setGuessResponse(challenger2, '');
    setLastGuess(challenger1, '??');
    setLastGuess(challenger2, '??');
    generateRandomNumber();
    clearInputs();
    toggleDisableButton('reset', true, '#d0d2d3');
  }
  function checkInitChallenger(inChallenger, loser) {
    if (isNewGame) {
      //Grabbing vars here to make using them bearable(shorter)
      var tempP1Name = document.querySelector(`#${inChallenger}-name-input`);
      //If both name are not blank, create the players
      if(!tempP1Name.value){
        toggleError(`${inChallenger}`, 'visible');
        return false;
      }

      // This sets the Challenger's names based on input from DOM
      if(inChallenger == 'challenger1'){
        challenger1 = new Challenger(`${inChallenger}`, tempP1Name.value, `${loser}`);
      }else{
        challenger2 = new Challenger(`${inChallenger}`, tempP1Name.value, `${loser}`);
        challenger1.loser = challenger2.name;
        challenger2.loser = challenger1.name;
      }
      // These functions assign the challenger name
      setChallengerName(inChallenger, tempP1Name.value);
      //Ensures these values aren't set until another game is played.
      toggleDisableButton('reset', false, '#6e6e6e');
    }
    toggleError(`${inChallenger}`, 'hidden');
    return true;
  }

  function checkGuesses() {
      //PER Challenger GUESS
      challenger1.setGuess();
      challenger2.setGuess()
      guessChecker(challenger1);
      guessChecker(challenger2);
      //Enable reset game
      toggleDisableButton('reset', false, '#6e6e6e');
  }

  function createCard(winner) {
    var tempElement = document.querySelector('#right-section');
    tempElement.insertAdjacentHTML('beforeend', `
        <section class="card">
              <section class="challenger-names">
                <span class="challenger1-card-name">${winner.name}</span>                     
                <span class="vs">VS</span> 
                <span class="challenger2-card-name">${winner.loser}</span>
              </section>
            <section class="winner">
              <div class="winner-name">${winner.name}</div>
              <div =class"winner-style">WINNER</div>
            </section>
            <section class="stats">
              <span class="card-guess-count">${count}</span>
              <span class="del-button mouseMe">X</span>
            </section>
        </section>
    `)
  }

  function deleteCard(e) {
      if (e.target.className === ('del-button mouseMe')) {
          e.target.parentElement.parentElement.remove();
      }
  }

  function toggleDisableButton(inButton, inBool, inColour) {
      document.querySelector(`#${inButton}-button`).disabled = inBool;
      document.querySelector(`#${inButton}-button`).style.background = inColour;
  }

  function buttonDisableToggler(e) {
      let shouldDisable = true;

      document.querySelectorAll('input').forEach(function(e) {
          if (e.value) {
              shouldDisable = false;
          }
      });

      if (shouldDisable) {
          toggleDisableButton('clear', true, "#d0d2d3")
      }
      if (!shouldDisable) {
          toggleDisableButton('clear', false, '#6e6e6e')
      }
  }
};