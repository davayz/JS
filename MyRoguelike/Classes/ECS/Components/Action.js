const Component = require('./Component');

class Action extends Component
{
    constructor(targetX, targetY, apCost)
    {
        super();
        this.x = targetX;
        this.y = targetY;

        this.apCost = apCost;
        
        this.type = "None";

        this.name = "Action";
    }
}


module.exports = Action;