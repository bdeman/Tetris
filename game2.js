var tetrisField = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
];

const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");

let key = {up:false, left:false, right:false, down:false, spacebar:false};


var tBlock = [
  [
    [0,0,0],
    [1,1,1],
    [0,1,0]
  ],
  [
    [0,1,0],
    [1,1,0],
    [0,1,0]
  ],
  [
    [0,1,0],
    [1,1,1],
    [0,0,0]
  ],
  [
    [0,1,0],
    [0,1,1],
    [0,1,0]
  ],
];

var lBlock = [
  [
    [0,0,0,0],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0]
  ],
  [
    [0,0,1,0],
    [0,0,1,0],
    [0,0,1,0],
    [0,0,1,0]
  ],
  [
    [0,0,0,0],
    [0,0,0,0],
    [1,1,1,1],
    [0,0,0,0]
  ],
  [
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0]
  ],
];

var zBlockL = [
  [
    [1,1,0],
    [0,1,1],
    [0,0,0]
  ],
  [
    [0,0,1],
    [0,1,1],
    [0,1,0]
  ],
  [
    [0,0,0],
    [1,1,0],
    [0,1,1]
  ],
  [
    [0,1,0],
    [1,1,0],
    [1,0,0]
  ],
];

var zBlockR = [
  [
    [0,1,1],
    [1,1,0],
    [0,0,0]
  ],
  [
    [0,1,0],
    [0,1,1],
    [0,0,1]
  ],
  [
    [0,0,0],
    [0,1,1],
    [1,1,0]
  ],
  [
    [1,0,0],
    [1,1,0],
    [0,1,0]
  ],
];

var lBlockR = [
  [
    [0,1,0],
    [0,1,0],
    [0,1,1]
  ],
  [
    [0,0,0],
    [1,1,1],
    [1,0,0]
  ],
  [
    [1,1,0],
    [0,1,0],
    [0,1,0]
  ],
  [
    [0,0,1],
    [1,1,1],
    [0,0,0]
  ],
];

var lBlockL = [
  [
    [0,1,0],
    [0,1,0],
    [1,1,0]
  ],
  [
    [1,0,0],
    [1,1,1],
    [0,0,0]
  ],
  [
    [0,1,1],
    [0,1,0],
    [0,1,0]
  ],
  [
    [0,0,0],
    [1,1,1],
    [0,0,1]
  ],
];

var sqBlock = [
  [
    [1,1],
    [1,1],
  ],
  [
    [1,1],
    [1,1],
  ],
  [
    [1,1],
    [1,1],
  ],
  [
    [1,1],
    [1,1],
  ],
];

var pieces = [[lBlockL,"orange"],[lBlockR,"purple"],[zBlockL,"red"],[zBlockR,"green"],[tBlock,"yellow"],[lBlock,"cyan"],[sqBlock,"blue"]];

function randomPiece() {
	var randNumber= Math.floor(Math.random()*pieces.length);
	return new Piece(pieces[randNumber][0],pieces[randNumber][1]);
}

var randomTetrisPiece = randomPiece();

function drawPlayingField(){
	for(y = 0; y < 20; y++) {
		for(x=0; x < 10; x++) {
			drawSquare(x,y,tetrisField[y][x]);
		}
	}
}

drawPlayingField();

function drawSquare(x,y,color){
	if(color == 0) {
		color = "WHITE";
	}
	
    ctx.fillStyle = color;
    ctx.fillRect(x*20,y*20,20,20);

    ctx.strokeStyle = "BLACK";
    ctx.strokeRect(x*20,y*20,20,20);
}


function Piece(tetrispiece, color) {
	
  this.tetrispiece = tetrispiece;
  this.color = color;

  this.index = 0;

  this.activeTetrispieceState = this.tetrispiece[this.index];

  this.x = 3;
  this.y = -2;

}

// r = row (y)
// c = column (x)
Piece.prototype.fill = function(color) {

  for(y = 0; y < this.activeTetrispieceState.length; y++) {
	  
	for(x= 0; x<this.activeTetrispieceState.length; x++) {
		
		if(this.activeTetrispieceState[y][x]) {
			drawSquare(this.x + x, this.y + y,color);
		}
	}
  }

}

Piece.prototype.draw = function() {
	this.fill(this.color);//this.color);
}

Piece.prototype.unDraw = function() {
	this.fill(0);
}

Piece.prototype.moveDown = function() {
	if(!this.collision(0,1,this.activeTetrispieceState)) {
		this.unDraw();
		this.y++;
		this.draw();
	} else {
		this.lock();
		randomTetrisPiece = randomPiece();
		console.log("collided");
		
	}
}

document.addEventListener("keydown", function(event) {
	switch(event.keyCode) {
		case 32:
			key.spacebar = true;
			break;
		case 37:
			key.left = true;
			//randomTetrisPiece.moveLeft();
			break;
		case 38:
			key.up = true;
			//randomTetrisPiece.rotate();
			console.log("up");
			break;
		case 39:
			key.right = true;
			//randomTetrisPiece.moveRight();
			break;
		case 40:
			
			dropStart = Date.now();
			key.down = true;
			//randomTetrisPiece.moveDown();
			break;
	}
});


document.addEventListener("keyup", function(event) {
	switch(event.keyCode) {
		case 37:
			key.left = false;
			//randomTetrisPiece.moveLeft();
			break;
		case 38:
			key.up = false;
			//randomTetrisPiece.rotate();
			console.log("up");
			break;
		case 39:
			key.right = false;
			//randomTetrisPiece.moveRight();
			break;
		case 40:
			
			dropStart = Date.now();
			key.down = false;
			//randomTetrisPiece.moveDown();
			break;
	}
});


Piece.prototype.moveLeft = function() {
	if(!this.collision(-1,0, this.activeTetrispieceState)){
		this.unDraw();
		this.x--;
		this.draw();
	}
}


Piece.prototype.moveRight = function() {
	if(!this.collision(1,0, this.activeTetrispieceState)){
		this.unDraw();
		this.x++;
		this.draw();
	}
}

Piece.prototype.rotate = function() {
	
	var nextPattern = this.tetrispiece[(this.index + 1)%this.tetrispiece.length];
	var kick = 0;
	
	if(this.collision(0,0,nextPattern)) {
		if(this.x > 10/2) {
			kick =-1;
		} else {
			kick = 1;
		}
	}
	
	if(!this.collision(kick,0,nextPattern)) {
		this.unDraw();
		this.x += kick;
		this.index = (this.index + 1)%this.tetrispiece.length;
		this.activeTetrispieceState = this.tetrispiece[this.index];
		this.draw();
	}
	
}

Piece.prototype.collision = function(px,py,piece) {
	
	for(y = 0; y < piece.length; y++) {
		for(x=0;x < piece.length; x++) {
			if(!piece[y][x]) {
				continue;
			}
			
			var newX = this.x + x + px;
			var newY = this.y + y + py;
			
			if(newX < 0 || newX >= 10 || newY >= 20) {
				return true;
			}
			
			if(newY < 0) {
				continue;
			}
			
			if(tetrisField[newY][newX] !== 0) {
				return true;
			}
		}
		
	}
	
	return false;
	
}
let keyInputStart = Date.now();

let move = function() {
	
	let keyInputEnd = Date.now();
	let deltaKey = keyInputEnd - keyInputStart;
	
	if(deltaKey> 40) {
		if (key.left) {randomTetrisPiece.moveLeft();}
		if (key.right) {randomTetrisPiece.moveRight();}
		if (key.up) {
		  randomTetrisPiece.rotate();
		}
		if (key.down) {randomTetrisPiece.moveDown()}
		
		keyInputStart = Date.now();
	}
	
};


Piece.prototype.lock = function(){
    for( r = 0; r < this.activeTetrispieceState.length; r++){
        for(c = 0; c < this.activeTetrispieceState.length; c++){
            // we skip the vacant squares
            if( !this.activeTetrispieceState[r][c]){
                continue;
            }
            // pieces to lock on top = game over
            if(this.y + r < 0){
                alert("Game Over");
                // stop request animation frame
                gameOver = true;
                break;
            }
            // we lock the piece
            tetrisField[this.y+r][this.x+c] = this.color;
        }
    }
    // remove full rows
    for(r = 0; r < 20; r++){
        let isRowFull = true;
        for( c = 0; c < 10; c++){
            isRowFull = isRowFull && (tetrisField[r][c] != 0);
        }
        if(isRowFull){
            // if the row is full
            // we move down all the rows above it
            for( y = r; y > 1; y--){
                for( c = 0; c < 10; c++){
                    tetrisField[y][c] = tetrisField[y-1][c];
                }
            }
            // the top row board[0][..] has no row above it
            for( c = 0; c < 10; c++){
                tetrisField[0][c] = 0;
            }
            // increment the score
            //score += 10;
        }
    }
    // update the board
    drawPlayingField();
    
    // update the score
    //scoreElement.innerHTML = score;
}


let dropStart = Date.now();

let gameOver = false;
function drop(){
    let now = Date.now();
    let delta = now - dropStart;
	move();
    if(delta > 1000){
        randomTetrisPiece.moveDown();
        dropStart = Date.now();
    }
    if(!gameOver){
			
        requestAnimationFrame(drop);
    }
}

drop();
