const boardElement = document.getElementById('chessboard');
const turnIndicator = document.getElementById('turn-indicator');
const turnText = document.getElementById('turn-text');

const pieces = {
    'R': '♜', 'N': '♞', 'B': '♝', 'Q': '♛', 'K': '♚', 'P': '♟',
    'r': '♖', 'n': '♘', 'b': '♗', 'q': '♕', 'k': '♔', 'p': '♙'
};

const initialBoard = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

let boardState = [];
let draggingPiece = null;
let originSquare = null;
let currentPlayer = 'white'; // white starts

function initGame() {
    // Deep copy initial board
    boardState = JSON.parse(JSON.stringify(initialBoard));
    currentPlayer = 'white';
    updateTurnIndicator();
    renderBoard();
}

function updateTurnIndicator() {
    turnText.textContent = currentPlayer === 'white' ? "White's Turn" : "Black's Turn";
    turnIndicator.className = `turn-indicator ${currentPlayer}`;
}

function renderBoard() {
    boardElement.innerHTML = '';
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            const isDark = (row + col) % 2 === 1;
            square.className = `square ${isDark ? 'dark' : 'light'}`;
            square.dataset.row = row;
            square.dataset.col = col;

            const pieceCode = boardState[row][col];
            if (pieceCode) {
                const piece = document.createElement('div');
                piece.className = 'piece';
                piece.textContent = pieces[pieceCode];
                piece.draggable = true;
                
                // Color pieces
                if (pieceCode === pieceCode.toUpperCase()) {
                     piece.classList.add('piece-white');
                } else {
                     piece.classList.add('piece-black');
                }

                piece.addEventListener('dragstart', handleDragStart);
                square.appendChild(piece);
            }

            square.addEventListener('dragover', handleDragOver);
            square.addEventListener('drop', handleDrop);
            
            boardElement.appendChild(square);
        }
    }
}

function handleDragStart(e) {
    draggingPiece = e.target;
    const square = draggingPiece.parentElement;
    originSquare = {
        row: parseInt(square.dataset.row),
        col: parseInt(square.dataset.col),
        pieceCode: boardState[square.dataset.row][square.dataset.col]
    };

    // Prevent dragging opponent's pieces
    const isWhitePiece = originSquare.pieceCode === originSquare.pieceCode.toUpperCase();
    if ((currentPlayer === 'white' && !isWhitePiece) || 
        (currentPlayer === 'black' && isWhitePiece)) {
        e.preventDefault();
        return;
    }

    e.dataTransfer.setData('text/plain', ''); // Required for Firefox
    setTimeout(() => draggingPiece.classList.add('dragging'), 0);
}

function handleDragOver(e) {
    e.preventDefault(); // Necessary to allow dropping
}

function handleDrop(e) {
    e.preventDefault();
    if (draggingPiece) draggingPiece.classList.remove('dragging');
    
    // Find closest square if drop target is the piece itself (or something else)
    const targetSquare = e.target.closest('.square');
    if (!targetSquare) return;

    const targetRow = parseInt(targetSquare.dataset.row);
    const targetCol = parseInt(targetSquare.dataset.col);

    // Basic Validation: Don't move to same square
    if (originSquare.row === targetRow && originSquare.col === targetCol) return;
    
    // Prevent capturing own pieces
    const destinationContent = boardState[targetRow][targetCol];
    if (destinationContent) {
        const isDestWhite = destinationContent === destinationContent.toUpperCase();
        const isMovingWhite = originSquare.pieceCode === originSquare.pieceCode.toUpperCase();
        if (isDestWhite === isMovingWhite) return; // Cannot capture own piece
    }

    // Execute Move
    boardState[targetRow][targetCol] = originSquare.pieceCode;
    boardState[originSquare.row][originSquare.col] = '';
    
    // Switch Turn
    currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
    updateTurnIndicator();
    
    renderBoard();
    
    draggingPiece = null;
    originSquare = null;
}

document.getElementById('reset-btn').addEventListener('click', initGame);

// Start
initGame();
