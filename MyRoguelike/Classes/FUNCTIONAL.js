function Gen()
{
    /*var renderSpeed = parseInt(document.getElementById("input1").value);
    var tileSize = parseInt(document.getElementById("input2").value);

    if (!isNaN(tileSize))
    {
        world = GetWorldFromCanvas(canvas, tileSize);
        worldGen = new WorldGenerator(world);
        renderer.tileSize = tileSize;
        ctx.font = tileSize+"px Times New Roman";
    }

    if (!isNaN(renderSpeed))
    {
        renderer.speed = renderSpeed;
    }   */

    
    
    var i = 1;
    //FUNCTIONAL STUFF TESTING
    //while (world.roomList.length <5)

    world = GetWorldFromCanvas(canvas, tileSize);
        worldGen = new WorldGenerator(world);
        renderer.tileSize = tileSize;
        ctx.font = tileSize+"px Times New Roman";

    while(i<25)
    {
        room = worldGen.CalculateRoom();
        if (worldGen.ValidateRoomOverlap(room))
        {
            worldGen.BuildRoom(room);
            //room.check(i);
            i++;
        }
    }       
}

function GenerateCorridors()
{
    var roomList = worldGen.world.roomList;



    for (var i=1; i<roomList.length; i++)
    {        
        var previousRoomCenterX = roomList[i-1].center.x;
        var previousRoomCenterY = roomList[i-1].center.y;
        var currentRoomCenterX = roomList[i].center.x;
        var currentRoomCenterY = roomList[i].center.y;


        if (Math.random()>0.5)
        {
            worldGen.BuildHcorr(previousRoomCenterX, currentRoomCenterX, previousRoomCenterY);
            worldGen.BuildVcorr(previousRoomCenterY, currentRoomCenterY, currentRoomCenterX);
        }
        else
        {

            worldGen.BuildVcorr(previousRoomCenterY, currentRoomCenterY, previousRoomCenterX);
            worldGen.BuildHcorr(previousRoomCenterX, currentRoomCenterX, currentRoomCenterY);
        }
    }    
}

function GenP()
{
    P = worldGen.GenerateP();
    AssignInput(P);
}

function GenerateEnemies(count)
{
    //var eNumber = GetRandomInt(10, world.roomList.length*5);
    var eNumber = GetRandomInt(5, 20);
    for (var i = 0; i<count; i++)
    {
        var entity = worldGen.GenerateE();   
    }
}

function ShowMap()
{
    if (showMapFlag == 1)
    {
        showMapFlag = 0;

        for (var t in world.tiles)
        {
            world.tiles[t].forEach(function (tile)
            {
                tile.Hide();
            });
        }   
    }

    if (showMapFlag == 0)
    {
        showMapFlag = 1;

        for (var t in world.tiles)
        {
            world.tiles[t].forEach(function (tile)
            {
                tile.Display();
            });
        }       
    }

}


function HideMap()
{
    for (var t in world.tiles)
    {
        world.tiles[t].forEach(function (tile)
        {
            if (tile.tileType != "empty")
            {
                tile.Hide();
                //DisplayFoV(P.position);
            }
        });
    }
    
    renderer.renderObj(P);
}

