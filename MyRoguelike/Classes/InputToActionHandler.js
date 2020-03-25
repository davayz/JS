const Action = require('./ECS/Components/Action');

class InputToActionHandler
{
    constructor()
    {

    }
    
    handle(entity, inputString)
    {
        var dx, dy;

        switch (inputString) {
            case "up":
                dx = 0;
                dy = -1;
                break;

            case "left":
                dx = -1;
                dy = 0;
                break;

            case "down":
                dx = 0;
                dy = 1;
                break;

            case "right":
                dx = 1;
                dy = 0;
                break;

            default:
                return false;
        }        
        
            var targetX = entity.components.Position.x + dx;
            var targetY = entity.components.Position.y + dy;

            entity.addComponent(new Action(targetX, targetY));
            return true;

    }
}    

module.exports = InputToActionHandler;

