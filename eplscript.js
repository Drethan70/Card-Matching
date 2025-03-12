document.addEventListener("DOMContentLoaded", () => {
    const cardValues = Array.from({ length: 20 }, (_, i) => i + 1); // Values for cards
    let deck = [...cardValues, ...cardValues].sort(() => Math.random() - 0.5);

    const gameContainer = document.getElementById("epl-game-container");
    const resetButton = document.getElementById("epl-reset-button");
    const startButton = document.getElementById("epl-start-button");
    const scoreList = document.getElementById("epl-score-list");

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
        img.src = "eplimages/logo.png";
        img.classList.add("card-img");
        card.appendChild(img);

        card.addEventListener("click", () => {
            if (gameStarted) flipCard(card, img);
        });
        gameContainer.appendChild(card);
    }

    function flipCard(card, img) {
        if (lockBoard || card.classList.contains("flipped") || card === firstCard?.card) return;

        img.src = `eplimages/${card.dataset.value}.png`;
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
            if (matchesFound === cardValues.length) stopTimer();
            resetSelections();
        } else {
            setTimeout(() => {
                resetCards(firstCard, secondCard);
                resetSelections();
            }, 500);
        }
    }

    function resetCards(...cards) {
        cards.forEach(({ card, img }) => {
            img.src = "eplimages/logo.png";
            card.classList.remove("flipped");
        });
    }

    function resetSelections() {
        firstCard = null;
        secondCard = null;
        lockBoard = false;
    }

    function resetGame() {
        gameStarted = false;
        gameContainer.innerHTML = "";
        deck = [...cardValues, ...cardValues].sort(() => Math.random() - 0.5);
        deck.forEach(value => createCard(value));
        resetTimer();
        matchesFound = 0;
    }

    function startGame() {
        if (gameStarted) return; // Prevent double-starting
        gameStarted = true;
        startTimer();
    }

    function startTimer() {
        elapsedTime = 0;
        timerInterval = setInterval(() => {
            elapsedTime++;
            document.getElementById("epl-timer").textContent = `Time: ${elapsedTime}s`;
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
        document.getElementById("epl-timer").textContent = `Time: 0s`;
    }

    function updateHighScores(newScore) {
        let eplHighScores = JSON.parse(localStorage.getItem("eplHighScores")) || [];
        eplHighScores.push(newScore);
        eplHighScores.sort((a, b) => a - b);
        eplHighScores = eplHighScores.slice(0, 10); 
        localStorage.setItem("eplHighScores", JSON.stringify(eplHighScores));
        displayHighScores();
    }

    function displayHighScores() {
        const eplHighScores = JSON.parse(localStorage.getItem("eplHighScores")) || [];
        scoreList.innerHTML = eplHighScores.map(score => `<li>${score}s</li>`).join("");
    }

    // Event Listeners
    resetButton.addEventListener("click", resetGame);
    startButton.addEventListener("click", startGame);

    document.getElementById("epl-main-menu-button").addEventListener("click", () => {
        window.location.href = "index.html";
    });

    // Initial Setup
    deck.forEach(value => createCard(value));
    displayHighScores();
});
// eplHighScores - stored to use for pasting in