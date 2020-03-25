class Tile
{
    constructor(x, y, tileType, info, visibility, walkable, entity)
    {
        this.x = x;
        this.y = y;
        this.tileType = tileType;
        
        if (tileType != "floor")
        {
            this.walkable == false;
        }
        else this.walkable = true;

        this.info = info;

        this.visibility = 0;
        this.walkable = walkable;
        
        this.occupied = false;

        this.entity = entity;


        this.onVisibilityChanged = undefined;
    }


    GetEntity()
    {
        return this.entity;
    }

    SetEntity(entity)
    {
        this.entity = entity;
    }

    setVisiblity(id)
    {
        this.visibility = id;
    }

    Display()
    {      

        eventBus.publish("OnTileRender", this);

        if (this.object != undefined)
        {
            eventBus.publish("OnObjRender", this.object);
        }
    }

    Hide()
    {
        this.view = 0;
        renderer.hide(this);
    }
}

module.exports = Tile;

