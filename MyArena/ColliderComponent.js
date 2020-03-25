class ColliderComponent {
    constructor(x,y,radius, delta, IsTrigger) {
        this.x = x;       
        this.y = y;
        this.radius = radius;
        this.delta = delta;
        this.entities = [];
        if (IsTrigger == undefined)
        {
            this.IsTrigger = true;
        }
        else
        {
            this.IsTrigger = IsTrigger;
        }        

        this.name = "ColliderComponent";
    }
}

module.exports = ColliderComponent;