class Entity {
    constructor(id, x, y, movementSpeed, sprite, img) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.movementSpeed = movementSpeed;
        this.sprite = sprite;
        this.img = img;
        this.blinkRange = 48;
        this.blinkCooldown = 2;
        this.blinkCooldownPassed = 0;
        this.blinkUsed = false;

        this.dashDuration = 1.5;
        this.dashCooldown = 2;
        this.dashCooldownPassed = 0;
        this.dashOnCooldown = false;
        this.dashSpeed = 4;
        this.dashPassedTime = 0;

        this.components = {};
    }

    addComponent(component) {
        this.components[component.name] = component;

        return this;
    }

    getComponent(componentName) {
        var component = this.components[componentName];
        return component;
    }

    removeComponent(componentName) {
        delete this.components[componentName];
    }

    Move(x, y) {
        this.x += x * this.movementSpeed;
        this.y += y * this.movementSpeed;
    }

    MoveTowards(x, y) {

        if (this.x == x && this.y == y) return;

        var direction = new Vector(x-this.x, y-this.y);

        if (direction.magnitude() <= this.movementSpeed)
        {
            this.x=x;
            this.y=y;
            return;
        }

        direction.normalize();
        
        this.x += direction.x * this.movementSpeed;
        this.y += direction.y * this.movementSpeed;
    }

    Render() {
        ctx.drawImage(this.sprite, this.x, this.y, this.sprite.width, this.sprite.height);
    }
}


class Vector
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }

    normalize()
    {
        var length = Math.sqrt(this.x*this.x+this.y*this.y);
        var invlength = 1/length;

        this.x*=invlength;
        this.y*=invlength;
    }

    magnitude()
    {
        return Math.sqrt(this.x*this.x+this.y*this.y);
    }
}

module.exports = Entity;