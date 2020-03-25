const System = require('./Systems/System');
const AISystem = require('./Systems/AISystem');
const WorldSystem = require('./Systems/WorldSystem');
const APSystem = require('./Systems/APSystem');
const ActionSystem = require('./Systems/ActionSystem');
const MovementSystem = require('./Systems/MovementSystem');
const FieldOfViewSystem = require('./Systems/FieldOfViewSystem');
const RenderSystem = require('./Systems/RenderSystem');
const TurnSystem = require('./Systems/TurnSystem');
const ActionDeterminationSystem = require('./Systems/ActionDeterminationSystem');
const AttackSystem = require('./Systems/AttackSystem');

class ECS
{
    constructor(world,playerEntity)
    {
        this.renderSystem = new RenderSystem(["Position"],16);
        this.attackSystem = new AttackSystem(["AttackAction"]);
        this.movementSystem = new MovementSystem(["Position", "MoveAction"]);
        this.aiSystem = new AISystem(["AIController", "Turn"], playerEntity, world);
        this.worldSystem = new WorldSystem(["Position"],world);
        this.actionDeterminationSystem = new ActionDeterminationSystem(["Position", "Action"],world);
        this.fieldOfViewSystem = new FieldOfViewSystem(["Position", "FoV"],world);
    
        //this.worldSystemuiSystem = new UISystem(["Controller", "Position"], posConsole, mainConsole);
    
        this.turnSystem = new TurnSystem(["Turn"]);
    
        this.apSystem = new APSystem(["Stats, Action"]);

        this.playerEntity = playerEntity;
    }
    
    update(entities) {


        for (var i=0; i<entities.length; i++)
        {

            this.aiSystem.update(entities[i]);

            this.actionDeterminationSystem.update(entities[i]);

            //this.apSystem.update(entities[i]);



            this.movementSystem.update(entities[i]);
            this.attackSystem.update(entities[i]);


            this.worldSystem.update(entities[i]);




            this.fieldOfViewSystem.update(this.playerEntity);

            if (i == entities.length-1)
            {
                this.turnSystem.update(entities[i], entities[0]);
            }
            else{
                this.turnSystem.update(entities[i], entities[i+1]);
            }

            


            //this.uiSystem.update(entities);
            //this.renderSystem.update(entities);
            

            //console.log("*****************");
        }
    }


   /* update1(time) {
        window.requestAnimationFrame(this.update.bind(this));

        const delta = time - this.lastUpdate;
        this.tickTime += delta;
        this.lastUpdate = time;

        entities.forEach(entities => {
            actionSystem.update(entities);
            movementSystem.update(entities);
            worldSystem.update(entities);
            renderSystem.update(entities);       
        });


        if (this.tickTime < this.TICKLENGTH) {
        return;
        }

        this.tickTime %= this.TICKLENGTH;
    }*/

    //runTurn() {

       // this.ecs.runSystemGroup('action');
       // this.ecs.runSystemGroup('render');
     // }
}

module.exports = ECS;