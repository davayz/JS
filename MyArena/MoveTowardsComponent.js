class MoveTowardsComponent {
    constructor(x, y) {
        this.x=x;
        this.y=y;
        /*console.log(x,y);
        this.x=x;
        this.y=y;*/
        this.destroyOnArrival = true;
        this.destroyDelay = 1;
        
        this.name = "MoveTowardsComponent";
    }
}

module.exports = MoveTowardsComponent;