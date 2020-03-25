const Action = require('./Action');

class AttackAction extends Action
{
    constructor(targetX, targetY, apCost, entityTarget)
    {
        super(targetX, targetY, apCost);

        this.entityTarget = entityTarget;
        
        this.type = "Attack";
        this.name = "AttackAction";
    }
}


module.exports = AttackAction;