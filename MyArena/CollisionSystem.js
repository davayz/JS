const System = require('./System');
const Vector = require('./Vector');

class CollisionSystem extends System {
    constructor(componentNamesArray) {
        super(componentNamesArray);
    }

    updateColliderPosition(entity) {
        var collider = entity.getComponent("ColliderComponent");
        collider.x = entity.x + collider.delta;
        collider.y = entity.y + collider.delta;
        entity.components.Collider = collider;
    }

    updateCollision(entities) {
        var self = this;
        entities.forEach(function(e)
        {
            self.updateColliderPosition(e);
        });

        for (var i = 0; i < entities.length; i++)
        {
            var collider1 = entities[i].getComponent("ColliderComponent");
            if (collider1 == undefined) continue;

            //this.updateColliderPosition(entities[i]);

            
            for (var j = 0; j < entities.length; j++)
            {
                if (i==j) continue;

                var collider2 = entities[j].getComponent("ColliderComponent");
                if (collider2 == undefined) continue;

                //this.updateColliderPosition(entities[j]);
                                
                var dx = collider1.x - collider2.x;
                var dy = collider1.y - collider2.y;
                var distance = Math.sqrt(dx * dx + dy * dy);
        
                if (distance < collider1.radius + collider2.radius) {

                    if (!collider1.IsTrigger)
                    {
                        if (entities[j].getComponent("Player"))
                        {
                            var vectorToPush = new Vector(entities[j].x - entities[i].x, entities[j].y - entities[j].y);
                            vectorToPush.normalize();
    
                            //entities[j].x += vectorToPush.x*4;
                            //entities[j].y += vectorToPush.y*4;
                        }
                        
                    }
                    else
                    {
                        if (!this.entityExists(collider1.entities, entities[j]))
                        {
                            collider1.entities.push(entities[j]);
                        }
                    }              
                    
                }
                else
                {
                    if (this.entityExists(collider1.entities, entities[j]))
                    {
                        collider1.entities.splice(collider1.entities.indexOf(entities[j]),1);
                    }
                }
            }
        }
    }


    entityExists(entities, entity)
    {
        var flag = false;
        entities.forEach(function (e)
        {
            if (e == entity) flag = true;;
        })

        return flag;
    }

}

module.exports = CollisionSystem;