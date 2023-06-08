movements = [
    'entrance',
    'forward',
    'turnLeft',
    'turnRight',
    'backToUpperLevel',

    'bedroomDoor',
    'secondBedroomDoor',
    'kitchenDoor',
    'bathroomDoor',

    'roomWindow',

    'wardrobe',

    'sittingSet',
    'diningSet',

    'doubleBed',
    'singleBed',
    
    'toilet',
    'lavatory',
    'shower',
    'bath',
    'washingMachine',
    'shaft',

    'counter',
    'fridge',
    'stove',
    'sink',
]

function entrance(){
    loadTransforms (); 
    //draw elements
    styleOutsideFloor();
    fl.rect(-2.5 * gridSize, -1.5 * gridSize, 2 * gridSize, 2 * gridSize);
    styleFloor();
    fl.rect(-0.5 * gridSize, -1.5 * gridSize,  gridSize, 2 * gridSize);
    styleWall();
    fxt.rect(-0.5 * gridSize - 10, -1.5 * gridSize-5, 20, 10);
    fxt.rect(-0.5 * gridSize - 10, 0.5 * gridSize-5, 20, 10);
    styleDoor();
    fxt.rect( - 0.5 * gridSize, -1.5 * gridSize + 5, -95, 5);
    styleFineLine();
    fxt.arc(- 0.5 * gridSize, -1.5 * gridSize + 10, 190, 190, PI/2, PI);
    //register tiles
    //backside outsideTiles
    let current_tile = tiles[cursorStatus.i][cursorStatus.j];
    let back_side_tile = backTile(current_tile);
    let back_side_tile2 = backTile(backTile(current_tile));
    let back_left_tile = backTile(leftTile(current_tile));
    let back_left_tile2 = backTile(backTile(leftTile(current_tile)));
    setTileProperties(back_side_tile, 'outside', false, true);
    setTileProperties(back_side_tile2, 'outside', false, true);
    setTileProperties(back_left_tile, 'outside', false, true);
    setTileProperties(back_left_tile2, 'outside', false, true);
    //current_tile
    
    setTileProperties(current_tile, 'livingRoom', true, true);
    console.log('current tile: ', current_tile);
    //the left tile
    let left_tile = leftTile(current_tile);
    setTileProperties(left_tile, 'livingRoom', true, true);
    livingRoomCursor()
    resetTransforms();
    
}


function forward(){
    let current_tile = tiles[cursorStatus.i][cursorStatus.j];
    let front_tile = frontTile(current_tile);
    let front_left_tile =  frontTile(leftTile(current_tile));
    let left_tile = leftTile(current_tile);

    if(cursorStatus.chain[cursorStatus.chain.length-1] == 'livingRoomCursor'){
        //check front and front left tile status, if they are open and in same room, or undefined, move forward
        if((front_tile.defined == false || (front_tile.openSpace == true && front_tile.room == 'livingRoom')) && (front_left_tile.defined == false || (front_left_tile.openSpace == true && front_left_tile.room == 'livingRoom'))){
            transforms.x += gridSize * Math.cos(transforms.rotate);
            transforms.y += gridSize * Math.sin(transforms.rotate);
            loadTransforms ();
            cursorStatus.i += Math.cos(transforms.rotate);
            cursorStatus.j += Math.sin(transforms.rotate);
            current_tile = tiles[cursorStatus.i][cursorStatus.j];
            left_tile = leftTile(current_tile);
            //register tiles
            setTileProperties(current_tile, 'livingRoom', true, true);
            setTileProperties(left_tile, 'livingRoom', true, true);
            console.log('current tile: ', current_tile);
            //draw the floor
            styleFloor();
            fl.rect(-0.5 * gridSize, -1.5 * gridSize,  gridSize, 2* gridSize);
            livingRoomCursor();
            clickedButtons.push("forward");
            console.log(clickedButtons);
            resetTransforms();
        } else {
            console.log('there is a wall in front of you');
        }
    } else if (cursorStatus.chain[cursorStatus.chain.length-1] == 'bedroomCursor'){
        //check front tile status, if it is open, or undefined, move forward
        if(front_tile.defined == false || (front_tile.openSpace == true && front_tile.room == 'bedroom')){
            transforms.x += gridSize * Math.cos(transforms.rotate);
            transforms.y += gridSize * Math.sin(transforms.rotate);
            loadTransforms ();
            cursorStatus.i += Math.cos(transforms.rotate);
            cursorStatus.j += Math.sin(transforms.rotate);
            current_tile = tiles[cursorStatus.i][cursorStatus.j];
            //register tiles
            setTileProperties(current_tile, 'bedroom', true, true);
            console.log('current tile: ', current_tile);
            //draw the floor
            styleWoodFloor();
            fl.rect(-0.5 * gridSize, -0.5 * gridSize,  gridSize, gridSize);
            bedroomCursor();
            clickedButtons.push("forward");
            console.log(clickedButtons);
            resetTransforms();
        } else {
            console.log('there is a wall in front of you');
        }

    
    }
    updateCursorStatus();
}

function turnLeft(){
    let current_tile = tiles[cursorStatus.i][cursorStatus.j];
    let back_side_tile = backTile(current_tile);
    let back_left_tile = backTile(leftTile(current_tile));
    let left_tile = leftTile(current_tile);
    if(cursorStatus.chain[cursorStatus.chain.length-1]  == 'livingRoomCursor'){
        //check left tile, back left tile and back side tile status, if they are open, or undefined, move forward
        if((left_tile.defined == false || (left_tile.openSpace == true && left_tile.room =='livingRoom') ) && (back_left_tile.defined == false || (back_left_tile.openSpace == true && back_left_tile.room == 'livingRoom')) && (back_side_tile.defined == false || (back_side_tile.openSpace == true && back_side_tile.room == 'livingRoom'))){
            transforms.rotate -= PI/2;
            cursorStatus.rotate -= PI/2;
            //register tiles: back side tile, back left tile, left tile
            setTileProperties(back_side_tile, 'livingRoom', true, true);
            setTileProperties(back_left_tile, 'livingRoom', true, true);
            setTileProperties(left_tile, 'livingRoom', true, true);
            //draw the floor
            loadTransforms ();
            styleFloor();
            fl.rect(-0.5 * gridSize, -1.5 * gridSize,  2 * gridSize, 2* gridSize);
            livingRoomCursor();
            clickedButtons.push("turnLeft");
            console.log(clickedButtons);
            resetTransforms();
        } else {
            console.log('out enough space to turn left');
        }
    } else if (cursorStatus.chain[cursorStatus.chain.length-1] == 'bedroomCursor'){
        transforms.rotate -= PI/2;
        loadTransforms ();
        bedroomCursor();
        clickedButtons.push("turnLeft");
        console.log(clickedButtons);
        resetTransforms();
    }
    updateCursorStatus();
}

function turnRight(){
    let current_tile = tiles[cursorStatus.i][cursorStatus.j];
    let front_tile = frontTile(current_tile);
    let front_left_tile =  frontTile(leftTile(current_tile));
    let left_tile = leftTile(current_tile);
    if(cursorStatus.chain[cursorStatus.chain.length-1] == 'livingRoomCursor'){
        //check front, front left tile and left tile status, if they are open and in same room, or undefined, move forward
        if((front_tile.defined == false || (front_tile.openSpace == true && front_tile.room == 'livingRoom')) && (front_left_tile.defined == false || (front_left_tile.openSpace == true && front_left_tile.room == 'livingRoom')) && (left_tile.defined == false || (left_tile.openSpace == true && left_tile.room == 'livingRoom'))){
            transforms.rotate += PI/2;
            cursorStatus.rotate += PI/2;
            //register tiles
            setTileProperties(front_tile, 'livingRoom', true, true);
            setTileProperties(front_left_tile, 'livingRoom', true, true);
            //draw the floor
            loadTransforms ();
            styleFloor();
            fl.rect(-1.5 * gridSize, -1.5 * gridSize, 2* gridSize, 2* gridSize);
            livingRoomCursor();
            clickedButtons.push("turnRight");
            console.log(clickedButtons);
            resetTransforms();
        } else {
            console.log('out enough space to turn right');
        }
    } else if (cursorStatus.chain[cursorStatus.chain.length-1] == 'bedroomCursor'){
        transforms.rotate += PI/2;
        loadTransforms ();
        bedroomCursor();
        clickedButtons.push("turnRight");
        console.log(clickedButtons);
        resetTransforms();
    }
    updateCursorStatus();
}

function backToUpperLevel(){
    //pop the cursor status chain
    cursorStatus.chain.pop();
    cursorStatus.cursorLocationChain.pop();

    cursorStatus.i = cursorStatus.cursorLocationChain[cursorStatus.cursorLocationChain.length-1].i;
    cursorStatus.j = cursorStatus.cursorLocationChain[cursorStatus.cursorLocationChain.length-1].j;
    cursorStatus.rotate = cursorStatus.cursorLocationChain[cursorStatus.cursorLocationChain.length-1].rotate;
    cursorStatus.current = cursorStatus.chain[cursorStatus.chain.length-1];
    clickedButtons.push("backToUpperLevel");
    console.log(clickedButtons);
    updateTransforms();
}
function checkDoorOpenTiles(){
    let current_tile = tiles[cursorStatus.i][cursorStatus.j];
    let front_tile = frontTile(current_tile);
    let front_left_tile =  frontTile(leftTile(current_tile));
    let front2_tile = frontTile(front_tile);
    let front_left2_tile =  frontTile(leftTile(front_tile));
    //check the four tiles in front of the cursor, if they are undefined, create a door
    if(front_tile.defined == false  && front_left_tile.defined == false  && front2_tile.defined == false  && front_left2_tile.defined == false ){
        return true;
    } else {
        return false;
    }
}

function kitchenDoor(){
    if(checkDoorOpenTiles()){
        //move forward
        cursorStatus.i += Math.round(Math.cos(cursorStatus.rotate));
        cursorStatus.j += Math.round(Math.sin(cursorStatus.rotate));
        updateTransforms();
        loadTransforms ();
        let current_tile = tiles[cursorStatus.i][cursorStatus.j];
        let front_tile = frontTile(current_tile);
        let front_left_tile =  frontTile(leftTile(current_tile));
        let left_tile = leftTile(current_tile);
        //register tiles:
        setTileProperties(current_tile, 'kitchen', true, true);
        setTileProperties(front_tile, 'kitchen', true, true);
        setTileProperties(front_left_tile, 'kitchen', true, true);
        setTileProperties(left_tile, 'kitchen', true, true);
        //cursor chain push kitchenCursor
        cursorStatus.current = 'kitchenCursor';
        cursorStatus.chain.push('kitchenCursor');
        cursorStatus.cursorLocationChain.push({i: cursorStatus.i, j: cursorStatus.j, rotate: cursorStatus.rotate});
        //draw elements
        styleTileFloor();
        fl.rect(-0.5 * gridSize, -1.5 * gridSize, 2 * gridSize, 2 * gridSize);
        styleWall();
        fxt.rect(-0.5 * gridSize - 5, 0.5 * gridSize-5, 10, 10);
        fxt.rect(-0.5 * gridSize-5, -1.5 * gridSize-5, 10, 10);
        styleDoor();
        fxt.rect(-0.5 * gridSize, -1.5 * gridSize+5, 95, 5);
        styleFineLine();
        fxt.arc(-0.5 * gridSize, -1.5 * gridSize+10, 190, 190, 0, HALF_PI);
        //cursor
        kitchenCursor();
        clickedButtons.push("kitchenDoor");
        console.log(clickedButtons);
        resetTransforms();
    } else {
        console.log('out enough space to create a door');
    }
}

function bathroomDoor(){
    if(checkDoorOpenTiles()){
        //move forward
        cursorStatus.i += Math.round(Math.cos(cursorStatus.rotate));
        cursorStatus.j += Math.round(Math.sin(cursorStatus.rotate));
        updateTransforms();
        loadTransforms ();
        let current_tile = tiles[cursorStatus.i][cursorStatus.j];
        let front_tile = frontTile(current_tile);
        let front_left_tile =  frontTile(leftTile(current_tile));
        let left_tile = leftTile(current_tile);
        //register tiles:
        setTileProperties(current_tile, 'bathroom', true, true);
        setTileProperties(front_tile, 'bathroom', true, true);
        setTileProperties(front_left_tile, 'bathroom', true, true);
        setTileProperties(left_tile, 'bathroom', true, true);
        //cursor chain push kitchenCursor
        cursorStatus.current = 'bathroomCursor';
        cursorStatus.chain.push('bathroomCursor');
        cursorStatus.cursorLocationChain.push({i: cursorStatus.i, j: cursorStatus.j, rotate: cursorStatus.rotate});
        //draw elements
        styleTileFloor();
        fl.rect(-0.5 * gridSize, -1.5 * gridSize, 2 * gridSize, 2 * gridSize);
        styleWall();
        fxt.rect(-0.5 * gridSize - 5, 0.5 * gridSize-5, 10, 10);
        fxt.rect(-0.5 * gridSize-5, -1.5 * gridSize-5, 10, 10);
        styleDoor();
        fxt.rect(-0.5 * gridSize, -1.5 * gridSize+5, 95, 5);
        styleFineLine();
        fxt.arc(-0.5 * gridSize, -1.5 * gridSize+10, 190, 190, 0, HALF_PI);
        //cursor
        bathroomCursor();
        clickedButtons.push("bathroomDoor");
        console.log(clickedButtons);
        resetTransforms();
    } 
}

function secondBedroomDoor(){
    if(checkDoorOpenTiles()){
        //move forward
        cursorStatus.i += Math.round(Math.cos(cursorStatus.rotate));
        cursorStatus.j += Math.round(Math.sin(cursorStatus.rotate));
        updateTransforms();
        loadTransforms ();
        let current_tile = tiles[cursorStatus.i][cursorStatus.j];
        let front_tile = frontTile(current_tile);
        let front_left_tile =  frontTile(leftTile(current_tile));
        let left_tile = leftTile(current_tile);
        //register tiles:
        setTileProperties(current_tile, 'secondBedroom', true, true);
        setTileProperties(front_tile, 'secondBedroom', true, true);
        setTileProperties(front_left_tile, 'secondBedroom', true, true);
        setTileProperties(left_tile, 'secondBedroom', true, true);
        //cursor chain push kitchenCursor
        cursorStatus.current = 'secondBedroomCursor';
        cursorStatus.chain.push('secondBedroomCursor');
        cursorStatus.cursorLocationChain.push({i: cursorStatus.i, j: cursorStatus.j, rotate: cursorStatus.rotate});
        //draw elements
        styleTileFloor();
        fl.rect(-0.5 * gridSize, -1.5 * gridSize, 2 * gridSize, 2 * gridSize);
        styleWall();
        fxt.rect(-0.5 * gridSize - 5, 0.5 * gridSize-5, 10, 10);
        fxt.rect(-0.5 * gridSize-5, -1.5 * gridSize-5, 10, 10);
        styleDoor();
        fxt.rect(-0.5 * gridSize, -1.5 * gridSize+5, 95, 5);
        styleFineLine();
        fxt.arc(-0.5 * gridSize, -1.5 * gridSize+10, 190, 190, 0, HALF_PI);
        //cursor
        secondBedroomCursor();
        clickedButtons.push("secondBedroomDoor");
        console.log(clickedButtons);
        resetTransforms();
    }
}

function bedroomDoor(){
    let current_tile = tiles[cursorStatus.i][cursorStatus.j];
    let front_tile = frontTile(current_tile);
    let front_left_tile =  frontTile(leftTile(current_tile));
    let front2_tile = frontTile(front_tile);
    let front_left2_tile =  frontTile(leftTile(front_tile));
    //check the four tiles in front of the cursor, if they are undefined, create a door
    if(front_tile.defined == false  && front_left_tile.defined == false  && front2_tile.defined == false  && front_left2_tile.defined == false ){
        //move forward
        transforms.x += gridSize * Math.cos(transforms.rotate);
        transforms.y += gridSize * Math.sin(transforms.rotate);
        loadTransforms ();
        cursorStatus.i += Math.cos(transforms.rotate);
        cursorStatus.j += Math.sin(transforms.rotate);
        current_tile = tiles[cursorStatus.i][cursorStatus.j];
        left_tile = leftTile(current_tile);
        front_left_tile = frontTile(left_tile);
        front_tile = frontTile(current_tile);
        //register tiles
        setTileProperties(current_tile, 'bedroom', true, true);
        setTileProperties(left_tile, 'bedroom', true, true);
        setTileProperties(front_left_tile, 'bedroom', true, true);
        setTileProperties(front_tile, 'bedroom', true, true);
        //cursor chain push 'bedroomCursor'
        cursorStatus.current = 'bedroomCursor';
        cursorStatus.chain.push('bedroomCursor');
        cursorStatus.cursorLocationChain.push({i: cursorStatus.i, j: cursorStatus.j, rotate: cursorStatus.rotate});
        //draw elements
        styleWoodFloor();
        fl.rect(-0.5 * gridSize, -1.5 * gridSize, 2 * gridSize, 2 * gridSize);
        styleWall();
        fxt.rect(-0.5 * gridSize - 5, 0.5 * gridSize-5, 10, 10);
        fxt.rect(-0.5 * gridSize-5, -1.5 * gridSize-5, 10, 10);
        styleDoor();
        fxt.rect(-0.5 * gridSize, -1.5 * gridSize+5, 95, 5);
        styleFineLine();
        fxt.arc(-0.5 * gridSize, -1.5 * gridSize+10, 190, 190, 0, HALF_PI);
        //cursor
        bedroomCursor();
        clickedButtons.push("bedroomDoor");
        //reset transforms
        resetTransforms();
    }else{
        console.log('not valid to create a door');
    }
}

function branch (){
    if(cursorStatus.current !== 'branch'){
        let current_tile = tiles[cursorStatus.i][cursorStatus.j];
        cursorStatus.current = 'branch';
        cursorStatus.chain.push('branch');
        cursorStatus.cursorLocationChain.push({i: cursorStatus.i, j: cursorStatus.j, rotate: cursorStatus.rotate});
        loadTransforms ();
        branchCursor();
        clickedButtons.push("branch");
        console.log(clickedButtons);
        resetTransforms();
    } else {
        console.log('you are already in a branch');
    }
}
    
function wardrobe(){
    let current_tile = tiles[cursorStatus.i][cursorStatus.j];
    let front_tile = frontTile(current_tile);
    //check the front tile, if it is undefined, create a wardrobe
    if(front_tile.defined == false){
        loadTransforms ();
        //register tiles
        setTileProperties(front_tile, 'bedroom', false, true);
        //draw elements
        styleDoor();
        fxt.rect(0.5 * gridSize, -0.5 * gridSize  , 50, 55);
        styleFineLine();
        fxt.rect(0.5 * gridSize, -0.5 * gridSize +3  , 47, 49);
        fxt.line(gridSize-5, -0.5 * gridSize +3, gridSize-5, 0.5 * gridSize -3);
        clickedButtons.push("wardrobe");
        //reset transforms
        resetTransforms();
    } else {
        console.log('not valid to create a wardrobe');
    }
}

function doubleBed(){
    let current_tile = tiles[cursorStatus.i][cursorStatus.j];
    let front_tile = frontTile(current_tile);
    let left_tile = leftTile(current_tile);
    let bedSolidTiles = [front_tile, frontTile(front_tile), frontTile(frontTile(front_tile)), 
        rightTile(front_tile), frontTile(rightTile(front_tile)), frontTile(frontTile(rightTile(front_tile))),
        rightTile(rightTile(front_tile)), frontTile(rightTile(rightTile(front_tile))), frontTile(frontTile(rightTile(rightTile(front_tile)))),
        rightTile(rightTile(rightTile(front_tile))), frontTile(rightTile(rightTile(rightTile(front_tile)))), frontTile(frontTile(rightTile(rightTile(rightTile(front_tile)))))];
    let bedAccessTiles = [left_tile, rightTile(current_tile), rightTile(rightTile(current_tile)),
        frontTile(left_tile), frontTile(frontTile(left_tile)), frontTile(frontTile(frontTile(left_tile))),frontTile(frontTile(frontTile(frontTile(left_tile)))),rightTile(frontTile(frontTile(frontTile(frontTile(left_tile))))), rightTile(rightTile(frontTile(frontTile(frontTile(frontTile(left_tile)))))),rightTile(rightTile(rightTile(frontTile(frontTile(frontTile(frontTile(left_tile)))))))];
    //check bedSolidTiles, if they are undefined, and bedAccessTiles are open or undefined and room is bedroom, create a bed
    if(bedSolidTiles.every(tile => tile.defined == false) && bedAccessTiles.every(tile => tile.defined == false || (tile.openSpace == true && (tile.room == 'bedroom' || tile.room ==null)))){
        loadTransforms ();
        //register tiles
        bedSolidTiles.forEach(tile => setTileProperties(tile, 'bedroom', false, true));
        bedAccessTiles.forEach(tile => setTileProperties(tile, 'bedroom', true, true));
        //draw elements
        styleWoodFloor();
        fl.rect(-0.5 * gridSize, -1.5 * gridSize, 5 * gridSize, 4 * gridSize);
        styleBed();
        fxt.rect(0.5 * gridSize, -0.5 * gridSize, 3 * gridSize, 4 * gridSize);
        styleFineLine();
        fxt.rect(0.5 * gridSize, -0.5 * gridSize, 3 * gridSize, 4 * gridSize);
        //reset transforms
        resetTransforms();
    } else {
        console.log('not valid to create a bed');

    }
}

function roomWindow(){
    let current_tile = tiles[cursorStatus.i][cursorStatus.j];
    //check the front tile, front left and front right tiles, if they are undefined, create a window
    if(frontTile(current_tile).defined == false && leftTile(frontTile(current_tile)).defined == false && rightTile(frontTile(current_tile)).defined == false){
        loadTransforms ();
        //register tiles
        setTileProperties(frontTile(current_tile), 'outdoor', false, true);
        setTileProperties(leftTile(frontTile(current_tile)), 'outdoor', false, true);
        setTileProperties(rightTile(frontTile(current_tile)), 'outdoor', false, true);
        //draw elements
        styleWindowsill();
        fxt.rect(0.5 * gridSize -10 , -0.5 * gridSize, 30, gridSize);

        styleWindow();
        fxt.rect(0.5 * gridSize +10 , -0.5 * gridSize, 5 ,gridSize);
        styleFineLine();
        fxt.line(0.5 * gridSize +10, -0.5 * gridSize, 0.5 * gridSize +10, 0.5* gridSize);
        fxt.line(0.5 * gridSize +15, -0.5 * gridSize, 0.5 * gridSize +15, 0.5* gridSize);
        styleMiddleLine();
        fxt.line(0.5 * gridSize -10, -0.5 * gridSize, 0.5 * gridSize -10, 0.5* gridSize);
        fxt.line(0.5 * gridSize +20, -0.5 * gridSize, 0.5 * gridSize +20, 0.5* gridSize);
        //reset transforms
        resetTransforms();
    }
}

function loadTransforms (){
    push();
    translate(transforms.x, transforms.y);
    rotate(transforms.rotate);
  
    fl.push();
    fl.translate (transforms.x, transforms.y);
    fl.rotate(transforms.rotate)

    fxt.push();
    fxt.translate (transforms.x, transforms.y);
    fxt.rotate(transforms.rotate)

    cs.push();
    cs.translate (transforms.x, transforms.y);
    cs.rotate(transforms.rotate)
}

function resetTransforms (){
    pop();
    fl.pop();
    fxt.pop();
    cs.pop();
}