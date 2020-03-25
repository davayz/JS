// main.mjs
const Tile = require('./Tile');
const Vector = require('./Vector');

class World
{
    constructor(width, height)
    {
        this.width = width;
        this.height = height;

        this.tiles = [];

        for (var x = 1; x<=this.width; x++)
        {
            this.tiles[x] = [];
            for (var y = 1; y<=this.height; y++)
            {
                var tile = new Tile(x,y,"empty");
                tile.walkable = false;
                tile.occupied = false;

                this.tiles[x][y] = tile;
            }
        }

        this.roomList = [];

        this.eList = [];
    }

    
    getAvailableDirection(entity)
    {
        //console.log(position);
        var position = entity.components.Position;

        var direction = new Vector();

        for (var x=-1; x<=1; x++)
        {
            for (var y = -1; y <= 1; y++)
            {
                var finalX = position.x+x;
                var finalY = position.y+y;
                var tile = this.getTileAt(finalX,finalY);
                if (!tile.occupied && tile.walkable)
                {
                    if (finalX == position.prevX && finalY == position.prevY)
                    {
                    }
                    else
                    {
                        //console.log(finalX+" "+finalY+" AVAILABLE DIRECTION TILE");
                        return new Vector(finalX,finalY);
                    }
                }
            }
        }

        return position;
    }
    

    OnPPositionChanged(position)
    {

    }

    getRoom(index)
    {
        if (this.roomList == []) return;
        
        return this.roomList[index];
    }

    getTileAt(x, y)
    {        
        if (x > this.width || y>this.height)
        {

            return undefined;
        } 
        if (x<=0 || y<=0)
        {

            return undefined;
        } 

        return this.tiles[x][y];
    }

    setTile(tile)
    {
        this.tiles[tile.x][tile.y] = tile;
    }    

}

module.exports = World;
