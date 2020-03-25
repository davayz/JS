const Component = require('./Component');

class Stats extends Component
{
    constructor(APmovementCostPerTile, expOnKill, AP)
    {
        super();
        this.APmovementCostPerTile = APmovementCostPerTile;
        this.AP = AP;
        this.maxAP = AP;

        this.expOnKill = expOnKill;

        this.exp = 0;
        this.expToLevel = 100;
        this.agroDistance = 6;

        this.name = "Stats";
    }
}

module.exports = Stats;