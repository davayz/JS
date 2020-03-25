const Component = require('./Component');

class Health extends Component
{
    constructor(value)
    {
        super();
        if (value == void 0)
        {
            this.value = 100;
        }
        else
        {
            this.value = value;
        }
        this.name = "Health";
    }
}

module.exports = Health;
