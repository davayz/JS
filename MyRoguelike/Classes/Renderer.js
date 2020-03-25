
class Renderer
{
    constructor(tileSize, speed)
    {
        this.tileSize = tileSize;
        //var string = '"'+tileSize+'px Arial"';
        ctx.font = tileSize+"px Times New Roman";
        //ctx.font = "32px Times New Roman";
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff";
        //ctx.fillStyle = "gray";
        
        this.speed = speed;
        this.time = 0;

        eventBus.subscribe("OnTileRender", this, this.render);
        eventBus.subscribe("OnTileRenderAnimated", this, this.renderAnimated);
        eventBus.subscribe("OnObjRender", this, this.renderObj);
        eventBus.subscribe("OnPositionChanged", this, this.updateObj);
    }

    updateObj(obj)
    {
        var dx = obj.position.x - obj.lastPos.x;
        var dy = obj.position.y - obj.lastPos.y;

        //KEY="D" LEFT
/*         if (dx<0)
        {
            ctx.fillRect(obj.lastPos.x*this.tileSize, obj.lastPos.y*this.tileSize - this.tileSize/2, this.tileSize, this.tileSize);
        }

        //KEY="A" RIGHT
        if (dx>0)
        {
            ctx.fillRect(obj.lastPos.x*this.tileSize, obj.lastPos.y*this.tileSize - this.tileSize/2, this.tileSize, this.tileSize);
        }

        //KEY="S" DOWN
        if (dy>0)
        {
            ctx.fillRect(obj.lastPos.x*this.tileSize, obj.lastPos.y*this.tileSize - this.tileSize/2, this.tileSize, this.tileSize);
        }

        //KEY="W" UP
        if (dy<0)
        {
            ctx.fillRect(obj.lastPos.x*this.tileSize, obj.lastPos.y*this.tileSize - this.tileSize/2, this.tileSize, this.tileSize);
        } */

        this.ctxClearRect(obj.lastPos.x, obj.lastPos.y);

        //ctx.clearRect(obj.lastPos.x*this.tileSize, obj.lastPos.y*this.tileSize - this.tileSize/2 - 3, this.tileSize, this.tileSize);
        
        this.renderObj(obj);
    }

    renderObj(obj)
    {
        var position = obj.position;
        if (position == undefined) return;
        
        ctx.fillText(this.getObjGraphics(obj), position.x*this.tileSize, position.y*this.tileSize);

        ctx.fillStyle = "#ffffff";
    }

    getObjGraphics(obj)
    {
        if (obj.type == "P") { ctx.fillStyle = "yellow"; return "@"; }

        if (obj.type == "E") { ctx.fillStyle = "red"; return "R";}
    }

    render(tile)
    {
        this.ctxClearRect(tile.x, tile.y);
        ctx.fillText(this.getTileGraphics(tile), tile.x*this.tileSize, tile.y*this.tileSize)     
    }

    hide(tile)
    {
        console.log("hide");
        this.ctxClearRect(tile.x, tile.y);
    }

    renderAnimated(tile)
    {
        setTimeout( (() => this.ctxClearRect(tile.x, tile.y)).bind(this),this.time);
        //setTimeout( ( () => ctx.clearRect(tile.x*this.tileSize, tile.y*this.tileSize - this.tileSize/2 -3, this.tileSize, this.tileSize) ).bind(this), this.time);
        this.time+=this.speed;
        setTimeout( ( () => ctx.fillText(this.getTileGraphics(tile), tile.x*this.tileSize, tile.y*this.tileSize) ).bind(this), this.time);    
    }

    renderRect(tile)
    {
        //setTimeout( ( () => ctx.fillRect(tile.x*this.tileSize, tile.y*this.tileSize, this.tileSize, this.tileSize) ).bind(this), this.time);  
        ctx.clearRect(tile.x*this.tileSize, tile.y*this.tileSize - this.tileSize/2 - 3, this.tileSize, this.tileSize);
    }
    

    getTileGraphics(tile)
    {
        //if (tile.view != undefined) { return tile.view; }
        if (tile.info == "corridor") return ".";

        switch (tile.tileType)
        {
            case "wall":
                return "#";
            
            case "floor":

                switch(tile.info)
                {
                    case "corridor":
                        return "o";
                    default:
                        return ".";
                }

            case "empty":
                return "";

            case "door":
                return "+";

            case "exit":
                ctx.fillStyle = "#00FFFF";
                return "E";

            default:
                return tile.view;
        }
    }

    ctxClearRect(x,y)
    {
        ctx.fillStyle = "black";
        ctx.fillRect(x*this.tileSize, y*this.tileSize - this.tileSize/2 -3, this.tileSize, this.tileSize);
        ctx.fillStyle = "#ffffff";
    }

    renderr(x, y, tileGraphics)
    {
        ctx.fillText(tileGraphics, x*this.tileSize, y*this.tileSize);
    }
}
