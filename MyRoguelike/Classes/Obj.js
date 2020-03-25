class Obj
{
    constructor(position, type)
    {
        this.position = position;
        this.lastPos = new Vector(position.x, position.y);
        this.type = type;


        world.tiles[this.position.x][this.position.y].occupied = true;
        world.tiles[this.position.x][this.position.y].object = this;

        //eventBus.publish("OnObjRender", this);

    }

    act(x,y)
    {   

        var targetX = x+this.position.x;
        var targetY = y+this.position.y;

        var tile = world.tiles[targetX][targetY];

    /* if (tile.tileType == "door")
        {
            P.move(x,y);
        }*/

        if (!tile.occupied && tile.walkable)
        {
            console.log("movingTo "+x+" "+y);
            this.move(x,y);
        }
    }


    move(x,y)
    {
        this.lastPos = new Vector(this.position.x, this.position.y);

        this.position.x+=x;
        this.position.y+=y;

        world.tiles[this.lastPos.x][this.lastPos.y].occupied = false;
        world.tiles[this.lastPos.x][this.lastPos.y].object = undefined;

        world.tiles[this.position.x][this.position.y].occupied = true;
        world.tiles[this.position.x][this.position.y].object = this;

        //var tile = world.tiles[this.lastPos.x][this.lastPos.y];

        //eventBus.publish("OnPositionChanged", this);
        //eventBus.publish("OnTileRender", tile);

    }
}

class Pl extends Obj
{
    constructor(position,type)
    {
        super(position,type);

        eventBus.publish("OnObjRender", this);

        DisplayFoV(this.position);
    }

    interact(x,y)
    {
        
    }

    move(x,y)
    {
        this.lastPos = new Vector(this.position.x, this.position.y);
        var tile = world.tiles[this.lastPos.x][this.lastPos.y];
        

        this.position.x+=x;
        this.position.y+=y;

        world.tiles[this.lastPos.x][this.lastPos.y].occupied = false;
        world.tiles[this.lastPos.x][this.lastPos.y].object = undefined;

        world.tiles[this.position.x][this.position.y].occupied = true;
        world.tiles[this.position.x][this.position.y].object = this;

        eventBus.publish("OnPositionChanged", this);
        eventBus.publish("OnTileRender", tile);

        console.log(world.tiles[this.position.x][this.position.y]);


        DisplayFoV(this.position);

    }
}

class E extends Obj
{
    constructor(position,type,visibility)
    {
        super(position, type);

        this.visibility == 0;
    }

    onVisibilityChanged

    move(x,y)
    {
        this.lastPos = new Vector(this.position.x, this.position.y);
        var tile = world.tiles[this.lastPos.x][this.lastPos.y];

        this.position.x+=x;
        this.position.y+=y;

        world.tiles[this.lastPos.x][this.lastPos.y].occupied = false;
        world.tiles[this.lastPos.x][this.lastPos.y].object = undefined;

        world.tiles[this.position.x][this.position.y].occupied = true;
        world.tiles[this.position.x][this.position.y].object = this;

        
        if (this.visibility == 1)
        {
            eventBus.publish("OnPositionChanged", this);
            eventBus.publish("OnTileRender", tile);
        }
        //eventBus.publish("OnTileRender", tile);

    }
}
