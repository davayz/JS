const EntityBehaviours = superclass => class extends superclass {
    eat(food) {
      console.log(`Eating ${food}`);
    }
}

class Animal
{
    constructor(name)
    {
        this.name = name;
        console.log(name);
    }
}


class AnimalBehavioursComposition extends EntityBehaviours(Animal){}

