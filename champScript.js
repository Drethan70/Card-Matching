document.addEventListener("DOMContentLoaded", () => {
    const cardValues = Array.from({ length: 24 }, (_, i) => i + 1); 
    let deck = [...cardValues, ...cardValues].sort(() => Math.random() - 0.5);
    const gameContainer = document.getElementById("gameContainer");
    const resetButton = document.getElementById("resetButton");
    const startButton = document.getElementById("startButton");
    const scoreList = document.getElementById("champscoreList");
    document.getElementById('mainMenu').addEventListener('click', function() {
        window.location.href = 'index.html';
    });
     
    let firstCard = null, secondCard = null;
    let lockBoard = false;
    let matchesFound = 0; 
    let elapsedTime = 0;
    let timerInterval;
    let gameStarted = false; 

    function createCard(value) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = value;

        const img = document.createElement("img");
        img.src = "ChampImages/logo.png";
        img.classList.add("card-img");
        card.appendChild(img);

        card.addEventListener("click", () => {
            if (gameStarted) {
                flipCard(card, img);
            }
        });
        gameContainer.appendChild(card);
    }

    function flipCard(card, img) {
        if (lockBoard || card.classList.contains("flipped") || card === firstCard?.card) return;

        img.src = `ChampImages/${card.dataset.value}.png`;
        card.classList.add("flipped");

        if (!firstCard) {
            firstCard = { card, img };
        } else {
            secondCard = { card, img };
            lockBoard = true;
            setTimeout(checkMatch, 1000);
        }
    }

    function checkMatch() {
        if (firstCard.card.dataset.value === secondCard.card.dataset.value) {
            matchesFound++;
            if (matchesFound === cardValues.length) {
                stopTimer(); 
            }
            firstCard = secondCard = null;
            lockBoard = false;
        } else {
            setTimeout(() => {
                firstCard.img.src = "ChampImages/logo.png";
                secondCard.img.src = "ChampImages/logo.png";
                firstCard.card.classList.remove("flipped");
                secondCard.card.classList.remove("flipped");
                firstCard = secondCard = null;
                lockBoard = false;
            }, 500);
        }
    }

    function resetGame() {
        gameStarted = false;
        gameContainer.innerHTML = "";
        deck = [...cardValues, ...cardValues].sort(() => Math.random() - 0.5);
        deck.forEach(value => createCard(value));
        firstCard = secondCard = null;
        lockBoard = false;
        matchesFound = 0; 
        resetTimer(); 
    }

    function startGame() {
        gameStarted = true;
        startTimer(); 
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            elapsedTime++;
            document.getElementById("timer").textContent = `Time: ${elapsedTime}s`;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        alert(`Congratulations! You completed the game in ${elapsedTime} seconds.`);
        updateHighScores(elapsedTime); 
    }

    function resetTimer() {
        clearInterval(timerInterval);
        elapsedTime = 0;
        document.getElementById("timer").textContent = `Time: 0s`;
    }

    function updateHighScores(newScore) {
        let champhighScores = JSON.parse(localStorage.getItem("champhighScores")) || [];
        champhighScores.push(newScore);
        champhighScores.sort((a, b) => a - b);
        champhighScores = champhighScores.slice(0, 10); 
        localStorage.setItem("champhighScores", JSON.stringify(champhighScores));
        displayHighScores();
    }

    function displayHighScores() {
        const champhighScores = JSON.parse(localStorage.getItem("champhighScores")) || [];
        champscoreList.innerHTML = champhighScores.map(score => `<li>${score}s</li>`).join("");
    }

    resetButton.addEventListener("click", resetGame);
    startButton.addEventListener("click", startGame);

    deck.forEach(value => createCard(value));
    displayHighScores(); 
});
