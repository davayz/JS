const System = require('./System');
const Vector = require("C:/Users/Artem.Soldatenkov/myApp/Classes/Vector");
const Action = require('C:/Users/Artem.Soldatenkov/myApp/Classes/ECS/Components/Action');
const Walker = require('C:/Users/Artem.Soldatenkov/myApp/Classes/ECS/Components/Walker');
const Combat = require('C:/Users/Artem.Soldatenkov/myApp/Classes/ECS/Components/Combat');

function GetRandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min)) + min;
    
}


class AISystem extends System
{ 
    constructor(components, playerEntity, world) 
    {
        super(components);
        this.playerEntity = playerEntity;
        this.world = world;
    }

    update(entity)
    {
        if (super.update(entity) == false) return;

        var position = entity.components.Position;

        var player = this.playerEntity;
        var playerPos = player.components.Position; 
        playerPos = new Vector(playerPos.x, playerPos.y);        
        var stats = player.components.Stats;
        //Object.setPrototypeOf(position, playerPos);
        //var distance = playerPos.subtract(position);

        //var distance = new Vector(position.x, position.y).subtract(playerPos);


        //var distance = new Vector(position.x - playerPos.x, position.y - playerPos.y);
        var distance = playerPos.subtract1(position);


        //When to Engage Combat definition
        if (distance.magnitude <=stats.agroDistance)
        {            
            entity.addComponent(new Combat());         
        }

        //When to Disengage Combat definition
        if (distance.magnitude > stats.agroDistance)
        {
            entity.removeComponent("Combat");
        }

        //Behaviour while in combat
        if (entity.getComponent("Combat") != undefined)
        {          

            var action = this.ChaseAction(position, distance);
            entity.addComponent(action);

            return;
        }


        //randomMovement while not in combat for Walkers
        if (entity.getComponent("Walker") != undefined)
        {

            var action = this.ActionToAvailableTile(entity);

            entity.addComponent(action);

            return;
            
        }
    }

    ActionToAvailableTile(entity)
    {
        var direction = this.world.getAvailableDirection(entity);
        return new Action(direction.x,direction.y);
    }

    ChaseAction(position, distance)
    {
        var direction = distance.normalized();
        var actionVector = new Vector(position.x+direction.x, position.y+direction.y);

        var tile = this.world.getTileAt(actionVector.x, actionVector.y);

        if (tile.walkable == false)
        {
            tile = this.world.getTileAt(actionVector.x, position.y);
        }

        if (tile.walkable == false)
        {
            tile = this.world.getTileAt(position.x,actionVector.y);
        }


        return new Action(tile.x, tile.y); 
    }
}
module.exports = AISystem;