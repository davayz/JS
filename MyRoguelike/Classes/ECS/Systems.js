function ValidateRequiredComponents(entity, componentNamesArray)
{
    if (componentNamesArray == undefined) return true;
    let flag = true;

    componentNamesArray.forEach(function(componentName)
    {
        var component = entity.getComponent(componentName);
        if (component == undefined) 
        {
            //console.log("Component "+componentName+" not found on entity:"+entity);
            flag = false;
        }
    });

    //if (flag == true) console.log("Validation: "+"%c"+flag,"color:green;");
    //if (flag == false) console.log("Validation: "+"%c"+flag,"color:red;");
    
    return flag;
}

class System
{
    constructor(componentNamesArray)
    {
        this.requiredComponents = componentNamesArray;
    }

    update(entity)
    {
        //console.log("--------------------");
        //console.log("Validating "+"%c "+this.constructor.name+" ","background: #1177B1; color:white;");

        if (!ValidateRequiredComponents(entity, this.requiredComponents)) return false;
    }
}

class RenderSystem extends System
{
    constructor(components,tileSize)
    {
        super(components);
        this.tileSize = tileSize;
    }

    update(entity)
    {
        if (super.update(entity) == false) return;  

        var position = entity.components.Position;
        var sprite = entity.components.Sprite;

        //if (position.x == position.prevX && position.y == position.prevY) return;     
        

        if (entity.components.Visible.flag == false)
        {
            this.renderFalse(position);
            return;
        }
        else
        {            
        ///MAIN LOGIC
            this.renderPrevPosition(position);

            this.renderCurrentPosition(position, sprite);
        }
    }

    renderFalse(position)
    {
        var x = position.x; var y = position.y;
        ctx.fillStyle = "black";
        ctx.fillRect(x*this.tileSize, y*this.tileSize - this.tileSize/2 -3, this.tileSize, this.tileSize);
        ctx.fillStyle = "#ffffff";

        var tile = world.tiles[x][y];

        if (tile.visibility == 1)
        {
            eventBus.publish("OnTileRender", tile);
        }
    }

    renderPrevPosition(position)
    {
        if (position.prevX == undefined || position.prevY == undefined) return;

        var x = position.prevX; var y = position.prevY;
        ctx.fillStyle = "black";
        ctx.fillRect(x*this.tileSize, y*this.tileSize - this.tileSize/2 -3, this.tileSize, this.tileSize);
        ctx.fillStyle = "#ffffff";
        
        var tile = world.tiles[x][y];

        if (tile.visibility == 1)
        {
            eventBus.publish("OnTileRender", tile);
        }
    }

    renderCurrentPosition(position, sprite)
    {        
        ctx.fillStyle = sprite.color;
        ctx.fillText(sprite.sprite, position.x*this.tileSize, position.y*this.tileSize);
        ctx.fillStyle = "#ffffff";
    }
}


class MovementSystem extends System
{
    update(entity)
    {
        if (super.update(entity) == false) return;

        var pos = entity.components.Position;

        if (pos.x == pos.targetX && pos.y == pos.targetY)
        {
            pos.prevX = pos.x;
            pos.prevY = pos.y;

            entity.components.Position = pos;
            return;
        }

        if (pos.targetX == undefined || pos.targetY == undefined) return;

        pos.prevX = pos.x;
        pos.prevY = pos.y;

        pos.x = pos.targetX;
        pos.y = pos.targetY;

        entity.components.Position = pos;

        
    }

}

//???????????
class WorldSystem extends System
{
    constructor(components,world)
    {
        super(components);
        this.world = world;
    }

    update(entity)
    {
        if (super.update(entity) == false) return;

        var position = entity.components.Position;

        
        if (position.x == undefined || position.y == undefined) return;

        //if (position.prevX == position.x && position.prevY == position.y) return;

        if (position.prevX != undefined && position.prevY != undefined)
        {
            var prevActionTile = this.world.getTileAt(position.prevX, position.prevY);
            prevActionTile.occupied = false;
            prevActionTile.SetEntity(undefined);

            this.world.setTile(prevActionTile);
        }

        var currentTile = this.world.getTileAt(position.x, position.y);   
        currentTile.occupied = true;        
        currentTile.SetEntity(entity);

        this.world.setTile(currentTile);
    }
}




class FieldOfViewSystem extends System
{
    constructor(components) 
    {
        super(components);
        this.prevTurnEntitiesInFoV = [];
        this.currentTurnEntitiesInFoV = [];
    }
    
    update(entity)
    {
        if (super.update(entity) == false) return;
        
        var position = entity.components.Position;
        this.prevTurnEntitiesInFoV = [];
        this.prevTurnEntitiesInFoV = this.currentTurnEntitiesInFoV;
        
        //entity.addComponent(new EntitiesInFoV(this.currentTurnEntitiesInFoV));

        if (entity.getComponent("EntitiesInFoV")!=undefined)
        {
            entity.components.EntitiesInFoV.array = this.currentTurnEntitiesInFoV;
        }
        
        this.DisplayFoV(position);

        var entitiesNotInFoV = this.prevTurnEntitiesInFoV.diff(this.currentTurnEntitiesInFoV);
        
        /*console.log("PREV TURN FOV: "+this.prevTurnEntitiesInFoV);
        console.log("CURR TURN FOV: "+this.currentTurnEntitiesInFoV);
        console.log("DIFF: "+entitiesNotInFoV);*/

        entitiesNotInFoV.forEach(function(entity)
        {
            entity.components.Visible.flag = false;
        });
    }

    DisplayFoV(position)
    {
        var i = 1;
        var x = position.x;
        var y = position.y;

        var fovTiles = 6;

        this.currentTurnEntitiesInFoV = [];
    
        for (var x1 = x-fovTiles; x1 <= x+fovTiles; x1++)
        {
            for (var y1 = y-fovTiles; y1 <= y+fovTiles; y1++)
            {
                if (x1 == x && y1 == y) continue;               
                var tile = world.getTileAt(x1,y1);
                
                if (tile == undefined) continue;

                if (tile.occupied)
                {
                    var entityOnTile = tile.GetEntity();
                    entityOnTile.components.Visible.flag = true;

                    console.log("VISIBILITY CHANGED");

                    this.currentTurnEntitiesInFoV.push(entityOnTile);

                }

                tile.visibility = 1;

                eventBus.publish("OnTileRender", tile);

                if (tile.object != undefined)
                {
                    tile.object.visibility = 1;
                } 
            }
        }
    }
}


class AISystem extends System
{ 
    constructor(components) 
    {
        super(components);
    }

    update(entity)
    {
        if (super.update(entity) == false) return;

        var position = entity.components.Position;

        var player = entities[0];
        var playerPos = player.components.Position; playerPos = new Vector(playerPos.x, playerPos.y);        
        var stats = player.components.Stats;
        //Object.setPrototypeOf(position, playerPos);
        //var distance = playerPos.subtract(position);

        //var distance = new Vector(position.x, position.y).subtract(playerPos);

        console.log(position);
        console.log(playerPos);

        //var distance = new Vector(position.x - playerPos.x, position.y - playerPos.y);
        var distance = playerPos.subtract1(position);
        console.log(distance);


        if (distance.magnitude <=stats.agroDistance)
        {
            console.log("chaseenbaled");
            var action = this.ChaseAction(position, distance);

            console.log(action);
            console.log(position);
            console.log(entity);

            entity.addComponent(action);

            return;
        }


        //randomMovement
        if (entity.getComponent("Walker") != undefined)
        {
            var action = this.ActionToAvailableTile(entity);

            entity.addComponent(action);

            return;
            
        }
    }

    ActionToAvailableTile(entity)
    {
        var direction = world.getAvailableDirection(entity);
        return new Action(direction.x,direction.y);
    }

    ChaseAction(position, distance)
    {
        var direction = distance.normalized();
        console.log("*******");
        console.log("DIRECTION:");
        console.log(direction);
        console.log("*******");
        var actionVector = new Vector(position.x+direction.x, position.y+direction.y);

        var tile = world.getTileAt(actionVector.x, actionVector.y);

        if (tile.walkable == false)
        {
            tile = world.getTileAt(actionVector.x, position.y);
        }

        if (tile.walkable == false)
        {
            tile = world.getTileAt(position.x,actionVector.y);
        }

        console.log(tile);

        return new Action(tile.x, tile.y);
    }
}

class ActionSystem extends System
{
    constructor(components)
    {
        super(components);
    }

    update(entity)
    {
        if (super.update(entity) == false) return;


        var action = entity.components.Action;

        //IF NO AUTO-ACTION IS POSSIBLE - //// remove Action Component????
        var tile = world.getTileAt(action.x, action.y);

        



        if (!this.IsValid(tile))
        {
            debug.log("Action is not Valid");

            entity.removeComponent("Action");
            return;
        }
        
        //check for BasicAttackAction
        if (tile.occupied)
        {
            var entityTarget = tile.GetEntity();
            if ((entityTarget.components.Type.type == "P" && entity.components.Type.type == "E") || (entityTarget.components.Type.type == "E" && entity.components.Type.type == "P"))
            {
                var damage = CalculateFinalDamageToHealth(entity,entityTarget);
                console.log(entityTarget+" damaged for "+ damage+" dmg");
                entityTarget.components.Health.value -= damage;               


                entity.removeComponent("Action");
            }

            return;
        }

        //check for BasicMovementAction
        if (!tile.occupied)
        {
            if (tile.walkable)
            {                
                var pos = entity.components.Position;
                pos.targetX = action.x;
                pos.targetY = action.y;

                entity.components.Position = pos;
                entity.removeComponent("Action");
            }
        }        
    }

    IsValid(tile)
    {
        if (tile == undefined) return false;

        if (!tile.walkable && !tile.interactible) return false;

        return true;
    }
}

class UISystem extends System
{
    constructor(components, posConsole,  mainConsole)
    {
        super(components);

        this.posConsole = posConsole;
        this.mainConsole = mainConsole;
    }

    update(entity)
    {
        if (super.update(entity) == false) return;

        var pos = entity.components.Position;

        this.posConsole.log(pos.x+" "+pos.y);

        var entitiesInFoV = entity.getComponent("EntitiesInFoV");

        console.log("%c UI UPDATE", "background:#242;");
        console.log(entitiesInFoV);

        /*if (entitiesInFoV != undefined)
        {
            entitiesInFoV.forEach(function(entity)
            {
                mainConsole.log(entity.name+" spotted!");
            });
        }*/

        if (entitiesInFoV != undefined)
        {
            for (var i = 0; i < entitiesInFoV.length; i++)
            {
                mainConsole.log(entity.name+" spotted!");
            }
        }
        
    }
}

class MainSystem extends System
{
    constructor(components)
    {
        super(components);
    }
    update(entity)
    {
        if (super.update(entity) == false) return;

    }
}



function UpdateOtherSystems(entity)
{
    movementSystem.update(entity);
    worldSystem.update(entity);
    if (entity.components.Type.type == "P") fieldOfViewSystem.update(entity);
    renderSystem.update(entity);
}

function UpdateOtherEntities()
{
    for (var i=1; i<entities.length; i++)
    {
        aiSystem.update(entities[i]);
    }
}



