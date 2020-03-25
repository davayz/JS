const System = require('./System');

function GetRandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min)) + min;
    
}

class ActionSystem extends System
{
    constructor(components)
    {
        super(components);
    }

    update(entity)
    {
        if (super.update(entity) == false) return;

        var action = entity.components.Action;
        /*if (!this.ValidateAction(entity, action)) 
        {
            entity.removeComponent("Action"):
            return;
        }

        action = this.determineActionType(action);*/

        switch(action.type)
        {
            case "Attack":
                this.handleAttack(entity,action);
                break;

            case "Move":
                this.handleMovement(entity,action);
                break;
        }



        //IF NO AUTO-ACTION IS POSSIBLE - //// remove Action Component????
        
        
        //check for BasicAttackAction
        /*if (tile.occupied)
        {
            var entityTarget = tile.GetEntity();
            if ((entityTarget.components.Type.type == "P" && entity.components.Type.type == "E") || (entityTarget.components.Type.type == "E" && entity.components.Type.type == "P"))
            {
                var damage = this.CalculateFinalDamageToHealth(entity,entityTarget);
                console.log(entityTarget.name+" damaged for "+ damage+" dmg");
                entityTarget.components.Health.value -= damage;               


                entity.removeComponent("Action");
            }

            return;
        }

        //check for BasicMovementAction
        if (!tile.occupied)
        {
            if (tile.walkable)
            {         

                var pos = entity.components.Position;
                pos.targetX = action.x;
                pos.targetY = action.y;

                entity.components.Position = pos;
                entity.removeComponent("Action");
            }
        }  */      
    }

    handleMovement(entity, action)
    {
        var pos = entity.components.Position;
        pos.targetX = action.x;
        pos.targetY = action.y;

        entity.components.Position = pos;

        entity.removeComponent("Action");
    }

    handleAttack(entity, action)
    {
        var entityTarget = action.entityTarget;
        var damage = this.CalculateFinalDamageToHealth(entity,entityTarget);

        console.log(entityTarget.name+" damaged for "+damage);

        //handleDamageApplication
        entityTarget.components.Health.value -= damage;         

        entity.removeComponent("Action");
    }   

    determineActionType(action)
    {
        if (tile.occupied)
        {
            var entityTarget = tile.GetEntity();
            if ((entityTarget.components.Type.type == "P" && entity.components.Type.type == "E") || (entityTarget.components.Type.type == "E" && entity.components.Type.type == "P"))
            {
                var damage = this.CalculateFinalDamageToHealth(entity,entityTarget);
                console.log(entityTarget.name+" damaged for "+ damage+" dmg");
                entityTarget.components.Health.value -= damage;             

                entity.removeComponent("Action");

                action.type = "Attack";

                return new Action();
            }            
        }        
    }

    validateAction(action)
    {
        var tile = world.getTileAt(action.x, action.y);

        if (!this.IsValid(tile))
        {
            debug.log("Action is not Valid");
            return false;
        }

        return true;
    }

    IsValid(tile)
    {
        if (tile == undefined) return false;

        if (!tile.walkable && !tile.interactible && !tile.occupied) return false;

        return true;
    }

    CalculateFinalDamageToHealth(entity, entityTarget)
    {
        var stats1 = entity.components.Stats;
        var stats2 = entityTarget.components.Stats;

        return GetRandomInt(0, 15);
    }

}

module.exports = ActionSystem;