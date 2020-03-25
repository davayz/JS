function GetWorldFromCanvas(canvas, tileSize)
{
    return new World(Math.floor(canvas.width/tileSize), Math.floor(canvas.height/tileSize));
}

function GetRandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min)) + min;
    
}

function doOverlap(rect1, rect2)
{ 
    if (rect1.x1 > rect2.x2+1 || rect2.x1 > rect1.x2+1) 
        return false; 

    if (rect1.y1 > rect2.y2+1 || rect2.y1 > rect1.y2+1) 
        return false; 

    return true; 
}

exports.GetRandomInt = GetRandomInt;

