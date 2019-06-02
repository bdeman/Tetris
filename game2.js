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

let gameOver = false;

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
	}
}

Piece.prototype.instantDrop = function() {
	this.unDraw();
	while(!this.collision(0,1,this.activeTetrispieceState)) {
		this.y++;
	}
	this.draw();
	this.lock();
	randomTetrisPiece = randomPiece();
	/*
	if(!this.collision(0,1,this.activeTetrispieceState)) {
		this.unDraw();
		this.y++;
		this.draw();
	} else {
		this.lock();
		randomTetrisPiece = randomPiece();
		console.log("collided");
		
	}*/
}



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


document.addEventListener("keydown", function(event) {
	
	if(gameOver) { return 0;}
	switch(event.keyCode) {
		case 32:
			randomTetrisPiece.instantDrop();
			break;
		case 37:
			key.left = true;
			//randomTetrisPiece.moveLeft();
			break;
		case 38:
			//up
			randomTetrisPiece.rotate();
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



let keyInputStart = Date.now();

let move = function() {
	
	let keyInputEnd = Date.now();
	let deltaKey = keyInputEnd - keyInputStart;
	
	if(deltaKey> 40) {
		if (key.left) {randomTetrisPiece.moveLeft();}
		if (key.right) {randomTetrisPiece.moveRight();}
	//	if (key.up) {
		//  randomTetrisPiece.rotate();
		//}
		if (key.down) {randomTetrisPiece.moveDown()}
		
		keyInputStart = Date.now();
	}
	
};

function gameOverScreen() {
	ctx.save();
	ctx.fillStyle = '#000';
	
	ctx.globalAlpha = 0.2;
	ctx.fillRect(0,0,200,400);
	ctx.globalAlpha = 1.0;
	ctx.fillStyle = '#fff';
	ctx.font = "30px Arial";
	ctx.fillText("Game OVER", 20, 200);
	
}

Piece.prototype.lock = function(){
    for( y = 0; y < this.activeTetrispieceState.length; y++){
        for(x = 0; x < this.activeTetrispieceState.length; x++){
            // we skip the vacant squares
            if( !this.activeTetrispieceState[y][x]){
                continue;
            }
            // pieces to lock on top = game over
            if(this.y + y < 0){
				
                gameOver = true;
				requestAnimationFrame(gameOverScreen);
				
                // stop request animation frame
				console.log("gaME OVER");
                break;
            }
            // we lock the piece
            tetrisField[this.y+y][this.x+x] = this.color;
        }
    }
    // remove full rows
    for(y = 0; y < 20; y++){
        let isRowFull = true;
        for(x = 0; x < 10; x++){
            isRowFull = isRowFull && (tetrisField[y][x] != 0);
        }
        if(isRowFull){
            // if the row is full
            // we move down all the rows above it
            for( y = y; y > 1; y--){
                for( x = 0; x < 10; x++){
                    tetrisField[y][x] = tetrisField[y-1][x];
                }
            }
            // the top row board[0][..] has no row above it
            for( x = 0; x < 10; x++){
                tetrisField[0][x] = 0;
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
