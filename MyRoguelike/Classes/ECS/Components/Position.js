const Component = require('./Component');

class Position extends Component
{
    constructor(x,y)
    {
        super();
        //if (x != undefined) this.x = x; else this.x = 1;
       // if (y != undefined) this.y = y; else this.y = 1;

       this.x = x;
       this.y = y;

        
        this.prevX = x;
        this.prevY = y;
        this.targetX = undefined;
        this.targetY = undefined;
        
        this.name = "Position";
    }
}

module.exports = Position;
