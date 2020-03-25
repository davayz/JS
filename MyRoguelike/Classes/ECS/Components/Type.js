const Component = require('./Component');

class Type extends Component
{
    constructor(type)
    {
        super();
        this.type = type;

        this.name = "Type";
    }
}


module.exports = Type;