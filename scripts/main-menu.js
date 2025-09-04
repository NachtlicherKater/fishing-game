// Buttons
const startButton = document.querySelector('.start-button');
const settingsButton = document.querySelector('.settings-button');
const leaderboardButton = document.querySelector('.leaderboards-button');
const leaderboardCloseButton = document.querySelector('.close-leaderboards');
const exitButton = document.querySelector('.exit-button');
// Windows
const mainWindow = document.querySelector('.main-menu');
const gameWindow = document.querySelector('.game');
const leaderboardsWindow = document.querySelector('.leaderboards');
const settingsWindow = document.querySelector('.settings');



// main logic
startButton.addEventListener('click', () => {
    mainWindow.classList.remove('show');
    mainWindow.classList.add('hide');
    gameWindow.classList.remove('hide');
    gameWindow.classList.add('show');
});

leaderboardButton.addEventListener('click', () => {
    leaderboardsWindow.classList.remove('hide');
    leaderboardsWindow.classList.add('show');
});

leaderboardCloseButton.addEventListener('click', () => {
    leaderboardsWindow.classList.remove('show');
    leaderboardsWindow.classList.add('hide');
});