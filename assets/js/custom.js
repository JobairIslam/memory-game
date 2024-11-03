const gameBoard = document.getElementById('gameBoard');
const player1ScoreEl = document.getElementById('player1Score');
const player2ScoreEl = document.getElementById('player2Score');
const turnInfoEl = document.getElementById('turnInfo');
const winnerMessageEl = document.getElementById('winnerMessage');

let cards = [
    '🍎', '🍎', '🍌', '🍌', '🍒', '🍒', '🍇', '🍇',
    '🍉', '🍉', '🍓', '🍓', '🍍', '🍍', '🥝', '🥝'
];
let playerTurn = 'Jubair';
let player1Score = 0;
let player2Score = 0;
let flippedCards = [];
let matchedPairs = 0;

// Shuffle the cards array
cards = cards.sort(() => 0.5 - Math.random());

// Render the cards on the game board
cards.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.classList.add(
        'card', 
        'w-20', 'h-20', 'bg-blue-200', 'rounded-lg', 'flex', 
        'items-center', 'justify-center', 'text-3xl', 'cursor-pointer', 
        'transition', 'duration-500', 'ease-in-out', 'transform', 
        'hover:scale-105', 'active:scale-95'
    );
    card.dataset.symbol = symbol;
    card.dataset.index = index;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
});

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped', 'bg-white', 'text-gray-900');
        this.innerText = this.dataset.symbol;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        updateScore();
        matchedPairs++;
        if (matchedPairs === cards.length / 2) {
            endGame();
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped', 'bg-white', 'text-gray-900');
            card1.innerText = '';
            card2.classList.remove('flipped', 'bg-white', 'text-gray-900');
            card2.innerText = '';
        }, 1000);
    }
    flippedCards = [];
    switchTurn();
}

function updateScore() {
    if (playerTurn === 'Jubair') {
        player1Score++;
        player1ScoreEl.innerText = player1Score;
    } else {
        player2Score++;
        player2ScoreEl.innerText = player2Score;
    }
}

function switchTurn() {
    playerTurn = playerTurn === 'Jubair' ? 'Sumayta' : 'Jubair';
    turnInfoEl.innerText = `Turn: ${playerTurn}`;
}

function endGame() {
    if (player1Score > player2Score) {
        winnerMessageEl.innerText = 'Jubair Wins!';
    } else if (player2Score > player1Score) {
        winnerMessageEl.innerText = 'Sumayta Wins!';
    } else {
        winnerMessageEl.innerText = "It's a tie!";
    }
}
