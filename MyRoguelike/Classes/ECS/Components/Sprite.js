const Component = require('./Component');

class Sprite extends Component
{
    constructor(sprite,color)
    {
        super();
        this.sprite = sprite;
        this.color = color;
        if (color == undefined) this.color = "white";

        this.name = "Sprite";
    }
}

module.exports = Sprite;