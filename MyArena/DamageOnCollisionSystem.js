const System = require('./System');
const InvincibleComponent = require('./InvincibleComponent');

function entityExists(entities, entity)
{
    var flag = false;
    entities.forEach(function (e) {
        if (e == entity) flag = true;;
    })

    return flag;
}

class DamageOnCollisionSystem extends System {
    constructor(componentNamesArray) {
        super(componentNamesArray);
    }

    update(entity) {
        if (super.update(entity) == false) return;

        var component = entity.getComponent("DamageOnCollision");
        var collider = entity.getComponent("ColliderComponent");

        if (collider.entities != undefined) {
            //console.log(collider.entities);
            collider.entities.forEach(function (e) {
                if (!entityExists(component.entitiesToIgnore, e))
                {

                    if (e.getComponent("InvincibleComponent") == undefined) {
                        

                        var health = e.getComponent("Health");

                        if (health)
                        {
                            health.value -= component.value;
                            console.log("damaged "+health.value);
                            e.addComponent(new InvincibleComponent(2));
                        }
                        
                    }
                }
            });
        }
    }
}

module.exports = DamageOnCollisionSystem;