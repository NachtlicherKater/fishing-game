// Buttons
const startButton = document.querySelector('.start-button');
const settingsButton = document.querySelector('.settings-button');
const leaderBoardButton = document.getElementById('.leaderboards-button');
const exitButton = document.querySelector('.exit-button');
// Windows
const mainWindow = document.querySelector('.main-menu');
const gameWindow = document.querySelector('.game');


startButton.addEventListener('click', () => {
    mainWindow.classList.remove('show');
    mainWindow.classList.add('hide');
    gameWindow.classList.remove('hide');
    gameWindow.classList.add('show');
});