const System = require('./System');
const Turn = require('../Components/Turn');

//???????????
class TurnSystem extends System
{
    constructor(components)
    {
        super(components);
    }

    update(entity, entity2)
    {
        if (super.update(entity) == false) return;

        entity.removeComponent("Turn");

        entity2.addComponent(new Turn());


        //IF NO POSSIBLE ACTIONS AVAILABLE -- HOW TO GET THAT?????????????????
        //REMOVE TURN COMPONENT

    }
}

module.exports = TurnSystem;