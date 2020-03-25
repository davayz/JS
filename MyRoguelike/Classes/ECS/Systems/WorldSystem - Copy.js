const Action = require('../Components/Action');
const MoveAction = require('..//Components/MoveAction');
const AttackAction = require('..//Components/AttackAction');

const System = require('./System');

//???????????
class ActionDeterminationSystem extends System
{
    constructor(components,world)
    {
        super(components);
        this.world = world;
    }

    update(entity)
    {
        if (super.update(entity) == false) return;    

        var action = entity.components.Action;
        entity.removeComponent("Action");

        if (!this.validateAction(action))
        {
            console.log("Action is not valid");
            return;            
        } 
        
        entity.addComponent(this.determineAction(entity, action));
    }

    /*lateUpdate(entity)
    {
        if (super.update(entity) == false) return;

        var position = entity.components.Position;

        
        if (position.x == undefined || position.y == undefined) return;

        //if (position.prevX == position.x && position.prevY == position.y) return;

        if (position.prevX != undefined && position.prevY != undefined)
        {
            if (position.prevX != position.x && position.prevY != position.y)
            {
                var prevActionTile = this.world.getTileAt(position.prevX, position.prevY);
                prevActionTile.occupied = false;
                prevActionTile.SetEntity(undefined);
    
                this.world.setTile(prevActionTile);
            }
        }

        var currentTile = this.world.getTileAt(position.x, position.y);   
        currentTile.occupied = true;        
        currentTile.SetEntity(entity);

        this.world.setTile(currentTile);
    }*/

    determineAction(entity,action)
    {
        var tile = this.world.getTileAt(action.x, action.y);

        //Check for Basic Attack Action
        if (tile.occupied)
        {
            var entityTarget = tile.GetEntity();
            if ((entityTarget.components.Type.type == "P" && entity.components.Type.type == "E") || (entityTarget.components.Type.type == "E" && entity.components.Type.type == "P"))
            {
                var _action = action;
                _action.type = "Attack";

                return new AttackAction(action.x, action.y, action.apCost, entityTarget);
                //return new AttackAction(entityTarget);
            }            
        }
        
        //Check for Basic Move Action
        if (tile.walkable)
        {
            var _action = action;
            _action.type = "Move";

            return new MoveAction(action.x, action.y);
        }
    }

    validateAction(action)
    {
        var tile = this.world.getTileAt(action.x, action.y);

        if (!this.IsValid(tile))
        {
            return false;
        }

        return true;
    }

    IsValid(tile)
    {
        if (tile == undefined) return false;

        if (!tile.walkable && !tile.occupied) return false;

        return true;
    }
}


module.exports = ActionDeterminationSystem;