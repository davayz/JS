const Component = require('./Component');

class Renderable extends Component
{
    constructor(flag)
    {
        super();
        this.flag = flag;

        this.name = "Renderable";
    }
}

module.exports = Renderable;