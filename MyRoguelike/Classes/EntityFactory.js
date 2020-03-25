
const Entity = require('./ECS/Entity');
const Position = require('./ECS/Components/Position');
const Health = require('./ECS/Components/Health');
const Sprite = require('./ECS/Components/Sprite');
const ActionPoints = require('./ECS/Components/ActionPoints');
const Type = require('./ECS/Components/Type');
const Stats = require('./ECS/Components/Stats');
const Renderable = require('./ECS/Components/Renderable');
const FoV = require('./ECS/Components/FoV');
const Controller = require('./ECS/Components/Controller');
const EntitiesInFoV = require('./ECS/Components/EntitiesInFoV');
const Turn = require('./ECS/Components/Turn');
const AIController = require('./ECS/Components/AIController');
const Walker = require('./ECS/Components/Walker');

function GetRandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min)) + min;
    
}

class EntityFactory
{
    constructor(string,world)
    {
        if (string == "PE")
        {
            return new PEntityFactory(world);
        }

        if (string == "E")
        {
            return new EEntityFactory(world);
        }
    }
}

class PEntityFactory
{
    constructor(world)
    {
        var entity = new Entity("PE");

        var position = world.getRoom(0).randomPosition();
        var pos = new Position(position.x, position.y);


        entity.addComponent(pos);
        entity.addComponent(new Health());
        entity.addComponent(new Sprite("@","yellow"));
        entity.addComponent(new ActionPoints(3,3));
        entity.addComponent(new Type("P"));
        entity.addComponent(new Stats(0.5));
        entity.addComponent(new Renderable(true));
        entity.addComponent(new FoV());
        entity.addComponent(new Controller());
        entity.addComponent(new EntitiesInFoV([]));
        entity.addComponent(new Turn());

        return entity;
    }
}

class EEntityFactory
{
    constructor(world)
    {
        var roomIndex = GetRandomInt(1, world.roomList.length);

        var position = world.getRoom(roomIndex).randomPosition();

        var entity = new Entity("enemy");


        entity.addComponent(new Position(position.x, position.y));
        entity.addComponent(new Health());

        var rnd = GetRandomInt(0,3);
        var eSprites = [];
        eSprites.push("R");
        eSprites.push("G");
        eSprites.push("T");
        var sprite = eSprites[rnd];
        var rnd = GetRandomInt(0,2);
        var colors = [];
        colors.push("red");
        colors.push("green");
        colors.push("blue");
        var color = colors[rnd];

        entity.addComponent(new Sprite(sprite,color));
        entity.addComponent(new ActionPoints(3,3));
        entity.addComponent(new AIController());
        entity.addComponent(new Type("E"));
        entity.addComponent(new Renderable(false));
        entity.addComponent(new Stats(1,10,3));      
        
        //if (GetRandomInt(0,100)>=70)
        //{
            entity.addComponent(new Walker());        
        //}

        return entity;
    }
}




module.exports = EntityFactory;