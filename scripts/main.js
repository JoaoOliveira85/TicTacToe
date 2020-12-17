const GRIDSIZE = 3;

window.drawGrid = (function () {
	const gameBoard = document.querySelector("#gameBoard");
	let gridItems = [];
	for (let i = 0; i < GRIDSIZE; i++) {
		for (let j = 0; j < GRIDSIZE; j++) {
			gridItems.push({
				coords: `${i}:${j}`,
				text: "",
			});
		}
	}

	function render() {
		while (gameBoard.lastChild) {
			gameBoard.lastChild.remove();
		}
		gridItems.map((cell) => {
			const _cellItem = document.createElement("div");
			_cellItem.innerText = `${cell.text}`;
			_cellItem.className = "gridCell";
			_cellItem.id = `${cell.coords[0]}${cell.coords[2]}`;
			_cellItem.addEventListener("click", () => {
				window.gameLogic.matchPlay(cell);
				render();
			});
			gameBoard.appendChild(_cellItem);
		});
	}
	render();

	gameBoard.style.gridTemplateColumns = `repeat(${GRIDSIZE}, 1fr)`;

	return { gameBoard, gridItems, render };
})();

window.gameLogic = (function () {
	let _gameOver = false;
	let _currentTurn = true;
	function matchPlay(cell) {
		if (!(cell.text === "") || _gameOver) {
			return;
		}
		_currentTurn
			? playerA.humanPlay(`${cell.coords}`)
			: playerB.computerPlay();
        _currentTurn = !_currentTurn;
        switch (evaluateWinner(cell)) {
            case 1: 
                console.log(`${playerA.name} wins!!`);
                break;
            case 2:
                console.log(`${playerB.name} wins!!`);
                break
            case 3:
                console.log("It's a Draw! :(");
                break;
        }
	}
	function evaluateWinner() {
		const gameGrid = window.drawGrid.gridItems;
        if ((gameGrid[0].text === "X" && gameGrid[1].text  === "X" && gameGrid[2].text  === "X") || (gameGrid[3].text === "X" && gameGrid[4].text  === "X" && gameGrid[5].text  === "X") || (gameGrid[6].text === "X" && gameGrid[7].text  === "X" && gameGrid[8].text  === "X") || (gameGrid[0].text === "X" && gameGrid[4].text  === "X" && gameGrid[8].text  === "X") || (gameGrid[2].text === "X" && gameGrid[4].text  === "X" && gameGrid[6].text  === "X")) {
            _gameOver = true;
            return 1;
        } else if ((gameGrid[0].text === "O" && gameGrid[1].text  === "O" && gameGrid[2].text  === "O") || (gameGrid[3].text === "O" && gameGrid[4].text  === "O" && gameGrid[5].text  === "O") || (gameGrid[6].text === "O" && gameGrid[7].text  === "O" && gameGrid[8].text  === "O") || (gameGrid[0].text === "O" && gameGrid[4].text  === "O" && gameGrid[8].text  === "O") || (gameGrid[2].text === "O" && gameGrid[4].text  === "O" && gameGrid[6].text  === "O"))  {
            _gameOver = true;
            return 2;
        } else if (!gameGrid.map(element => element.text).includes("")) {
            _gameOver = true;
            return 3;
        }
	}
	return { matchPlay, evaluateWinner };
})();

const player = function (name, symbol) {
	function humanPlay(position) {
		return (window.drawGrid.gridItems.find(
			(item) => item.coords === `${position}`
		).text = `${symbol}`);
	}
	function computerPlay() {
		return (window.drawGrid.gridItems.find((item) => item.coords === `${Math.round(Math.random()*9)}:${Math.round(Math.random()*9)}`).text = `${symbol}`)
	}
	return { name, humanPlay, computerPlay };
};

const playerA = player("Player A", "X");
const playerB = player("Player B", "O");
