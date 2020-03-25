const System = require('./System');


class MovementSystem extends System
{
    update(entity)
    {
        if (super.update(entity) == false) return;

        console.log("moving");
        //console.log(entity.components);

        var position = entity.components.Position;
        var moveAction = entity.components.MoveAction;

        if (moveAction == undefined) 
        {
            console.log("no move action")
            return;
        }
        
        position.prevX = position.x;
        position.prevY = position.y;

        position.x = moveAction.x;
        position.y = moveAction.y;

        entity.components.Position = position;

        console.log("moving");

        entity.removeComponent("MoveAction");

        /*if (pos.x == pos.targetX && pos.y == pos.targetY)
        {
            pos.prevX = pos.x;
            pos.prevY = pos.y;

            entity.components.Position = pos;
            return;
        }

        if (pos.targetX == undefined || pos.targetY == undefined) return;

        pos.prevX = pos.x;
        pos.prevY = pos.y;

        pos.x = pos.targetX;
        pos.y = pos.targetY;

        entity.components.Position = pos;*/

        
    }

    handlePositionChangeComponent(position)
    {
        
    }

    handleMovement(entity, action)
    {
        var pos = entity.components.Position;
        pos.targetX = action.x;
        pos.targetY = action.y;

        entity.components.Position = pos;

        entity.removeComponent("Action");
    }

}

module.exports = MovementSystem;