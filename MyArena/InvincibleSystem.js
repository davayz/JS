const System = require('./System');

class InvincibleSystem extends System {
    constructor(componentNamesArray) {
        super(componentNamesArray);
    }

    update(entity) {
        if (super.update(entity) == false) return;

        var component = entity.getComponent("InvincibleComponent");

        if (component.durationPassed>=component.duration*1000)
        {
            entity.removeComponent("InvincibleComponent");
        }
        else
        {
            component.durationPassed+=1000/30;
        }

        console.log(component.durationPassed+"/"+component.duration)
        
    }
}

module.exports = InvincibleSystem;