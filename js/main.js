console.log("Javascript is connected");

// variables
const theButtons = document.querySelectorAll("#buttonHolder img");
const puzzleBoard = document.querySelector(".puzzle-board");
const puzzlePiecesDivs = document.querySelectorAll(".puzzle-pieces");
const dropZones = document.querySelectorAll(".drop-zone");
const resetButton = document.getElementById("resetBut");
let draggedPiece;
let currentPuzzle = 0;

// functions
function changeBGImage(event) {
    console.log("changeBGImage called");
    const puzzleId = event.currentTarget.id;

    resetPuzzlePieces();

    // Puzzle pieces display:none
    puzzlePiecesDivs.forEach(div => {
        div.style.display = "none";
    });

    // Change background show the corresponding puzzle pieces
    document.querySelector(`#puzzle${puzzleId}`).style.display = "block";
    
    // background image change
    puzzleBoard.style.backgroundImage = `url('./images/backGround${puzzleId}.jpg')`;
    
    currentPuzzle = puzzleId; 
}

function handleStartDrag() {
    console.log(`started dragging ${this}`);
    draggedPiece = this;
}

function handleOver(e) {
    e.preventDefault();
    console.log("Dragged Over");
}

function handleDrop(e) {
    e.preventDefault();
    console.log("Dropped");

    // if the dropzone already occupied, don't allow another piece drop.
    if (this.children.length > 0) {
        console.log("Drop zone already occupied");
        return;
    }

    this.appendChild(draggedPiece);
}

function resetPuzzlePieces() {
    const currentPuzzleDiv = document.querySelector(`#puzzle${currentPuzzle}`);
    dropZones.forEach(zone => {
        if (zone.children.length > 0) {
            Array.from(zone.children).forEach(piece => {
                currentPuzzleDiv.appendChild(piece);
            });
        }
    });
}

// eventListeners
theButtons.forEach(button => button.addEventListener("click", changeBGImage));

puzzlePiecesDivs.forEach(puzzleDiv => {
    const pieces = puzzleDiv.querySelectorAll("img");
    pieces.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));
});

dropZones.forEach(zone => {
    zone.addEventListener("dragover",handleOver);
    zone.addEventListener("drop", handleDrop);
})

resetButton.addEventListener("click", resetPuzzlePieces);
