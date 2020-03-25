const System = require('./System');
const DestroyComponent = require('./DestroyComponent');

class MoveTowardsSystem extends System {
    constructor(componentNamesArray) {
        super(componentNamesArray);
    }

    update(entity) {
        if (super.update(entity) == false) return;

        var moveTowardsComponent = entity.getComponent("MoveTowardsComponent");

        if (moveTowardsComponent.x == entity.x && moveTowardsComponent.y == entity.y)
        {
            entity.removeComponent("MoveTowardsComponent");

            if (moveTowardsComponent.destroyOnArrival)
            {
                entity.addComponent(new DestroyComponent(moveTowardsComponent.destroyDelay));
            }
        }
        entity.MoveTowards(moveTowardsComponent.x, moveTowardsComponent.y);  
    }
}

module.exports = MoveTowardsSystem;