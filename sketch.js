var redball;   
var Position;   
var database;   
var redballPosition;

function setup() {   

    database = firebase.database();   

    createCanvas(400, 400);   
    redball = createSprite(250, 250, 30, 30);
    redball.shapeColor = "red";

    var redballPosition = database.ref('Ball/Position');
    redballPosition.on("value" , readPosition , showError);
    
}

function draw() {
    background("white");               

    if(Position !== undefined){

    if (keyDown(LEFT_ARROW)) {               
        writePosition(-1, 0);
    }
    else if (keyDown(RIGHT_ARROW)) {               
        writePosition(1, 0);
    }
    else if (keyDown(UP_ARROW)) {               
        writePosition(0, -1);               
    }
    else if (keyDown(DOWN_ARROW)) {               
        writePosition(0, +1);               
    }
    drawSprites();
}
}

function writePosition(x, y) {
    database.ref('Ball/Position').set(
{
    'x': Position.x + x,
    'y' : Position.y + y
}
    )
}

function readPosition(data){                 
    Position = data.val(); 
    redball.x= Position.x;                 
    redball.y = Position.y;                  
}                 

function showError(){
console.log("Error in writing to the database")
}