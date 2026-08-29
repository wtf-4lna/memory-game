const game = document.getElementById("game");
const message = document.getElementById("message");

const fruits = [
    "🍎", "🍌", "🍊", "🍇", "🍉", "🍓",
    "🥝", "🍍", "🥭", "🍒", "🍑", "🥥",
    "🍋", "🍐", "🫐", "🥕", "🌽", "🥑"
];

let cards = [...fruits, ...fruits];

// Shuffle
cards.sort(() => Math.random() - 0.5);

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

cards.forEach(function (fruit) {

    const card = document.createElement("button");

    card.className = "card";
    card.textContent = "?";
    card.dataset.fruit = fruit;

    card.addEventListener("click", function () {

        if (lockBoard) return;
        if (card === firstCard) return;
        if (card.classList.contains("matched")) return;

        card.textContent = fruit;
        card.classList.add("open");

        if (firstCard === null) {
            firstCard = card;
            return;
        }

        secondCard = card;
        lockBoard = true;

        if (firstCard.dataset.fruit === secondCard.dataset.fruit) {

            firstCard.classList.add("matched");
            secondCard.classList.add("matched");

            matchedPairs++;

            firstCard = null;
            secondCard = null;
            lockBoard = false;

            if (matchedPairs === fruits.length) {
                celebrateWin();
            }

        } else {

            setTimeout(function () {

                firstCard.textContent = "?";
                secondCard.textContent = "?";

                firstCard.classList.remove("open");
                secondCard.classList.remove("open");

                firstCard = null;
                secondCard = null;
                lockBoard = false;

            }, 1000);
        }
    });

    game.appendChild(card);
});


function celebrateWin() {

    message.textContent = "🎉 YOU WON! 🎉";

    const popup = document.createElement("div");

    popup.className = "win-popup";

    popup.innerHTML = `
        <div class="win-box">
            <h2>🎉 YOU WIN! 🎉</h2>
            <p>🏆 All 18 pairs matched! 🏆</p>
            <button id="restart">🔄 Play Again</button>
        </div>
    `;

    document.body.appendChild(popup);

    for (let i = 0; i < 80; i++) {

        const confetti = document.createElement("div");

        confetti.className = "confetti";
        confetti.textContent = ["🎉", "🎊", "⭐", "✨"][
            Math.floor(Math.random() * 4)
        ];

        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDelay = Math.random() * 2 + "s";

        document.body.appendChild(confetti);

        setTimeout(function () {
            confetti.remove();
        }, 4000);
    }

    document.getElementById("restart").addEventListener("click", function () {
        location.reload();
    });
}