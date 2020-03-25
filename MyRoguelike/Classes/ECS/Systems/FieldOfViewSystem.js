const System = require('./System');

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
}

class FieldOfViewSystem extends System
{
    constructor(components,world) 
    {
        super(components);
        this.prevTurnEntitiesInFoV = [];
        this.currentTurnEntitiesInFoV = [];
        this.world=world;
    }
    
    update(entity)
    {
        if (super.update(entity) == false) return;
        
        var position = entity.components.Position;
        this.prevTurnEntitiesInFoV = [];
        this.prevTurnEntitiesInFoV = this.currentTurnEntitiesInFoV;
        
        //entity.addComponent(new EntitiesInFoV(this.currentTurnEntitiesInFoV));

        /*if (entity.getComponent("EntitiesInFoV")!=undefined)
        {
            entity.components.EntitiesInFoV.array = this.currentTurnEntitiesInFoV;
        }*/
        
        this.DisplayFoV(position);

        var entitiesNotInFoV = this.prevTurnEntitiesInFoV.diff(this.currentTurnEntitiesInFoV);
        


        entitiesNotInFoV.forEach(function(entity)
        {
            entity.components.Renderable.flag = false;
        });
    }

    DisplayFoV(position)
    {
        var i = 1;
        var x = position.x;
        var y = position.y;

        var fovTiles = 6;

        this.currentTurnEntitiesInFoV = [];
    
        for (var x1 = x-fovTiles; x1 <= x+fovTiles; x1++)
        {
            for (var y1 = y-fovTiles; y1 <= y+fovTiles; y1++)
            {
                if (x1 == x && y1 == y) continue;          
                     
                var tile = this.world.getTileAt(x1,y1);
                
                if (tile == undefined) continue;

                if (tile.occupied)
                {

                    var entityOnTile = tile.GetEntity();
                    entityOnTile.components.Renderable.flag = true;

                    this.currentTurnEntitiesInFoV.push(entityOnTile);

                }

                tile.visibility = 1;

                //eventBus.publish("OnTileRender", tile);

            }
        }
    }
}

module.exports = FieldOfViewSystem;