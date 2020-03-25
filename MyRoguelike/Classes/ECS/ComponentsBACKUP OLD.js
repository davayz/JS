class Component
{

}

class Controller extends Component
{
    constructor()
    {
        super();

        this.name = "Controller";
    }
}

class EntitiesInFoV extends Component
{
    constructor(array)
    {
        super();

        this.array = [];
        if (array != undefined) this.array = array;

        this.name = "EntitiesInFoV";
    }
}

class Walker extends Component
{
    constructor()
    {
        super();

        this.name = "Walker";
    }
}

class FoV extends Component
{
    constructor()
    {
        super();

        this.name = "FoV";
    }
}

class Visible extends Component
{
    constructor(flag)
    {
        super();
        this.flag = flag;

        this.name = "Visible";
    }
}


class AIController extends Component
{
    constructor()
    {
        super();

        this.name = "AIController";
    }
}

class Type extends Component
{
    constructor(type)
    {
        super();
        this.type = type;

        this.name = "Type";
    }
}

class Stats extends Component
{
    constructor(APmovementCostPerTile, expOnKill)
    {
        super();
        this.APmovementCostPerTile = APmovementCostPerTile;
        this.expOnKill = expOnKill;

        this.exp = 0;
        this.expToLevel = 100;
        this.agroDistance = 6;

        this.name = "Stats";
    }
}

class AP extends Component
{
    constructor(value, maxValue)
    {
        super();
        this.value = value;
        this.maxValue = maxValue;

        this.name = "AP";
    }
}

class Action extends Component
{
    constructor(targetX, targetY)
    {
        super();
        this.x = targetX;
        this.y = targetY;

        this.name = "Action";
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

