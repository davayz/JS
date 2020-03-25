const System = require('./System');

class RenderSystem extends System
{
    constructor(components,tileSize)
    {
        super(components);
        this.tileSize = tileSize;
    }

    update(entity)
    {
        if (super.update(entity) == false) return;  

        var position = entity.components.Position;
        var sprite = entity.components.Sprite;

        //if (position.x == position.prevX && position.y == position.prevY) return;     
        

        /*if (entity.components.Renderable.flag == false)
        {
            this.renderFalse(position);
            return;
        }
        else
        {*/            
        ///MAIN LOGIC
        //this.renderPrevPosition(position);

        this.renderCurrentPosition(position, sprite);
        //}
    }

    renderFalse(position)
    {
        var x = position.x; var y = position.y;
        ctx.fillStyle = "black";
        ctx.fillRect(x*this.tileSize, y*this.tileSize - this.tileSize/2 -3, this.tileSize, this.tileSize);
        ctx.fillStyle = "#ffffff";

        var tile = world.tiles[x][y];

        if (tile.visibility == 1)
        {
            eventBus.publish("OnTileRender", tile);
        }
    }

    renderPrevPosition(position)
    {
        if (position.prevX == undefined || position.prevY == undefined) return;

        var x = position.prevX; var y = position.prevY;
        ctx.fillStyle = "black";
        ctx.fillRect(x*this.tileSize, y*this.tileSize - this.tileSize/2 -3, this.tileSize, this.tileSize);
        ctx.fillStyle = "#ffffff";
    }

    renderCurrentPosition(position, sprite)
    {        
        ctx.fillStyle = sprite.color;
        ctx.fillText(sprite.sprite, position.x*this.tileSize, position.y*this.tileSize);
        ctx.fillStyle = "#ffffff";
    }
}

module.exports = RenderSystem;