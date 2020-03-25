const Action = require('../Components/Action');
const MoveAction = require('..//Components/MoveAction');
const AttackAction = require('..//Components/AttackAction');

const System = require('./System');

//???????????
class WorldSystem extends System
{
    constructor(components,world)
    {
        super(components);
        this.world = world;
    }

    update(entity)
    {
        if (super.update(entity) == false) return;    

        var position = entity.components.Position;

        this.handleTileInfo(position.prevX, position.prevY, false, undefined);
        this.handleTileInfo(position.x, position.y, true, entity);       

    }

    handleTileInfo(x, y, occupiedState, occupiedEntity)
    {
        var tile = this.world.getTileAt(x,y);
        tile.occupied = occupiedState;
        tile.SetEntity(occupiedEntity);
        this.world.setTile(tile);
    }
}


module.exports = WorldSystem;