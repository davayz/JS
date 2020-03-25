const Room = require('./Room');
const Tile = require('./Tile');


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


class WorldGenerator
{
    constructor(world)
    {
        this.world = world;
    }

    BuildRoom(room)
    {        
        for (var x = room.x1; x <= room.x2; x++)
        {
            for (var y = room.y1; y <= room.y2; y++)
            {
                var tile;

                if (x==room.x1 || x==room.x2 || y==room.y1 || y==room.y2)
                {
                    var tile = new Tile(x, y, "wall");
                    tile.walkable = false;
                    //eventBus.publish("OnTileRender", tile);
                }
                else
                {
                    var tile = new Tile(x, y, "floor");
                    tile.walkable = true;
                    //eventBus.publish("OnTileRender", tile);
                }
                
                if (x == room.x1)
                {
                    tile.info = "LeftCorner";
                }
                if (x == room.x2)
                {
                    tile.info = "RightCorner";
                }
                if (y == room.y1)
                {
                    tile.info = "TopCorner";
                    if (x == room.x1) tile.info == "Top/Left Corner";
                    if (x == room.x2) tile.info = "Top/Right Corner";
                }
                if (y == room.y2)
                {
                    tile.info = "BottomCorner";
                    if (x == room.x1) tile.info == "Bottom/Left Corner";
                    if (x == room.x2) tile.info = "Bottom/Right Corner";
                }                     
                
                this.world.setTile(tile);                
            }
        }

        this.world.roomList.push(room);
    }

    GenerateCorridors() 
    {
        var roomList = this.world.roomList;
        
        for (var i = 1; i < roomList.length; i++) 
        {
            var previousRoomCenterX = roomList[i - 1].center.x;
            var previousRoomCenterY = roomList[i - 1].center.y;
            var currentRoomCenterX = roomList[i].center.x;
            var currentRoomCenterY = roomList[i].center.y;


            if (Math.random() > 0.5) {
                this.BuildHcorr(previousRoomCenterX, currentRoomCenterX, previousRoomCenterY);
                this.BuildVcorr(previousRoomCenterY, currentRoomCenterY, currentRoomCenterX);
            }
            else {

                this.BuildVcorr(previousRoomCenterY, currentRoomCenterY, previousRoomCenterX);
                this.BuildHcorr(previousRoomCenterX, currentRoomCenterX, currentRoomCenterY);
            }
        }
    }
    
    GenerateP()
    {
        ctx.font = "16px Times New Roman";
        var position = this.world.getRoom(0).randomPosition();
        
        return new Pl(position, "P");
    }

    GeneratePE()
    {
        var entity = new Entity("PE");

        var position = this.world.getRoom(0).randomPosition();
        var pos = new Position(position.x, position.y);
        entity.addComponent(new Position(position.x, position.y));
        entity.addComponent(new Health());
        entity.addComponent(new Sprite("@","yellow"));
        entity.addComponent(new AP(3,3));
        entity.addComponent(new Type("P"));
        entity.addComponent(new Stats(0.5));
        entity.addComponent(new Visible(true));
        entity.addComponent(new FoV());
        entity.addComponent(new Controller());
        entity.addComponent(new EntitiesInFoV([]));
        entity.addComponent(new Turn());
        

        return entity;
    }

    GenerateE()
    {
        var roomIndex = GetRandomInt(1, this.world.roomList.length);

        var position = this.world.getRoom(roomIndex).randomPosition();

        var entity = new Entity("enemy");
        entity.addComponent(new Position(position.x, position.y));
        entity.addComponent(new Health());

        var rnd = GetRandomInt(0,3);
        var eSprites = [];
        eSprites.push("R");
        eSprites.push("G");
        eSprites.push("T");
        var sprite = eSprites[rnd];
        var rnd = GetRandomInt(0,2);
        var colors = [];
        colors.push("red");
        colors.push("green");
        colors.push("blue");
        var color = colors[rnd];

        entity.addComponent(new Sprite(sprite,color));
        entity.addComponent(new AP(3,3));
        entity.addComponent(new AIController());
        entity.addComponent(new Type("E"));
        entity.addComponent(new Visible(false));        
        entity.addComponent(new Stats(1,10,3));      
        
        if (GetRandomInt(0,100)>=70)
        {
            entity.addComponent(new Walker());        
        }

        return entity;
    }

    GenerateExit()
    {
        var room = this.world.roomList[GetRandomInt(1, this.world.roomList.length)];

        var pos = room.randomPosition();

        var tile = new Tile(pos.x, pos.y, "exit");
        tile.walkable = true;


        this.world.setTile(tile);
    }
    

    BuildHcorr(xStart, xEnd, yPos)
    {
        var x1 = Math.min(xStart,xEnd);
        var x2 = Math.max(xStart, xEnd);


        for (var x = x1; x <= x2; x++)
        {
            if (x < x2)
            {
                var tile = this.world.getTileAt(x+1,yPos);

                if (tile.info == "TopCorner" || tile.info == "Top/Left Corner" || tile.info == "Top/Right Corner")
                {
                    yPos--;

                    x--;
                }

                if (tile.info == "BottomCorner" || tile.info == "Bottom/Right Corner" || tile.info == "Bottom/Left Corner")
                {
                    yPos++;

                    x--;
                }
            }

            var tile = this.world.getTileAt(x,yPos);
            

            if (tile.tileType == "wall")
            {
                var tile = new Tile(x, yPos, "door", "%"); tile.walkable = true;

                this.world.setTile(tile);
                //eventBus.publish("OnTileRenderAnimated", tile);
            }
            

            if (tile.tileType == "empty")
            {
                var tile = new Tile(x, yPos, "floor", "corridor"); tile.walkable = true;

                this.world.setTile(tile);

                //eventBus.publish("OnTileRenderAnimated", tile);
            }


        }
    }

    BuildVcorr(yStart, yEnd, xPos)
    {
        var y1 = Math.min(yStart,yEnd);
        var y2 = Math.max(yStart, yEnd);

        var cornerY = y1;

        for (var y = y1; y <= y2; y++)
        {
            if (y < y2)
            {
                var tile = this.world.getTileAt(xPos,y+1);

                if (tile.info == "RightCorner" || tile.info == "Bottom/Right Corner" || tile.info == "Top/Right Corner")
                {
                    xPos++;

                    y--;
                }

                if (tile.info == "LeftCorner" || tile.info == "Bottom/Left Corner" || tile.info == "Top/Left Corner")
                {
                    xPos--;

                    y--;
                }
            }

            var tile = this.world.getTileAt(xPos,y);

            if (tile.tileType == "wall")
            {
                var tile = new Tile(xPos, y, "door", "%");
                tile.walkable = true;
                this.world.setTile(tile);

                /*if (this.showGeneration)
                    eventBus.publish("OnTileRenderAnimated", tile);*/
            }

            if (tile.tileType == "empty")
            {
                var tile = new Tile(xPos, y, "floor","corridor"); tile.walkable = true;
                this.world.setTile(tile);
                
                //eventBus.publish("OnTileRenderAnimated", tile);
            }                 

        }
    }


    ValidateRoomOverlap(room)
    {
        var bool = true;

        if (this.world.roomList.length == 0)
        {
            return true;
        }
        this.world.roomList.forEach(function(r){
            if (doOverlap(room, r)){
                bool = false;
            }    
        });

        return bool;
    }

    CalculateRoom()
    {
        var x1, x2, y1, y2;

        x1 = GetRandomInt(1, this.world.width-1);
        y1 = GetRandomInt(1, this.world.height-1);

        x2 = GetRandomInt(x1, this.world.width-1);
        y2 = GetRandomInt(y1, this.world.height-1);

        return ((x2-x1)>1 && (y2-y1)>1) && ((x2-x1)<this.world.width/3 && (y2-y1)<this.world.height/3) ? new Room(x1, y1, x2, y2) : this.CalculateRoom();
    }
}

module.exports = WorldGenerator;