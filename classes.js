const tiles = [];
let current_tile
const transforms = {x : 0, y : 0, rotate : 0};



class Tile { 
    constructor(i, j){
        this.i = i;
        this.j = j;
        this.room = null;
        this.openSpace = false;
        this.defined = false;

    }
}

function createTiles(){
    for (let i = 0; i <= 40; i++) {
        tiles[i] = [];
        for (let j = 0; j <= 40; j++) {
            tiles[i][j] = new Tile(i, j);
        }
    }
}

function drawTiles(){
    for (let i = 0; i <= 40; i++) {
        for (let j = 0; j <= 40; j++) {
            if(tiles[i][j].room === 'livingRoom'){
                cs .fill(255,0,0);
                cs. stroke(255,0,0);
                cs. circle(width/2  + (i-20) * gridSize, height/2 + (j-20) * gridSize, 10);
            }
            if(tiles[i][j].openSpace){
                cs .fill(100, 255, 100);
                cs. noStroke();
                cs. circle(width/2  + (i-20) * gridSize, height/2 + (j-20) * gridSize, 5);
            }
            if(!tiles[i][j].defined){
                cs .fill(100,100,255);
                cs. noStroke();
                cs. circle(width/2  + (i-20) * gridSize, height/2 + (j-20) * gridSize, 10);
            }
        }
    }
}

function frontTile(current_tile){
    return tiles[current_tile.i + Math.cos(transforms.rotate)][current_tile.j + Math.sin(transforms.rotate)];
}

function leftTile(current_tile){
    return tiles[current_tile.i + Math.cos(transforms.rotate - PI/2)][current_tile.j + Math.sin(transforms.rotate - PI/2)];
}

function rightTile(current_tile){
    return tiles[current_tile.i + Math.cos(transforms.rotate + PI/2)][current_tile.j + Math.sin(transforms.rotate + PI/2)];
}

function backTile(current_tile){
    return tiles[current_tile.i + Math.cos(transforms.rotate + PI)][current_tile.j + Math.sin(transforms.rotate + PI)];
}


//cursors


createButtons = () => {
    for (let i = 0; i < cursors.length; i++) {
        let button = createButton(cursors[i]);
        button.position(3, 25 * i + 3);
        button.mousePressed(window[cursors[i]]);
    }
    for (let i = 0; i < movements.length; i++) {
        let button = createButton(movements[i]);
        button.position(150, 25 * i + 3);
        button.mousePressed(window[movements[i]]);
      
    }

    
}

//create an array to store all the buttons be clicked by the user
const clickedButtons = [];


function setTileProperties(tile, roomString, openSpace, defined){
    tile.room = roomString;
    tile.openSpace = openSpace;
    tile.defined = defined;
}
