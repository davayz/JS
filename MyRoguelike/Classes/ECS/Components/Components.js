class Component
{

}

class NoActionsAvailable extends Component
{
    constructor()
    {
        super();

        this.name = "NoActionsAvailable";
    }
}



class Combat extends Component
{
    constructor()
    {
        super();

        this.name = "Combat";
    }
}




























class Sprite extends Component
{
    constructor(sprite,color)
    {
        super();
        this.sprite = sprite;
        this.color = color;
        if (color == undefined) this.color = "white";

        this.name = "Sprite";
    }
}

class Position extends Component
{
    constructor(x,y)
    {
        super();
        //if (x != undefined) this.x = x; else this.x = 1;
       // if (y != undefined) this.y = y; else this.y = 1;

       this.x = x;
       this.y = y;

        
        this.prevX = undefined;
        this.prevY = undefined;
        this.targetX = undefined;
        this.targetY = undefined;
        
        this.name = "Position";
    }
}

module.exports = Position;

class Health extends Component
{
    constructor(value)
    {
        super();
        if (value == void 0)
        {
            this.value = 100;
        }
        else
        {
            this.value = value;
        }
        this.name = "Health";
    }
}

