// Navigation for each button
document.getElementById('epl').addEventListener('click', () => {
    window.location.href = 'epl.html';
});

document.getElementById('champ').addEventListener('click', () => {
    window.location.href = 'champ.html';
});

document.getElementById('l1').addEventListener('click', () => {
    window.location.href = 'L1.html';
});

document.getElementById('l2').addEventListener('click', () => {
    window.location.href = 'L2.html';
});

// Function to update high score during the game
// Function to update a specific game's high score dynamically
function updateScore(game, newScore) {
    // Ensure highScores is loaded from localStorage
    const highScores = JSON.parse(localStorage.getItem("highScores")) || {
        epl: 0,
        champ: 0,
        l1: 0,
        l2: 0
    };

    // Check if the new score is higher than the current high score
    if (newScore > highScores[game]) {
        highScores[game] = newScore; // Update the high score in memory
        
        localStorage.setItem("highScores", JSON.stringify(highScores));// Save updated highScores back to localStorage
        
    console.log(`Updated ${game} high score to:`, newScore);// Debug log
    }

    // Update the displayed high scores
    updateHighScores(); // Ensure this refreshes the DOM
}

// Function to display highest scores on the main page
function displayMainPageScores() {
    const versions = ["epl", "champ", "l1", "l2"]; // Game versions
    versions.forEach(version => {
        const key = `${version}highScore`; // Retrieve key dynamically
        const score = localStorage.getItem(key) || "0"; // Default if no score is stored
        document.getElementById(`${version}highScore`).textContent = `Highest Score: ${score}`;
    });
}


// Function to display scores from memory for dynamic updates
// function displayScores() {
//     const versions = ["epl", "champ", "l1", "l2"]; // Game versions
//     versions.forEach(version => {
//         const key = `${version}highScore`;
//         const score = localStorage.getItem(key) || "0";
//         document.getElementById(`${version}highScore`).textContent = `Highest Score: ${score}`;
//     });
// }

// // Initialize and display scores when the main page loads
// document.addEventListener("DOMContentLoaded", displayMainPageScores);

// // Example high scores (these would typically be dynamically updated in your game logic)
// // Initialize high scores from localStorage or set default values
let highScores = {
    epl: 153,
    champ: 210,
    l1: 167,
    l2: 189
};

// Save this unified object to localStorage
localStorage.setItem("highScores", JSON.stringify(highScores));


// Save the initial high scores to localStorage if not already present
if (!localStorage.getItem("highScores")) {
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

// function updateHighScores() {
//     // Load high scores from localStorage
//     console.log(localStorage.getItem("eplHighScores"))
//     highScores = JSON.parse(localStorage.getItem("eplHighScores")) || {
//         epl: 0,
//         champ: 0,
//         l1: 0,
//         l2: 0
//     };
//         console.log(highScores)
//     // Update the DOM elements with the correct scores
//     document.getElementById("eplHighScores").textContent = `High Score: ${highScores.epl}`;
//     document.getElementById("champhighScores").textContent = `High Score: ${highScores.champ}`;
//     document.getElementById("l1highScores").textContent = `High Score: ${highScores.l1}`;
//     document.getElementById("l2highScores").textContent = `High Score: ${highScores.l2}`;
// }

function updateHighScores() {
    // Load high scores from localStorage
    eplScore = JSON.parse(localStorage.getItem("eplHighScores"))
    champScore = JSON.parse(localStorage.getItem("champhighScores"))
    l1Score = JSON.parse(localStorage.getItem("l1highScores"))
    l2Score = JSON.parse(localStorage.getItem("l2highScores"))


    //  highScores = JSON.parse(localStorage.getItem("highScores")) || {
    //     epl: 0,
    //     champ: 0,
    //     l1: 0,
    //     l2: 0
    // };


  
    // Update the DOM elements with the correct scores
    document.getElementById("eplHighScores").textContent = `High Score: ${eplScore[0]}`;
    document.getElementById("champhighScores").textContent = `High Score: ${champScore[0]}`;
    document.getElementById("l1highScores").textContent = `High Score: ${l1Score[0]}`;
    document.getElementById("l2highScores").textContent = `High Score: ${l2Score[0]}`;
}
// Call the function to display high scores when the page loads
window.addEventListener("DOMContentLoaded", updateHighScores)