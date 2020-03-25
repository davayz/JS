function ValidateRequiredComponents(entity, componentNamesArray) {
    if (componentNamesArray == undefined) return true;
    let flag = true;

    componentNamesArray.forEach(function (componentName) {
        var component = entity.getComponent(componentName);
        if (component == undefined) {
            flag = false;
        }
    });

    return flag;
}

class System {
    constructor(componentNamesArray) {
        this.requiredComponents = componentNamesArray;
    }

    update(entity) {
        //console.log("--------------------");
        //console.log("Validating "+"%c "+this.constructor.name+" ","background: #1177B1; color:white;");

        if (!ValidateRequiredComponents(entity, this.requiredComponents)) return false;
    }
}

class MoveTowardsComponent {
    constructor(x, y) {
        this.x=x;
        this.y=y;
        /*console.log(x,y);
        this.x=x;
        this.y=y;*/
        
        this.name = "MoveTowardsComponent";
    }
}

class ProjectileComponent {
    constructor(x,y)
    {
        this.x=x;
        this.y=y;
        
        this.name = "ProjectileComponent";
    }
}

class ProjectileSystem extends System {
    constructor(componentNamesArray) {
        super(componentNamesArray);
    }

    update(entity) {
        if (!ValidateRequiredComponents(entity, this.requiredComponents)) return false;

        var projectileComponent = entity.getComponent("ProjectileComponent");
        entity.Move(projectileComponent.x, projectileComponent.y);
    }
}

class MoveTowardsSystem extends System {
    constructor(componentNamesArray) {
        super(componentNamesArray);
    }

    update(entity) {
        if (!ValidateRequiredComponents(entity, this.requiredComponents)) return false;
        var moveTowardsComponent = entity.getComponent("MoveTowardsComponent");
        entity.MoveTowards(moveTowardsComponent.x, moveTowardsComponent.y);
    }
}

module.exports = Entity;