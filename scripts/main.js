const GRIDSIZE = 3;

window.drawGrid = (function(){
    const gameBoard = document.querySelector("#gameBoard");
    let gridItems = []
    for (let i = 0; i < GRIDSIZE; i++) {
        for (let j = 0; j < GRIDSIZE; j++) {
            gridItems.push({
                coords:`${i}:${j}`,
                text: ""
            })
        }
    }

    function render() {
        while (gameBoard.lastChild) {
            gameBoard.lastChild.remove()
        }
        gridItems.map(cell => {
            const _cellItem = document.createElement("div");
            _cellItem.innerText = `${cell.text}`
            _cellItem.className = "gridCell"
            _cellItem.id = `${cell.coords[0]}${cell.coords[2]}`
            _cellItem.addEventListener("click", () => {
                window.gameLogic.matchPlay(cell)
                render();
            })
            gameBoard.appendChild(_cellItem);
        })
    }
    render();
    
    gameBoard.style.gridTemplateColumns = `repeat(${GRIDSIZE}, 1fr)`;
    
    return { gameBoard, gridItems, render };
})()

window.gameLogic = (function(){
    let _gameOver = false;
    let _currentTurn = true;
    function matchPlay(cell) {
        if (!(cell.text === "") || _gameOver){
            return
        }
        _currentTurn ? playerA.play(`${cell.coords}`) : playerB.play(`${cell.coords}`)
        _currentTurn = !_currentTurn;
        if (evaluateWinner(cell) === 0) {
            console.info("Player A wins!")
        } else if (evaluateWinner(cell) === 1) {
            console.info("Player B wins")
        }
    }
    function evaluateWinner(){
        const magicNumbers = [8, 1, 6, 3, 5, 7, 4, 9, 2];
        const gameGrid = window.drawGrid.gridItems;
        for (let i = 0; i < gameGrid.length; i++){
            if (gameGrid[i].text === "X" || gameGrid[i].text === "O") {
                gameGrid[i].magicNumber = magicNumbers[i];
            }
        }
        // todo: evaluate winner. 
    }
    return ({matchPlay, evaluateWinner})
})()

const player = function(name, symbol){
    function play(position) {
        return window.drawGrid.gridItems.find(item => item.coords === `${position}`).text = `${symbol}`
        
    }
    return {play}
}

const playerA = player("Player A", "X")
const playerB = player("Player B", "O")
