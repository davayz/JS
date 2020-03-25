const System = require('./System');
const DestroyComponent = require('./DestroyComponent');

class HealthSystem extends System {
    constructor(componentNamesArray) {
        super(componentNamesArray);
    }

    update(entity) {
        if (super.update(entity) == false) return;

        var component = entity.getComponent("Health");

        if (component.value <= 0) {
            entity.addComponent(new DestroyComponent(1));
        }

    }
}

module.exports = HealthSystem;