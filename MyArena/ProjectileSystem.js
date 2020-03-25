const System = require('./System');

class ProjectileSystem extends System {
    constructor(componentNamesArray) {
        super(componentNamesArray);
    }

    update(entity) {
        if (super.update(entity) == false) return;

        var projectileComponent = entity.getComponent("ProjectileComponent");
        entity.Move(projectileComponent.x, projectileComponent.y);
    }
}

module.exports = ProjectileSystem;