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
	let availableItems = () => {
		return window.drawGrid.gridItems.reduce((accumulator, curentItem) => {
			if (curentItem.text === "") {
				accumulator.push(curentItem.coords);
			}
			return accumulator;
		}, []);
	};

	let _gameOver = false;
	function matchPlay(cell) {
		if (availableItems().length >= 1 || !_gameOver) {
			playerA.play(`${cell.coords}`);
			evaluateWinner();
		}
		if (availableItems().length >= 1 || !_gameOver) {
			playerB.play();
			evaluateWinner();
		}

		switch (evaluateWinner()) {
			case 1:
				console.log(`${playerA.name} wins!!`);
				break;
			case 2:
				console.log(`${playerB.name} wins!!`);
				break;
			case 3:
				console.log("It's a Draw! :(");
				break;
		}
	}
	function evaluateWinner() {
		const gameGrid = window.drawGrid.gridItems;
		if (
			(gameGrid[0].text === playerA.symbol &&
				gameGrid[1].text === playerA.symbol &&
				gameGrid[2].text === playerA.symbol) ||
			(gameGrid[3].text === playerA.symbol &&
				gameGrid[4].text === playerA.symbol &&
				gameGrid[5].text === playerA.symbol) ||
			(gameGrid[6].text === playerA.symbol &&
				gameGrid[7].text === playerA.symbol &&
				gameGrid[8].text === playerA.symbol) ||
			(gameGrid[0].text === playerA.symbol &&
				gameGrid[3].text === playerA.symbol &&
				gameGrid[6].text === playerA.symbol) ||
			(gameGrid[1].text === playerA.symbol &&
				gameGrid[4].text === playerA.symbol &&
				gameGrid[7].text === playerA.symbol) ||
			(gameGrid[2].text === playerA.symbol &&
				gameGrid[5].text === playerA.symbol &&
				gameGrid[8].text === playerA.symbol) ||
			(gameGrid[0].text === playerA.symbol &&
				gameGrid[4].text === playerA.symbol &&
				gameGrid[8].text === playerA.symbol) ||
			(gameGrid[2].text === playerA.symbol &&
				gameGrid[4].text === playerA.symbol &&
				gameGrid[6].text === playerA.symbol)
		) {
			_gameOver = true;
			return 1;
		} else if (
			(gameGrid[0].text === playerB.symbol &&
				gameGrid[1].text === playerB.symbol &&
				gameGrid[2].text === playerB.symbol) ||
			(gameGrid[3].text === playerB.symbol &&
				gameGrid[4].text === playerB.symbol &&
				gameGrid[5].text === playerB.symbol) ||
			(gameGrid[6].text === playerB.symbol &&
				gameGrid[7].text === playerB.symbol &&
				gameGrid[8].text === playerB.symbol) ||
			(gameGrid[0].text === playerB.symbol &&
				gameGrid[3].text === playerB.symbol &&
				gameGrid[6].text === playerB.symbol) ||
			(gameGrid[1].text === playerB.symbol &&
				gameGrid[4].text === playerB.symbol &&
				gameGrid[7].text === playerB.symbol) ||
			(gameGrid[2].text === playerB.symbol &&
				gameGrid[5].text === playerB.symbol &&
				gameGrid[8].text === playerB.symbol) ||
			(gameGrid[0].text === playerB.symbol &&
				gameGrid[4].text === playerB.symbol &&
				gameGrid[8].text === playerB.symbol) ||
			(gameGrid[2].text === playerB.symbol &&
				gameGrid[4].text === playerB.symbol &&
				gameGrid[6].text === playerB.symbol)
		) {
			_gameOver = true;
			return 2;
		} else if (availableItems().length === 0) {
			_gameOver = true;
			return 3;
		}
	}
	return { matchPlay, evaluateWinner, availableItems };
})();

const player = function (name, symbol, type) {
	function _humanPlay(position) {
		 {
			return (window.drawGrid.gridItems.find(
				(item) => item.coords === `${position}`
			).text = `${symbol}`);
		}
	}
	function _computerPlay() {
		if (window.gameLogic.availableItems().length === 0) {
			return;
		}
		function _generatePosition() {
			return `${
				window.gameLogic.availableItems()[
					Math.floor(
						Math.random() *
							Math.floor(window.gameLogic.availableItems().length - 1)
					)
				]
			}`;
		}

		const _cpuPosition = _generatePosition();

		return (window.drawGrid.gridItems.find(
			(item) => item.coords === _cpuPosition
		).text = `${symbol}`);
	}
	function play(position) {
		switch (type) {
			case "human":
				_humanPlay(position);
				break;
			case "cpu":
				_computerPlay();
				break;
		}
	}
	console.info(`Created player: ${name}`);
	return { name, play, symbol };
};

const playerA = player("Player A", "X", "human");
const playerB = player("Player B", "O", "cpu");
