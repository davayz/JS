const System = require('./System');

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