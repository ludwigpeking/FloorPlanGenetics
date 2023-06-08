function setup() {
    createTiles();
    //create layers:
    //fl = floor layer
    //fxt = fixtures layer
    //cs = cursor layer
    createCanvas(windowWidth, windowHeight);
    fl = createGraphics(windowWidth, windowHeight);
    fxt = createGraphics(windowWidth, windowHeight);
    cs =  createGraphics(windowWidth, windowHeight);
    createButtons();
    styleSetups();
    initTransforms();
    
    entrance();
    drawTiles();
}
function draw() {
    background(60);
    image(fl, 0, 0);
    image(fxt, 0, 0);
    image(cs, 0, 0);
    drawTiles();
}

function initTransforms(){
    transforms.x = width/2;
    transforms.y = height/2;
    transforms.rotate = 0;
}



function styleSetups(){
    gridSize = 55;
    floorColor = color(255, 255, 255);
    windowColor = color(180, 230, 255);
    windowsillColor = color(200, 200, 200);
    woodFloorColor = color(220, 200, 180);
    tileFloorColor = color(200, 210, 230);
    outsideFloorColor = color(200, 200, 200);
    wallColor = color(100, 100, 100);
    doorFillColor = color(200, 160, 120);
    middleLineColor = color(0, 0, 0);
    middleLineStrokeWeight = 1;
    fineLineColor = color(0, 0, 0);
    fineLineStroke = 0.5;
    bedColor = color(255, 255, 230);
}

const styleOutsideFloor = function(){
    fl.noStroke();
    fl.fill(outsideFloorColor);
}

const styleFloor = function(){
    fl.noStroke();
    fl.fill(floorColor);
}

const styleWoodFloor = function(){
    fl.noStroke();
    fl.fill(woodFloorColor);
}

const styleWall = function(){
    fxt.noStroke();
    fxt.fill(wallColor);
}

const styleDoor = function(){
    fxt.noStroke();
    fxt.fill(doorFillColor);
    fxt.stroke(middleLineColor);
    fxt.strokeWeight(middleLineStrokeWeight);
}

const styleFineLine = function(){
    fxt.noFill();
    fxt.stroke(fineLineColor);
    fxt.strokeWeight(fineLineStroke);
}

const styleMiddleLine = function(){
    fxt.stroke(middleLineColor);
    fxt.strokeWeight(middleLineStrokeWeight);
}

const styleTileFloor = function(){
    fl.noStroke();
    fl.fill(tileFloorColor);
}

const styleBed = function(){
    fxt.noStroke();
    fxt.fill(bedColor);
}

const styleWindow = function(){
    fxt.noStroke();
    fxt.fill(windowColor);
}

const styleWindowsill = function(){
    fxt.noStroke();
    fxt.fill(windowsillColor);
}
