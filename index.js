/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        const game = games[i];

        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");

        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Backers: ${game.backers}</p>
        `;

        gamesContainer.appendChild(gameCard);
    }

}
addGamesToPage(GAMES_JSON); // password is 11seafoamgames
/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

const totalContributions = GAMES_JSON.reduce((sum,game) => {
    return sum + game.backers;    // value for SECRET KEY 1 is 19187
}, 0);
// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `
    <h2>${totalContributions.toLocaleString()}</h2>
`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((sum, game) => {
    return sum + game.pledged;
}, 0);
// set inner HTML using template literal
raisedCard.innerHTML = `
    <h2>$${totalRaised.toLocaleString()}</h2> 
`; // value for SECRET KEY 2 is 800268

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `
    <h2>${GAMES_JSON.length}</h2>
` // value for SECRET KEY 3 is BRAIN

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
} // secret key 1 is 7

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    });

    // use the function we previously created to add funded games to the DOM
    addGamesToPage(fundedGames);
} // secret key 2 is 4

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

// secret key 3 is FLANNEL
// secret key 4 is click

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

const unfundedGames = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
});
const unfundedCount = unfundedGames.length;
// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `
A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games. Currently, ${unfundedCount} ${unfundedCount === 1 ? "game" : "games"} remain unfunded. 
We need your help to fund these amazing games!
`; // first secret component is toLocaleString

// create a new DOM element containing the template string and append it to the description container
const description = document.createElement("p");
description.textContent = displayStr;
descriptionContainer.appendChild(description);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...rest] = sortedGames; // secret component 1 is Zoo, second is How
// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement("h3");
firstGameElement.textContent = firstGame.name;
firstGameContainer.appendChild(firstGameElement);
// do the same for the runner up item
const secondGameElement = document.createElement("h3");
secondGameElement.textContent = secondGame.name;
secondGameContainer.appendChild(secondGameElement); // final keyword is CEDAR