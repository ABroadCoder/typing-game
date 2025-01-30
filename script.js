<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="style.css" />
    <link rel="icon" href="safari_hat.ico" type="x-icon" />
    <title>Typing Game! (17 hours)</title>
  </head>
  <body>
    <div class="overlay"></div>
    <div class="popup-container welcome-popup hidden">
      <div class="close-popup-container hidden">X</div>
      <div class="popup-text-container">
        Welcome to the game. Type your name to get started.
      </div>
      <input type="text" class="name-input-field" value="Type your name here" />
      <button class="submit-button">Submit</button>
    </div>
    <div class="popup-container out-of-time-popup hidden">
      <div class="close-popup-container hidden">X</div>
      <div class="popup-text-container">
        You're out of time. Click the button to retry.
      </div>
      <input
        type="text"
        class="name-input-field hidden"
        value="Type your name here"
      />
      <button class="retry-button">Retry</button>
    </div>
    <div class="popup-container level-complete-popup hidden">
      <div class="close-popup-container hidden">X</div>
      <div class="popup-text-container">
        Congratulations! You've beaten the level.
      </div>
      <input
        type="text"
        class="name-input-field hidden"
        value="Type your name here"
      />
      <button class="continue-button">Continue</button>
    </div>
    <div class="top-container">
      <div class="timer-container"></div>
      <div class="instructions-container">Type the letter</div>
    </div>
    <div class="main-container"></div>
    <div class="data-container">
      <div class="score-overall-container">
        <div class="score-title-container">Points</div>
        <div class="score-container"></div>
      </div>
      <div class="player-name-container"></div>
    </div>
  </body>
  <script defer src="script.js"></script>
</html>
