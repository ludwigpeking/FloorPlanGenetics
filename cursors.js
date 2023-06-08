cursors = [
    'livingRoomCursor',
    'livingRoomBranchCursor',
    'kitchenCursor',
    'kitchenBranchCursor',
    'bedroomCursor',
    'bedroomBranchCursor',
    'secondBedroomCursor',
    'secondBedroomBranchCursor',
    'bathroomCursor'
]
cursorStatus ={
    current: 'livingRoomCursor',
    chain: ['livingRoomCursor'],
    cursorLocationChain:[{i: 20, j: 20, rotate: 0}],
    i: 20,
    j: 20,
    rotate: 0,
}

//update transforms per cursor status
function updateTransforms(){
    transforms.x = width/2 + (cursorStatus.i - 20) * gridSize;
    transforms.y = height/2 + (cursorStatus.j - 20) * gridSize;
    transforms.rotate = cursorStatus.rotate;
}

function updateCursorStatus(){
    cursorStatus.cursorLocationChain[cursorStatus.cursorLocationChain.length-1] = {i: cursorStatus.i, j: cursorStatus.j, rotate: cursorStatus.rotate};
}

function livingRoomCursor(){
    
    cursorStatus.current = 'livingRoomCursor';
    cs.fill(255, 0, 0);
    cs.noStroke();
    cs.triangle(-15,-10, -15, 10, 15, 0);
}

function bedroomCursor(){
    
    cursorStatus.current = 'bedroomCursor';
    cs.fill(255, 0, 0);
    cs.noStroke();
    cs.triangle(-10,-5, -10, 5, 10, 0);
}

function secondBedroomCursor(){

    cursorStatus.current = 'secondBedroomCursor';
    cs.fill(255, 0, 0);
    cs.noStroke();
    cs.triangle(-10,-5, -10, 5, 10, 0);
}

function kitchenCursor(){
    cursorStatus.current = 'kitchenCursor';
    cs.fill(255, 0, 0);
    cs.noStroke();
    cs.triangle(-10,-5, -10, 5, 10, 0);
}

function bathroomCursor(){
    cursorStatus.current = 'bathroomCursor';
    cs.fill(255, 0, 0);
    cs.noStroke();
    cs.triangle(-10,-5, -10, 5, 10, 0);
}

function livingRoomBranchCursor(){
    currentCursor = 'livingRoomBranchCursor';
    cs.fill(255, 0, 0);
    cs.noStroke();
    cs.triangle(-15,-10, -15, 10, 15, 0);
}