const Entity = require('C:/Users/Artem.Soldatenkov/myApp/Classes/ECS/Entity');



class System
{
    constructor(componentNamesArray)
    {
        this.requiredComponents = componentNamesArray;
    }

    update(entity)
    {

        if (!this.ValidateRequiredComponents(entity, this.requiredComponents)) return false;
    }

    ValidateRequiredComponents(entity, componentNamesArray)
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
}


module.exports = System;