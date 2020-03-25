const ngrok = require('ngrok');
const express = require('express');
const connect = require('connect');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Entity = require('./Entity');
const MoveTowardsComponent = require('./MoveTowardsComponent');
const ProjectileComponent = require('./ProjectileComponent');
const ColliderComponent = require('./ColliderComponent');
const Health = require('./Health');
const DamageOnCollision = require('./DamageOnCollision');
const DamageOnCollisionSystem = require('./DamageOnCollisionSystem');
const Vector = require('./Vector');

const MoveTowardsSystem = require('./MoveTowardsSystem');
const ProjectileSystem = require('./ProjectileSystem');
const HealthSystem = require('./HealthSystem');
const CollisionSystem = require('./CollisionSystem');
const InvincibleSystem = require('./InvincibleSystem');
const EventBus = require('./EventBus');

const step = 1000 / 30;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const __dirname = 'C:/Users/Artem.Soldatenkov/myNVM';

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/td.html`);
});

const imgPath = 'playerSprite-removebg-preview.png';
const projectileSprite = 'projectile.png';
const projectile1Sprite = 'projectile1.png';


const players = new Map();
const entities = [];

const TextMap = [
  'W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W',
  'W       W                                                 W',
  'W   E   W           E           E                         W',
  'W   E   W                                                 W',
  'W       W           E     W W W W W W                     W',
  'W     W W                                                 W',
  'W                   E                                     W',
  'W         E E                   E                         W',
  'W                                                         W',
  'W W W W W W W W W W W W W W                               W',
  'W                         W                               W',
  'W     E     E             W     E                         W',
  'W                   E     W                               W',
  'W W W W W W W             W                               W',
  'W                         W     E                         W',
  'W               W W W W W W                               W',
  'W   P                     W                               W',
  'W                   E                                     W',
  'W         W W W                   E                       W',
  'W           W       E                                     W',
  'W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W',
];

for (let y = 0; y < TextMap.length; y++) {
  const row = TextMap[y];

  for (let x = 0; x < row.length; x++) {
    const tile = row[x];

    // handle wall entity
    if (tile == 'W') {
      const entity = new Entity('123', x * 32, y * 64, 0, 'wall.png');
      entity.addComponent(new ColliderComponent(entity.x, entity.y, 25, 25, false));
      // entity.addComponent(new ColliderComponent(entity.x, entity.y, 35, 32, false));
      entities.push(entity);
    }
  }
}


class Player {
  constructor() {
    this.name = 'Player';
  }
}

io.on('connection', (socket) => {
  // CREATE PLAYER
  const player = new Entity(socket.id, 64, 64, 4, imgPath);
  player.addComponent(new Health(100, 100));
  player.addComponent(new ColliderComponent(player.x, player.y, 35, 45));
  player.addComponent(new Player());

  players.set(socket.id, player);
  entities.push(player);

  socket.on('input', (input) => {
    onInputRecieved(input, socket.id);
  });

  socket.on('LMB', (clickPosition) => {
    const player = players.get(socket.id);
    if (!player) return;

    const projectile = new Entity(1, player.x, player.y, 12, projectileSprite);
    projectile.addComponent(new MoveTowardsComponent(clickPosition.x, clickPosition.y));
    projectile.addComponent(new ColliderComponent(projectile.x, projectile.y, 20, 40));
    projectile.addComponent(new DamageOnCollision([player], 50));
    entities.push(projectile);
  });

  socket.on('RMB', (clickPosition) => {
    const player = players.get(socket.id);
    if (!player) return;

    const projectile = new Entity(1, player.x, player.y, 8, projectile1Sprite);
    const direction = new Vector(clickPosition.x - player.x, clickPosition.y - player.y);
    direction.normalize();

    projectile.addComponent(new ProjectileComponent(direction.x, direction.y));
    projectile.addComponent(new ColliderComponent(projectile.x, projectile.y, 20, 40));
    projectile.addComponent(new DamageOnCollision([player], 50));
    entities.push(projectile);
  });
});

const moveTowardsSystem = new MoveTowardsSystem(['MoveTowardsComponent']);
const collisionSystem = new CollisionSystem(['ColliderComponent']);
const damageOnCollisionSystem = new DamageOnCollisionSystem(['DamageOnCollision']);
const invincibleSystem = new InvincibleSystem(['InvincibleComponent']);
const healthSystem = new HealthSystem(['Health']);
const projectileSystem = new ProjectileSystem(['ProjectileComponent']);

setInterval(() => {
  /* entities.forEach(function(e)
    {
        console.log("*********");
        if (e.getComponent("Health") != undefined)
        {
            console.log(e.components.Health.value);
        }

        var collider = e.getComponent("ColliderComponent");
        if (collider)
        {
            if (collider.entities != undefined)
            {
                //console.log(collider.entities);
            }
        }

        //console.log("*********");
    }) */
}, 3000);

function handleDestruction(entity) {
  const destroyComponent = entity.getComponent('DestroyComponent');
  if (destroyComponent != undefined) {
    setTimeout(() => {
      entities.splice(entities.indexOf(entity), 1);
    }, destroyComponent.delay);

    players.delete(entity.id);
  }
}

class Renderable {
  constructor(x, y, sprite, collider) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.collider = collider;
  }
}

function update() {
  collisionSystem.updateCollision(entities);

  entities.forEach((entity) => {
    healthSystem.update(entity);
    invincibleSystem.update(entity);
    moveTowardsSystem.update(entity);
    projectileSystem.update(entity);
    damageOnCollisionSystem.update(entity);


    // handle DestroyComponent
    handleDestruction(entity);
  });

  // send entities to client
  const renderable = [];
  entities.forEach((e) => {
    const collider = e.getComponent('ColliderComponent');
    if (collider != undefined) {
      renderable.push(new Renderable(e.x, e.y, e.sprite, new ColliderComponent(collider.x, collider.y, collider.radius)));
    } else {
      renderable.push(new Renderable(e.x, e.y, e.sprite));
    }
  });

  io.sockets.emit('render', renderable);
}


setInterval(update, 1000 / 30);

function onInputRecieved(input, playerId) {
  const player = players.get(playerId);
  if (!player) return;

  var dx = 0;
  var dy = 0;

  if (input.keyboard.up) {
    dy -= 1;
  }
  if (input.keyboard.right) {
    dx += 1;
  }
  if (input.keyboard.left) {
    dx -= 1;
  }
  if (input.keyboard.down) {
    dy += 1;
  }
  // handle Blink
  if (input.keyboard.space) {
    if (player.blinkUsed) {
      player.blinkCooldownPassed += step;
      if (player.blinkCooldownPassed >= player.blinkCooldown * 1000) {
        player.blinkUsed = false;
      }
    } else {
      let movementValid = true;

      for (let i = 0; i < entities.length; i++) {
        if (entities[i].id == player.id) return;

        if (entities[i].getComponent('ColliderComponent')) {
          const collider1 = player.getComponent('ColliderComponent');

          const collider2 = entities[i].getComponent('ColliderComponent');
          if (collider2 == undefined) continue;
          if (collider.IsTrigger) continue;

          var dx = collider1.x + dx - collider2.x;
          var dy = collider1.y + dy - collider2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < collider1.radius + collider2.radius) {
            movementValid = false;
          }
        }
      }
      if (movementValid) {
        player.Move(dx * player.blinkRange, dy * player.blinkRange);
      }

      player.blinkUsed = true;
      player.blinkCooldownPassed = 0;
    }
  }

  // handle Dash
  if (input.keyboard.shift) {
    if (player.dashOnCooldown) {
      player.dashCooldownPassed += step;

      if (player.dashCooldownPassed >= player.dashCooldown * 1000) {
        player.dashOnCooldown = false;
        player.dashPassedTime = 0;
      }
    }

    if (!player.dashOnCooldown) {
      // Dash Is Being Used
      if (player.dashPassedTime <= player.dashDuration * 1000) {
        player.Move(dx * player.dashSpeed, dy * player.dashSpeed);
        player.dashPassedTime += step;
        return;
      }

      player.dashOnCooldown = true;
      player.dashCooldownPassed = 0;
    }
  }

  player.Move(dx, dy);
}

server.listen(80, () => {
  console.log(`listening on *:${80}`);
});

server.on('listening', () => {
  console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});


(async function () {
  const url = await ngrok.connect();
  console.log(url);
}());
