const System = require('./System');

class CollisionSystem extends System {
    constructor(componentNamesArray) {
        super(componentNamesArray);
    }

    update(entity) {
        if (super.update(entity) == false) return;

        var collider = entity.getComponent("ColliderComponent");
        collider.x = entity.x+entity.img.width+10;
        collider.y = entity.y+entity.img.height+10;
    }
}

module.exports = CollisionSystem;