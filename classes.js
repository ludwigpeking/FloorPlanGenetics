const tiles = [];
const cursorLocation = {i: 20, j: 20};
const transforms = {x : 0, y : 0, rotate : 0};

class Tile {
    constructor(i, j){
        this.i = i;
        this.j = j;
        this.room = null;
        this.openSpace = true;
        this.occupiedBy = null;

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

//cursors
cursors = [
    'livingRoomCursor',
    'livingRoomBranchCursor',
    'kitchenCursor',
    'kitchenBranchCursor',
    'bedroomCursor',
    'bedroomBranchCursor',
    'bathroomCursor'
]

movements = [
    'entrance',
    'forward',
    'turnLeft',
    'turnRight',
    'backToUpperLevel',

    'bedroomDoor',
    'kitchenDoor',
    'bathroomDoor',

    'window',

    'wardrobe',

    'sittingSet',
    'diningSet',

    'bed',
    
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

