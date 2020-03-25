var bodyParser = require('body-parser')
var express = require('express');

var app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


const WorldGenerator = require('./Classes/WorldGenerator');
const World = require('./Classes/World');
const ECS = require('./Classes/ECS/ECS');
const EntityFactory = require('./Classes/EntityFactory');
const Entity = require('C:/Users/Artem.Soldatenkov/myApp/Classes/ECS/Entity');
const InputToActionHandler = require('./Classes/InputToActionHandler');



var world = new World(1600/16,900/16);
let worldGen = new WorldGenerator(world);

let entities = [];
let systems = [];



function generateWorld()
{    
    var i=0;

    while(i<25)
    {
        var room = worldGen.CalculateRoom();

        if (worldGen.ValidateRoomOverlap(room))
        {
            worldGen.BuildRoom(room);
            i++;
        }
    }  

    worldGen.GenerateCorridors();
}

function generateEnemies(amount)
{
    for (var i=0; i<amount; i++)
    {
        entities.push(new EntityFactory("E",world));
    }
}

generateWorld();
var playerEntity = new EntityFactory("PE",world);
generateEnemies(10);




let ecs = new ECS(world, playerEntity);


entities.push(playerEntity);
//ecs.update(entities);



var __dirname = "C:/Users/Artem.Soldatenkov/myApp/";

app.get('/', function (req, res) {
    console.log("GET /");
    res.sendFile('myRogue.html', { root: __dirname });
});

var inputToActionHandler = new InputToActionHandler();
app.post('/keyboardInput', function (req, res) {

    var inputString = req.body.value;  

    inputToActionHandler.handle(playerEntity, inputString);

    ecs.update(entities);

    console.log(inputString);

    return res.end('done');
})

app.get('/api', function (req, res) {
    res.send(req.params[0]);
});

app.get('/render', function (req, res) {
    res.send(JSON.stringify(world.tiles));
});

app.get('/getEntities', function (req, res) {
    res.send(JSON.stringify(entities));
});

var server = app.listen(3000, function()
{
    console.log('Example app listening on port 3000!');  
});

server.on('listening', function () {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});