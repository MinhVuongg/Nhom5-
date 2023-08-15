import Player from "./entities/player.js";
import Card from "./entities/card.js";
import CardContainer from "./entities/cardContainer.js";
import Button from "./entities/button.js";

const BG_COLOUR = "#bd9d7f";
var gameState = {};
const socket = io("http://localhost:5000");

socket.on("gameState", handleGameState);
socket.on("stageChange", handleStageChange);

function handleGameState(gs) {
  gameState = gs;
  cardContainer.addCards(gameState.cards);
}

socket.emit("joinGame");

function action(gameAction) {
  socket.emit("action", gameAction);
}

function handleStageChange(data) {
  ePlayer.data.healthPoint -= data.action.healthPoint;
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

const rect = canvas.getBoundingClientRect();
const offsetX = rect.left;
const offsetY = rect.top;

CanvasRenderingContext2D.prototype.roundRect = function (
  x,
  y,
  width,
  height,
  radius
) {
  if (width < 2 * radius) radius = width / 2;
  if (height < 2 * radius) radius = height / 2;
  this.beginPath();
  this.moveTo(x + radius, y);
  this.arcTo(x + width, y, x + width, y + height, radius);
  this.arcTo(x + width, y + height, x, y + height, radius);
  this.arcTo(x, y + height, x, y, radius);
  this.arcTo(x, y, x + width, y, radius);
  this.closePath();
  return this;
};

document.addEventListener("keydown", keydown);
function keydown(e) {
  if (e.keyCode == 13) {
    // enter
    socket.emit("confirmAction", e.keyCode);
  }
}

// Draw Player
let pHeight = 150;
let pWidth = pHeight * 0.8;
let pColor = "white";
let pXPoint = canvas.width - pWidth;
let pYPoint = canvas.height - pHeight;
let player = new Player(pXPoint, pYPoint, pWidth, pHeight, pColor);

// Draw cards
let cardHeight = 150;
let cardWidth = pHeight * 0.8;
let cardColor = "white";
let cardXPoint = canvas.width / 2 - cardWidth / 2;
let cardYPoint = canvas.height / 2 - cardHeight / 2;
let card = new Card(cardXPoint, cardYPoint, cardWidth, cardHeight, cardColor);

// Draw Enemy
let eHeight = 150;
let eWidth = pHeight * 0.8;
let eColor = "white";
let eXPoint = 0;
let eYPoint = 0;
let ePlayer = new Player(eXPoint, eYPoint, eWidth, eHeight, eColor);

// init card container
let ccXPoint = 150;
let ccYPoint = canvas.height - 150;
let ccWidth = canvas.width - 300;
let ccHeight = 150;
let ccColor = "white";
let cardContainer = new CardContainer(
  ccXPoint,
  ccYPoint,
  ccWidth,
  ccHeight,
  ccColor,
  gameState
);

// init button
let buttonHeight = 50;
let buttonWidth = 100;
let buttonColor = "gray";
let buttonXPoint = 0;
let buttonYPoint = pYPoint;
let button = new Button(
  buttonXPoint,
  buttonYPoint,
  buttonWidth,
  buttonHeight,
  buttonColor,
  { name: "Confirm" }
);

// mouse move event
const handleMouseMove = (e) => {
  const mouseX = e.clientX * devicePixelRatio - offsetX;
  const mouseY = e.clientY * devicePixelRatio - offsetY;
  ePlayer.hover(ctx, mouseX, mouseY);
  card.hover(ctx, mouseX, mouseY);
  cardContainer.hover(ctx, mouseX, mouseY);
  button.hover(ctx, mouseX, mouseY);
};
canvas.onmousemove = (e) => {
  handleMouseMove(e);
};

// mouse click event
const handleMouseUp = (e) => {
  const mouseX = e.clientX * devicePixelRatio - offsetX;
  const mouseY = e.clientY * devicePixelRatio - offsetY;
  ePlayer.click(ctx, mouseX, mouseY);
  card.click(ctx, mouseX, mouseY);
  cardContainer.click(ctx, mouseX, mouseY);
  if (button.isClick(ctx, mouseX, mouseY)) {
    confirm();
  }
};
canvas.onmouseup = (e) => {
  handleMouseUp(e);
};

// phase: 0 : Prepare
// phase: 1 : Judgment
// phase: 2 : Get Card
// phase: 3 : Post Card
// phase: 4 : Remove Card
// phase: 5 : End
// confirm
function confirm() {
  // get data
  let data = {
    phase: 3,
    cardSelected: getSelectedCards(),
    target: 1,
  };
  action(data);
}

function getSelectedCards() {
  let cards = [];
  cardContainer.cards.forEach((e) => {
    if (e.isChoose) cards.push(e.data);
  });
  return cards;
}

// game loop
const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const rect1 = canvas.getBoundingClientRect();
  canvas.width = rect1.width * devicePixelRatio;
  canvas.height = rect1.height * devicePixelRatio;

  ctx.scale(devicePixelRatio, devicePixelRatio);

  canvas.style.width = rect1.width + "px";
  canvas.style.height = rect1.height + "px";

  // draw background
  ctx.fillStyle = BG_COLOUR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  player.update(ctx);
  ePlayer.update(ctx);
  card.update(ctx);
  cardContainer.update(ctx, gameState);
  button.update(ctx);
};

animate();
