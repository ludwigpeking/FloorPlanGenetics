function setup() {
    createTiles();
    createCanvas(windowWidth, windowHeight);
    fl = createGraphics(windowWidth, windowHeight);
    fxt = createGraphics(windowWidth, windowHeight);
    cursorLayer =  createGraphics(windowWidth, windowHeight);
    createButtons();
    styleSetups();

    start();
    entrance();
    livingRoomCursor();

}
function draw() {
    // fl.clear();
    // cursorLayer.clear();
    background(60);
    image(fl, 0, 0);
    image(fxt, 0, 0);
    image(cursorLayer, 0, 0);
}

function start(){
    transforms.x = width/2;
    transforms.y = height/2;

    translate(transforms.x, transforms.y);
    fl.translate (width/2, height/2);
    fxt.translate (width/2, height/2);
    cursorLayer.translate (width/2, height/2);
}

function livingRoomCursor(){
    cursorLayer.fill(255, 0, 0);
    cursorLayer.noStroke();
    cursorLayer.triangle(-10,-15,10,-15, 0, 15);
}


function entrance(){
    styleOutsideFloor();
    fl.rect(-1.5 * gridSize, -2.5 * gridSize, 2 * gridSize, 2 * gridSize);
    styleFloor();
    fl.rect(-1.5 * gridSize, -0.5 * gridSize, 2 * gridSize, 2 * gridSize);
    styleWall();
    fxt.rect(-1.5 * gridSize-5, -0.5 * gridSize-10, 10, 20);
    fxt.rect(0.5 * gridSize-5, -0.5 * gridSize-10, 10, 20);
    styleDoor();
    fxt.rect(0.5 * gridSize-10, -0.5 * gridSize, 5, -95);
    styleFineLine();
    fxt.arc(0.5 * gridSize-10, -0.5 * gridSize, 190, 190, PI, HALF_PI * 3);
}

function turnLeft(){
    cursorLayer.clear();
    cursorLayer.rotate(-PI/2);
    fl.rotate(-PI/2);
    fxt.rotate(-PI/2);
    styleFloor();
    fl.rect(-1.5 * gridSize, -1.5 * gridSize, 2 * gridSize, gridSize);
    livingRoomCursor();
}

function turnRight(){
    cursorLayer.clear();
    cursorLayer.rotate(PI/2);
    fl.rotate(PI/2);
    fxt.rotate(PI/2);
    livingRoomCursor();
}

function forward(){
    cursorLayer.clear();
    cursorLayer.translate(0, gridSize);
    fxt.translate(0, gridSize);
    fl.translate(0, gridSize);
    styleFloor();
    fl.rect(-1.5 * gridSize, -0.5 * gridSize, 2 * gridSize,  gridSize);
    livingRoomCursor();
    clickedButtons.push("forward");
    console.log(clickedButtons);
}

function backToUpperLevel(){
    
}

function bedroomDoor(){
   
    styleWoodFloor();
    fl.rect(-1.5 * gridSize, 0.5 * gridSize, 2 * gridSize, 2 * gridSize);
    styleWall();
    fxt.rect(-1.5 * gridSize - 5, 0.5 * gridSize-10, 10, 20);
    fxt.rect(0.5 * gridSize-5, 0.5 * gridSize-10, 10, 20);
    styleDoor();
    fxt.rect(0.5 * gridSize-10, 0.5 * gridSize, 5, 95);
    styleFineLine();
    fxt.arc(0.5 * gridSize-10, 0.5 * gridSize, 190, 190, HALF_PI, PI);
}

function wardrobe(){
    styleDoor();
    fxt.rect(-0.5 * gridSize, 0.5 * gridSize - 5 , 55, 50);
    styleFineLine();
    fxt.rect(-0.5 * gridSize + 3, 0.5 * gridSize - 5  , 49, 47);
    fxt.line(-0.5 * gridSize + 3, 0.5 * gridSize - 5 + 47/2, -0.5 * gridSize + 3 + 49, 0.5 * gridSize - 5 + 47/2);

}

function styleSetups(){
    gridSize = 55;
    floorColor = color(255, 255, 255);
    woodFloorColor = color(200, 160, 120);
    outsideFloorColor = color(200, 200, 200);
    wallColor = color(100, 100, 100);
    doorFillColor = color(200, 160, 120);
    middleLineColor = color(0, 0, 0);
    middleLineStrokeWeight = 1;
    fineLineColor = color(0, 0, 0);
    fineLineStroke = 0.5;
}

styleOutsideFloor = function(){
    fl.noStroke();
    fl.fill(outsideFloorColor);
}

styleFloor = function(){
    fl.noStroke();
    fl.fill(floorColor);
}

styleWoodFloor = function(){
    fl.noStroke();
    fl.fill(woodFloorColor);
}

styleWall = function(){
    fxt.noStroke();
    fxt.fill(wallColor);
}

styleDoor = function(){
    fxt.noStroke();
    fxt.fill(doorFillColor);
    fxt.stroke(middleLineColor);
    fxt.strokeWeight(middleLineStrokeWeight);
}

styleFineLine = function(){
    fxt.noFill();
    fxt.stroke(fineLineColor);
    fxt.strokeWeight(fineLineStroke);
}

styleMiddleLine = function(){
    fxt.stroke(middleLineColor);
    fxt.strokeWeight(middleLineStrokeWeight);
}