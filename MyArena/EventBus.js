class EventBus
{
    constructor()
    {
        this.subscribers = {};
    }

    subscribe(subName, object, handler)
    {
        if (!this.subscribers[subName]) this.subscribers[subName] = [];

        this.subscribers[subName].push({object: object, handler: handler});
    }

    publish(subName, eventArgs)
    {
        if (!this.subscribers[subName]) return;

        const sub = this.subscribers[subName];

        sub.forEach( sub => sub.handler.call(sub.object, eventArgs) );
    }
}

module.exports = EventBus;