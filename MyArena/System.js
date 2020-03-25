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

module.exports = System;