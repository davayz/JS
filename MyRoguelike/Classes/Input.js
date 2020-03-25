function AssignInput(entity)
{        
    this.entity = entity;
    
    
    document.addEventListener("keypress", function onEvent(event) 
    {
        var x,y;
        if (event.key === "d" || event.code === "Numpad6") 
        {           
            dx = 1;
            dy = 0;
        }

        else if (event.key === "w" || event.code === "Numpad8") 
        { 
            dx = 0;
            dy = -1;   
        }

        else if (event.key === "a" || event.code === "Numpad4") 
        {
            dx = -1;
            dy = 0;
        }
        
        else if (event.key === "s" || event.code === "Numpad2") 
        {
            dx = 0;
            dy = 1;
        }
        
        if (event.code === "Numpad1")
        {
            dx = -1;
            dy = 1;
        }

        if (event.code === "Numpad3")
        {
            dx = 1;
            dy = 1;
        }

        if (event.code === "Numpad7")
        {
            dx = -1;
            dy = -1;
        }

        if (event.code === "Numpad9")
        {
            dx = 1;
            dy = -1;
        }

        if (dx!=undefined && dy!=undefined)
        {

            var targetX = entity.components.Position.x+dx;
            var targetY = entity.components.Position.y+dy;

            entity.addComponent(new Action(targetX, targetY));

            
           /* console.log("%c **************************************************", "background: #222; color: white");
            console.log("%c UPDATING ALL SYSTEMS !!!!","background: #00FF15; color:black;");
            console.log(entity);*/

            ecs.update();   

            console.log("%c ******************************************************  ", "background: #9BFFFD; color: white");

            //console.log(entity);
        }

        var pos = entity.components.Position;

        
        
    });
}

