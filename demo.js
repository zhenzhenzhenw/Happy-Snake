var content = document.getElementById('content');
var startPage = document.getElementById('startPage');
var scoreBox = document.getElementById('score');
var lose = document.getElementById('lose');
var loserScore = document.getElementById('loserScore');
var close = document.getElementById('close');
var startP = document.getElementById('startP');
var startPage = document.getElementById('startPage');
var startBtn = document.getElementById('startBtn');
var rightside=document.getElementById('right-side');
var startGameBool = true;
var startPauseBool = true;
var snakeMove;
var speed = 200;
init();

function init() {
	//地图
	this.mapW = parseInt(getComputedStyle(content).width);
	this.mapH = parseInt(getComputedStyle(content).height);
	this.mapDiv = content;
	//食物
	this.foodW = 20;
	this.foodH = 20;
	this.foodX = 0;
	this.foodY = 0;
	//蛇 使用数组来表示一条蛇
	this.snakeW = 20;
	this.snakeH = 20;
	this.snakeBody = [
		[4, 1, 'head'],
		[3, 1, 'body'],
		[2, 1, 'body']
	];
	//游戏属性
	this.direct = 'right';
	this.left = false;
	this.right = false;
	this.up = true;
	this.down = true;
	this.score = 0;
	bindEvent();
}

function startGame() {
	rightside.innerHTML='abou,我问你。情人眼里出西施，那西施眼里出什么？输了告诉你';
	startPage.style.display = 'none';
	startP.style.display = 'block';
	food();
	snake();
}

function food() {
	var food = document.createElement('div');
	food.style.width = this.foodW + 'px';
	food.style.height = this.foodH + 'px';
	food.style.position = 'absolute';
	this.foodX = Math.floor(Math.random() * (this.mapW / 20));
	this.foodY = Math.floor(Math.random() * (this.mapH / 20));
	food.style.left = this.foodX * 20 + 'px';
	food.style.top = this.foodY * 20 + 'px';
	this.mapDiv.appendChild(food).setAttribute('class', 'food');
}

function snake() {
	for (var i = 0; i < this.snakeBody.length; i++) {
		var snake = document.createElement('div');
		snake.style.width = this.snakeW + 'px';
		snake.style.height = this.snakeH + 'px';
		snake.style.position = 'absolute';
		snake.style.left = this.snakeBody[i][0] * 20 + 'px';
		snake.style.top = this.snakeBody[i][1] * 20 + 'px';
		snake.classList.add(this.snakeBody[i][2]);
		this.mapDiv.appendChild(snake).classList.add('snake');
		switch (direct) {
			case 'right':
				break;
			case 'up':
				snake.style.transform = 'rotate(270deg)';
				break;
			case 'down':
				snake.style.transform = 'rotate(90deg)';
				break;
			case 'left':
				snake.style.transform = 'rotate(180deg)';
				break;
			default:
				break;
		}
	}
}

function move() {
	for (var i = this.snakeBody.length - 1; i > 0; i--) {
		this.snakeBody[i][0] = this.snakeBody[i - 1][0];
		this.snakeBody[i][1] = this.snakeBody[i - 1][1];
	}
	switch (this.direct) {
		case 'right':
			this.snakeBody[0][0] += 1;
			break;
		case 'up':
			this.snakeBody[0][1] -= 1;
			break;
		case 'left':
			this.snakeBody[0][0] -= 1;
			break;
		case 'down':
			this.snakeBody[0][1] += 1;
			break;
		default:
			break;
	}
	removeClass('snake');
	snake();
	if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
		var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
		var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
		// switch(this.direct){
		// 	case 'right':
		// 	this.snakeBody.push([snakeEndX-1,snakeEndY,'body']);
		// 	break;
		// 	case 'left':
		// 	this.snakeBody.push([snakeEndX+1,snakeEndX,'body']);
		// 	break;
		// 	case 'up':
		// 	this.snakeBody.push([snakeEndX,snakeEndY+1,'body']);
		// 	break;
		// 	case 'down':
		// 	this.snakeBody.push([snakeEndX,snakeEndY-1,'body']);
		// 	break;
		// }
		this.snakeBody.push([0, 0, 'body']);
		this.score += 1;
		scoreBox.innerHTML = this.score;
		removeClass('food');
		food();
	}
	if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW / 20) {
		reloadGame();
	}
	if (this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH / 20) {
		reloadGame();
	}
	var snakeHX = this.snakeBody[0][0];
	var snakeHY = this.snakeBody[0][1];
	for (var i = 1; i < this.snakeBody.length; i++) {
		if (snakeHX == snakeBody[i][0] && snakeHY == snakeBody[i][1]) {
			reloadGame();
			break;
		}
	}
}

function reloadGame() {
	removeClass('snake');
	removeClass('food');
	clearInterval(snakeMove);
	this.snakeBody = [
		[4, 1, 'head'],
		[3, 1, 'body'],
		[2, 1, 'body']
	];
	this.direct = 'right';
	this.left = false;
	this.right = false;
	this.up = true;
	this.down = true;
	lose.style.display = 'block';
	loserScore.innerHTML = this.score;
	this.score = 0;
	scoreBox.innerHTML = this.score;
	startGameBool = true;
    startPauseBool = true;
    startP.setAttribute('src', './img/start.png')
    rightside.innerHTML='眼屎！哈 ，西施眼里出眼屎啊！';
}

function removeClass(className) {
	var ele = document.getElementsByClassName(className);
	while (ele.length > 0) {
		ele[0].parentNode.removeChild(ele[0]);
	}
}

function setDirect(code) {
	switch (code) {
		case 37:
			if (this.left) {
				this.direct = 'left';
				this.left = false;
				this.right = false;
				this.up = true;
				this.down = true;
			}
			break;
		case 38:
			if (this.up) {
				this.direct = 'up';
				this.left = true;
				this.right = true;
				this.up = false;
				this.down = false;
			}
			break;
		case 39:
			if (this.right) {
				this.direct = 'right';
				this.left = false;
				this.right = false;
				this.up = true;
				this.down = true;
			}
			break;
		case 40:
			if (this.down) {
				this.direct = 'down';
				this.left = true;
				this.right = true;
				this.up = false;
				this.down = false;
			}
			break;
		default:
			break;
	}
}

function bindEvent() {
	close.onclick = function() {
		lose.style.display = 'none';		
	}
	startBtn.onclick = function() {
		startAndPaush();
	}
	startP.onclick = function() {
		startAndPaush();
	}
}

function startAndPaush() {
	if (startPauseBool) {
		if (startGameBool) {
			lose.style.display = 'none';
			startGame();
			startGameBool = false;
		}
		startP.setAttribute('src', './img/pause.png');
		document.onkeydown = function(e) {
			e.preventDefault();
			var code = e.keyCode;
			setDirect(code);
		}
		snakeMove = setInterval(function() {
			move();
		}, speed);
		startPauseBool = false;
	} else {
		startP.setAttribute('src', './img/start.png');
		clearInterval(snakeMove);
		document.onkeydown = function(e) {
			e.returnValue = false;
			return false;
		};
		startPauseBool = true;
	}
}