import { fifaData } from "./fifa.js";

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/

let x = fifaData.filter((el) => el.Stage == "Final" && el.Year == 2014);
let y = x[0];
// console.log(y);

//(a) Home Team name for 2014 world cup final
console.log("(a)", y["Home Team Name"]);

//(b) Away Team name for 2014 world cup final
console.log("(b)", y["Away Team Name"]);

//(c) Home Team goals for 2014 world cup final
console.log("(c)", y["Home Team Goals"]);

//(d) Away Team goals for 2014 world cup final
console.log("(d)", y["Away Team Goals"]);

//(e) Winner of 2014 world cup final */
y["Home Team Goals"] > y["Away Team Goals"]
  ? console.log("(e)", y["Home Team Name"])
  : console.log("(e)", y["Away Team Name"]);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

const getFinals = (fifaData) => {
  const objArrTeamsFinals = fifaData.filter((el) => el.Stage == "Final");
  //   console.log(objArrTeamsFinals);
  return objArrTeamsFinals;
};

// console.log(getFinals(fifaData));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

const getYears = (fifaData, getFinals) => {
  const finalStageMatches = getFinals(fifaData);
  const years = finalStageMatches.map((el) => el.Year);
  return years;
};

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
  Use the higher-order function getWinners to do the following:  
  1. Receives an array
  2. Receives the callback function getFinals from task 2 
  3. Determines the winner (home or away) of each `finals` game. 
  4. Returns the names of all winning countries in an array called `winners` */

const getWinners = (fifaData, getFinals) => {
  const winners = [];
  const finalStageMatches = getFinals(fifaData);
  finalStageMatches.forEach((el) =>
    el["Home Team Goals"] > el["Away Team Goals"]
      ? winners.push(el["Home Team Name"])
      : winners.push(el["Away Team Name"])
  );
  return winners;
};

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
  Use the higher-order function getWinnersByYear to do the following:
  1. Receive an array
  2. Receive a callback function getYears from task 3
  3. Receive a callback function getWinners from task 4
  4. Return an array of strings that say "In {year}, {country} won the world cup!" 
  
  hint: the strings returned need to exactly match the string in step 4.
   */

const getWinnersByYear = (fifaData, getYears, getWinners) => {
  const years = getYears(fifaData, getFinals);
  const winners = getWinners(fifaData, getFinals);
  const strings = [];
  years.forEach((el, i) => {
    strings.push(`In ${el}, ${winners[i]} won the world cup!`);
  });
  return strings;
};

// console.log(getWinnersByYear(fifaData, getYears, getWinners));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
  Use the higher order function getAverageGoals to do the following: 
   1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
   2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
   
   (Hint: use .reduce and do this in 2 steps) 
   
   Example of invocation: getAverageGoals(getFinals(fifaData));
  */

const getAverageGoals = (getFinals) => {
  const matchesDataArr = getFinals; // pq não posso passar os fifaData aqui?
  //   console.log(matchesDataArr);
  const totalMatches = matchesDataArr.length;

  const homeTeamArr = matchesDataArr.map((el) => el["Home Team Goals"]);
  const awayTeamArr = matchesDataArr.map((el) => el["Away Team Goals"]);
  const sumHomeTeamArr = homeTeamArr.reduce((a, b) => a + b);
  const sumAwayTeamArr = awayTeamArr.reduce((a, b) => a + b);

  let totalGoalsAvg = (
    (sumHomeTeamArr + sumAwayTeamArr) /
    totalMatches
  ).toFixed(2);

  //   totalGoalsAvg = Math.round(totalGoalsAvg * 100) / 100;

  //   console.log(totalMatches);
  //   console.log(sumHomeTeamArr);
  //   console.log(sumAwayTeamArr);

  return totalGoalsAvg;
};

getAverageGoals(getFinals(fifaData));

/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
  Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 
  
  Hint: Investigate your data to find "team initials"!
  Hint: use `.reduce` */

const getCountryWins = (fifaData, teamInitials) => {
  const newArr = fifaData.filter((el) => {
    if (
      el["Home Team Initials"] == teamInitials ||
      el["Away Team Initials"] == teamInitials
    ) {
      return true;
    } else {
      return false;
    }
  });

  let count = 0;

  newArr.forEach((el) => {
    if (
      (el["Home Team Initials"] == teamInitials &&
        el["Home Team Goals"] > el["Away Team Goals"]) ||
      (el["Away Team Initials"] == teamInitials &&
        el["Away Team Goals"] > el["Home Team Goals"])
    ) {
      count++;
    }
  });

  return count;
};

console.log(getCountryWins(fifaData, "ITA"));

/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
  Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
  Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {
  /* code here */
}

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */

/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo() {
  console.log("its working");
  return "bar";
}
export default {
  foo,
  getFinals,
  getYears,
  getWinners,
  getWinnersByYear,
  getAverageGoals,
};
