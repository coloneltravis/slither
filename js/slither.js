

var GAMELOOP_TIMER = 10;
var MAXROWS = 20;
var MAXCOLS = 30;
var CELLSIZE = 20;


var Slither = {

	gameLoop: 1,
	gameTimer: 0,
	gameStarted: 0,
	gameOver: 0,

	foodCount: 0,

	gameArea: null,	
	gamePanel: null,
	backPanel: null,

	gameGrid: Array(),
	ctx: Array(),

	timeUnit: 0,
	snake: null,
	fruit: null,


    initGame: function() {

		var that = this;

		this.gameArea = document.getElementById('gamearea');
		this.gameArea.addEventListener('keydown', function(e) {that.keyPressed(e); });

		var startstopButton = document.getElementById('startstop-button');
		startstopButton.addEventListener('click', function(e) {that.startstopClicked(e); });

		for (var y=0; y < MAXROWS; y++) {
			this.gameGrid[y] = []; 
			for (var x=0; x < MAXCOLS; x++) {
				this.gameGrid[y][x] = '0';
			}
		}

		this.setupGrid();
	},


	setupGrid: function() {

		this.backPanel = document.createElement('CANVAS');
		this.gamePanel = document.createElement('CANVAS');

		this.backPanel.setAttribute("id", "backpanel");
		this.gamePanel.setAttribute("id", "gamepanel");
	
		this.gameArea.appendChild(this.backPanel);
		this.gameArea.appendChild(this.gamePanel);

		this.ctx[0] = this.backPanel.getContext('2d');
		this.ctx[1] = this.gamePanel.getContext('2d');

		var layoutWidth = (MAXCOLS*CELLSIZE);
		var layoutHeight = (MAXROWS*CELLSIZE);

		this.backPanel.width = layoutWidth;
		this.backPanel.height = layoutHeight;
		this.gamePanel.width = layoutWidth;
        this.gamePanel.height = layoutHeight;
	},


    onTimer: function() {

		this.timeUnit++;

		if (this.gameOver == 1) {
			clearInterval(this.gameTimer);
			this.gameTimer = null;
			this.gameStarted = 0;
			this.timeUnit = 0;
			delete(this.snake);
			this.snake = null;
		}
		else {
	
			if (this.timeUnit % (50-(5*this.gameLoop)) == 0) {
				this.snake.clear(this.ctx[1], this.gameGrid);				

				this.snake = this.snake.move(1);
				
				if (this.snake.check(this.gameGrid, 'A')) {
					if (this.fruit) {
						this.foodCount++;
						this.fruit.clear(this.ctx[1], this.gameGrid);
						delete(this.fruit);
						this.fruit = null;

						// make the snake faster after every 5 fruits eaten
						if (this.foodCount % 5 == 0) {
							this.gameLoop++;
						}
					}
				}

				this.snake.draw(this.ctx[1], this.gameGrid);

				if (this.snake.check(this.gameGrid, 'S')) {
					this.gameOver = 1;
				}

				if (this.fruit === null) {
					var x = Math.floor(Math.random() * MAXCOLS);
					var y = Math.floor(Math.random() * MAXROWS);
					if (this.gameGrid[y][x] == '0') {
						this.fruit = new Fruit(x, y, 'A').init();
					}
				}
				else this.fruit.draw(this.ctx[1], this.gameGrid, CELLSIZE, CELLSIZE);
			}
		}
    },


    keyPressed: function(event) {
		event.preventDefault();

		if (event.target == document.getElementById('gamearea')) {

			switch (event.keyCode) {
				case 37 : this.snake = this.snake.turn(LEFT);
				break;

				case 39 : this.snake = this.snake.turn(RIGHT);
				break;

				case 38 : this.snake = this.snake.turn(UP);
				break;

				case 40 : this.snake = this.snake.turn(DOWN);
				break;				
				default: break;
			}
		}
    },


	startstopClicked: function(e) {

		var self = this;
		var startstopButton = document.getElementById('startstop-button');

		if (!this.gameStarted) {
			this.gameloop = 0;
			this.gameOver = 0;

			var x = (MAXCOLS/2);
			var y = (MAXROWS/2);

			if (this.snake == null)
				this.snake = new Snake(x, y, 5).init();

			this.gameTimer = setInterval(function() {self.onTimer() }, GAMELOOP_TIMER);
			this.gameStarted = 1;
            startstopButton.innerHTML = 'Pause Game';
		}
		else {
			clearInterval(this.gameTimer);
			this.gameStarted = false;
			startstopButton.innerHTML = 'Start Game';
		}
	},
};





window.addEventListener('load', function(e) { onready() });

function onready() {

	var game = Object.create(Slither);
	game.initGame();
}

