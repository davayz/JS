class ECS
{
    constructor()
    {
        this.TICKLENGTH = 1000 / 8;
    }

    
    update() {

        entities.forEach(entity => {
            actionSystem.update(entity);
            movementSystem.update(entity);
            worldSystem.update(entity);
            fieldOfViewSystem.update(entity);
            renderSystem.update(entity);       
        });
    }


    update1(time) {
        window.requestAnimationFrame(this.update.bind(this));

        const delta = time - this.lastUpdate;
        this.tickTime += delta;
        this.lastUpdate = time;

        entities.forEach(entity => {
            actionSystem.update(entity);
            movementSystem.update(entity);
            worldSystem.update(entity);
            //if (entity.components.Type.type == "P") fieldOfViewSystem.update(entity);
            renderSystem.update(entity);       
        });

        //this.ecs.runSystemGroup('input');

        /*if (this.player.Action) {
        this.runTurn();
        }*/

        if (this.tickTime < this.TICKLENGTH) {
        return;
        }

        this.tickTime %= this.TICKLENGTH;
        //this.runTick();
        //this.ecs.runSystemGroup('render');
    }

    //runTurn() {

       // this.ecs.runSystemGroup('action');
       // this.ecs.runSystemGroup('render');
     // }
}