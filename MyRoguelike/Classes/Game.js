const WorldGenerator = require('./Classes/WorldGenerator');
const World = require('./Classes/World');
const ECS = require('./Classes/ECS/ECS');
const EntityFactory = require('./Classes/EntityFactory');
const Entity = require('C:/Users/Artem.Soldatenkov/myApp/Classes/ECS/Entity');
const OnInputPOST = require('./Classes/OnInputPOST');

var onInputPOST = new OnInputPOST();



class Game {
    constructor() {
        
        var world = new World(1600 / 16, 900 / 16);
        let worldGen = new WorldGenerator(world);
        this.generateWorld();

    }

    generateWorld() {
        var i = 0;

        while (i < 25) {
            var room = worldGen.CalculateRoom();

            if (worldGen.ValidateRoomOverlap(room)) {
                worldGen.BuildRoom(room);
                i++;
            }
        }

        worldGen.GenerateCorridors();
    }

    
}


module.exports = Game;