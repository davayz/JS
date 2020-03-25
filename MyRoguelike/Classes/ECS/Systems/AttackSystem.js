const System = require('./System');

function GetRandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min)) + min;
    
}

class AttackSystem extends System
{
    constructor(components)
    {
        super(components);
    }

    update(entity)
    {
        if (super.update(entity) == false) return;

        var attackAction = entity.components.AttackAction;

        this.handleAttack(entity,attackAction);
    }

    handleAttack(entity, action)
    {
        var entityTarget = action.entityTarget;
        var damage = this.CalculateFinalDamageToHealth(entity,entityTarget);

        console.log(entityTarget.name+" damaged for "+damage);

        //handleDamageApplication
        entityTarget.components.Health.value -= damage;         

        entity.removeComponent("AttackAction");
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

    CalculateFinalDamageToHealth(entity, entityTarget)
    {
        var stats1 = entity.components.Stats;
        var stats2 = entityTarget.components.Stats;

        return GetRandomInt(0, 15);
    }

}

module.exports = AttackSystem;