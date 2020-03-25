const Component = require('./Component');

class ActionPoints extends Component
{
    constructor(value, maxValue)
    {
        super();
        this.value = value;
        this.maxValue = maxValue;

        this.name = "AP";
    }
}

module.exports = ActionPoints;