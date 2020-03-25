const Component = require('./Component');

class EntitiesInFoV extends Component
{
    constructor(array)
    {
        super();

        this.array = [];
        if (array != undefined) this.array = array;

        this.name = "EntitiesInFoV";
    }
}


module.exports = EntitiesInFoV;