class Entity
{
    constructor(name)
    {
        this.name = name;
        this.components = {};
    }

    addComponent(component)
    {
        this.components[component.name] = component;

        return this;
    }

    getComponent(componentName)
    {
        var component = this.components[componentName];
        return component;
    }

    removeComponent(componentName)
    {
        delete this.components[componentName];
    }

    print()
    {
        console.log(this.components);
    }
}

module.exports = Entity;