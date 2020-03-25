const Action = require('./Action');

class MoveAction extends Action
{
    constructor(targetX, targetY, apCost)
    {
        super(targetX, targetY, apCost);

        this.type = "Move";
        this.name = "MoveAction";
    }
}


module.exports = MoveAction;