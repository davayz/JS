const System = require('./System');

//???????????
class APSystem extends System
{
    constructor(components)
    {
        super(components);
    }

    update(entity)
    {
        if (super.update(entity) == false) return;

        
        var action = entity.components.Action;
        var AP = entity.components.Stats.AP;

        if (action.apCost<=AP)
        {            
            entity.components.stats.ap -= action.apCost;
        }
        else if (action.apCost>AP)
        {
            entity.removeComponent("Action");
        }
        

    }
}

module.exports = APSystem;