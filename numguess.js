// Set up user input
const readline = require("readline-sync");

// Choose difficulty level
let difficulty = readline.questionInt("Choose your difficulty - 1 is Easy - up to 10, 2 is medium - up to 50, 3 is hard up to 100: ");

// Set difficulty level for high number
let maxRange;
if (difficulty === 1) {
    maxRange = 10;
} else if (difficulty === 2) {
    maxRange = 50;
} else if (difficulty === 3) {
    maxRange = 100;
} else {
    console.log("Invalid choice! Defaulting to difficulty level 3 (1-100)."); // if number greater than 3 selected defaults to hard
    maxRange = 100;
}

// Generate a secret random number
const secretNumber = Math.floor(Math.random() * maxRange) + 1;

let guess;
do {
    guess = readline.questionInt(`Guess a number between 1 and ${maxRange}: `);

    if (guess < secretNumber) {
        console.log("Higher!");
    } else if (guess > secretNumber) {
        console.log("Lower!");
    }

} while (guess !== secretNumber);

console.log(`Congratulations!!!!! My secret number was ${secretNumber}.`);
