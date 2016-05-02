var firstGamePiece, secondGamePiece, thirdGamePiece, firstObstacle, ctx;
var allObstacles = [];

// this is our exec code
// first game piece moves hard coded
// second game piece has onclick speed and direction control
// third game piece is keyboard controlled
function startGame() {
  firstGamePiece = new component(30, 30, "rgba(0, 0, 255, 0.5)", 10, 120);
  secondGamePiece = new component(30, 30, "brown", 10, 120);
  thirdGamePiece = new component(20, 20, "black", 30, 120);
  firstObstacle = new component(10, 200, "red", 300, 120);
  myGameArea.start();
}

// this object's canvas attribute creates the canvas
// start attribute sets the size and context
// insertBefore() makes it the first child of body
// setInterval sets refresh interval of GameArea every 20th millisecond (50/sec)
var myGameArea = {
  canvas: document.createElement('canvas'),
  start: function() {
    this.canvas.height = 600;
    this.canvas.width = 1000;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    // counting frames
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
    // keyboard press sets key property. key value when pressed, false when not.
    // "e" is variable that represents whatever key is pressed... array of keys
    window.addEventListener('keydown', function(e) {
      myGameArea.keys = (myGameArea.keys || []);
      myGameArea.keys[e.keyCode] = true;
    });
    window.addEventListener('keyup', function(e) {
      myGameArea.keys[e.keyCode] = false;
    });
  },
  // we're clearing the canvas here
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  // this is a way to stop the game
  stop: function() {
    clearInterval(this.interval);
  }
};

// component constructor creates a component
// takes size, color, and location as args
// context of game area object is styled with args
// update is a function to be called when drawing
// added X & Y speed attributes to properties
// newPos updates those properties
function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  // this is gravity
  this.gravity = 0.05;
  this.gravitySpeed = 0;
  this.update = function() {
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
    // to increment or decrement gravity
    this.gravitySpeed += this.gravity;
  };
  // this next function reads the position of object sides
  // map out all combinations of collistion
  // return true if there a collision. return false if not
  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
      crash = false;
    }
    return crash;
  };
}

// this calls the clear method first
// drawing methods are newPos and update (only for hard coded movement)
// incrementing GamePiece's x and y locations will move it on interval
// firstGamePiece is controlled by newPos function
function updateGameArea() {
  // following for and if loops are looping through every obstacle to find crash
  var i, x, y;
  for (i = 0; i < allObstacles.length; i += 1) {
    if (thirdGamePiece.crashWith(allObstacles[i])) {
      myGameArea.stop();
      return;
    }
  }
  myGameArea.clear();
  myGameArea.frameNo += 1;
  if (myGameArea.frameNo === 1 || everyinterval(150)) {
    x = myGameArea.canvas.width;
    y = myGameArea.canvas.height - 200;
    allObstacles.push(new component(10, 200, "green", x, y));
  }
  for (i = 0; i < allObstacles.length; i += 1) {
    // this next line moves the obstacles
    allObstacles[i].x += -1;
    allObstacles[i].update();
  }
  firstGamePiece.newPos();
  firstGamePiece.update();

  secondGamePiece.y += 1;
  secondGamePiece.x += 2;
  secondGamePiece.update();

  thirdGamePiece.speedX = 0;
  thirdGamePiece.speedY = 0;
  // these next lines are checking for what key (array form) is pressed (numbers are arrow keys)
  // canvas must be selected/in focus for this to work
  if (myGameArea.keys && myGameArea.keys[37]) {thirdGamePiece.speedX = -1;}
  if (myGameArea.keys && myGameArea.keys[39]) {thirdGamePiece.speedX = 1;}
  if (myGameArea.keys && myGameArea.keys[38]) {thirdGamePiece.speedY = -1;}
  if (myGameArea.keys && myGameArea.keys[40]) {thirdGamePiece.speedY = 1;}
  thirdGamePiece.newPos();
  thirdGamePiece.update();
  // move the obstacle if you need to just like other components using x and y
  firstObstacle.update();
}

// each of these functions controlls speed of firstGamePiece
// add onclick buttons to html to control this piece
function moveup() {
  firstGamePiece.speedY -= 1;
}

function movedown() {
  firstGamePiece.speedY += 1;
}

function moveleft() {
  firstGamePiece.speedX -= 1;
}

function moveright() {
  firstGamePiece.speedX += 1;
}

function stopmove() {
  firstGamePiece.speedX = 0;
  firstGamePiece.speedY = 0;
}

// this frame counter one is strange
// returns true when frame matches given interval
function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 === 0) {return true;}
  return false;
}

// WATCH YOUR SPELLING!

