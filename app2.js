// 游戏参数
const HEIGHT = 750;
const GRID_SIZE = 10;
const FPS = 60; // 延迟
const DELAY_END = 2;

// 派生
const WIDTH = HEIGHT * 0.9;
const CELL = WIDTH / (GRID_SIZE + 2);
const STROKE = CELL / 12;
const DOT = STROKE;
const MARGIN = HEIGHT - (GRID_SIZE + 1) * CELL;

// 颜色
const COLOR_BOARD = "#0f3057";
const COLOR_BORDER = "yellow";
const COLOR_DOT = "white";
const COLOR_AI = "orange";
const COLOR_AI_LIGHT = "rgba(255, 166, 0, 0.3)";
const COLOR_PLAYER = "lawngreen";
const COLOR_PLAYER_LIGHT = "rgba(126, 252, 0, 0.3)";
const COLOR_TIE = "white";

// canvas
let canvasEl = document.createElement("canvas");
canvasEl.height = HEIGHT;
canvasEl.width = WIDTH;
document.body.appendChild(canvasEl);
let canvasRect = canvasEl.getBoundingClientRect();

// Context
const ConX = canvasEl.getContext("2d");
ConX.lineWidth = STROKE;
ConX.textAlign = "center";
ConX.textBaseline = "middle";
// game variables
let currentCells, playersTurn, squares;

// the game loop
function playGame() {
  requestAnimationFrame(playGame); // 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画
  drawBoard();
  drawSquares();
  drawGrid();
}

// drawBoard function
function drawBoard() {
  ConX.fillStyle = COLOR_BOARD;
  ConX.strokeStyle = COLOR_BORDER;
  ConX.fillRect(0, 0, WIDTH, HEIGHT);
  ConX.strokeRect(
    STROKE / 4,
    STROKE / 4,
    WIDTH - STROKE / 2,
    HEIGHT - STROKE / 2
  );
}
// drawDot function
function drawDot(x, y) {
  ConX.fillStyle = COLOR_DOT;
  ConX.beginPath();
  ConX.arc(x, y, DOT, 0, Math.PI * 2);
  ConX.fill();
}
// drawGrid  Function
function drawGrid() {
  for (let i = 0; i < GRID_SIZE + 1; i++) {
    for (let j = 0; j < GRID_SIZE + 1; j++) {
      drawDot(getGridX(j), getGridY(i));
    }
  }
}
// drawSquares function
function drawSquares() {
  for (let row of squares) {
    for (let square of row) {
      square.drawSides();
      square.drawFill();
    }
  }
}

// getGridX and getGridY function
function getGridX(col) {
  return CELL * (col + 1);
}

function getGridY(row) {
  return MARGIN + CELL * row;
}
// newGame function
function newGame() {
  playersTurn = Math.random() >= 0.5;
  // 设置正方形的数据
  squares = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    squares[i] = [];
    for (let j = 0; j < GRID_SIZE; j++) {
      squares[i][j] = new Square(getGridX(j), getGridY(i), CELL, CELL);
    }
  }
}
// Square class
class Square {
  constructor(x, y, w, h) {
    this.w = w;
    this.h = h;
    this.bottom = y + h;
    this.left = x;
    this.right = x + w;
    this.top = y;
    this.highlight = null;
    this.numSelected = 0;
    this.owner = null;
    this.sideBottom = { owner: null, selected: false };
    this.sideLeft = { owner: null, selected: false };
    this.sideRight = { owner: null, selected: false };
    this.sideTop = { owner: null, selected: false };
  }
  drawSides = () => {
    // 突出显示
    if (this.highlight != null) {
      this.drawSide(this.highlight, getColor(playersTurn, true));
    }

    if (this.sideBottom.selected) {
      this.drawSide(Side.BOTTOM, getColor(this.sideBottom.owner, false));
    }

    if (this.sideLeft.selected) {
      this.drawSide(Side.LEFT, getColor(this.sideLeft.owner, false));
    }

    if (this.sideRight.selected) {
      this.drawSide(Side.RIGHT, getColor(this.sideRight.owner, false));
    }

    if (this.sideTop.selected) {
      this.drawSide(Side.TOP, getColor(this.sideTop.owner, false));
    }
  };
}
newGame();
playGame();
