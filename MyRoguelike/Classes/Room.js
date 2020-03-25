function GetRandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min)) + min;
    
}

class Room
{
    constructor(x1, y1, x2, y2)
    {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;

        this.width = this.x2-this.x1;
        this.height = this.y2-this.y1;
        this.center = new Vector(this.x1 + Math.floor((this.x2-this.x1)/2), this.y1 + Math.floor((this.y2 - this.y1)/2));
    }

    randomPosition()
    {
        var x = GetRandomInt(this.x1+1, this.x2-1);
        var y = GetRandomInt(this.y1+1, this.y2-1);
        return new Vector(x,y);
    }


    findClosest(roomList)
    {
        var minLength = 0;
        var length;
        var index = 0;

        for (var i=0; i<roomList.length; i++)
        {        
            var r = roomList[i];

            if (r == this) continue;

            length = this.center.subtract(r.center).magnitude;

            if (minLength == 0)
            {
                minLength = this.center.subtract(r.center).magnitude;
                index = i;
            }

            if (length<minLength)
            {
                minLength = length;
                index = i;
            }
        }

        return roomList[index];
    }

    check(text)
    {
        var tile = new Tile(this.center.x, this.center.y, "", "", text);
        eventBus.publish("OnTileRender", tile);
    }
}

class Vector
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
        this.magnitude = Math.abs(Math.sqrt(x*x + y*y));
    }

    normalized()
    {
        var x,y;
        if (this.x != 0) x = this.x; else x=1;
        if (this.y != 0) y = this.y; else y=1;

        if (x < 0) x = -x;
        if (y < 0) y = -y;
    
        return new Vector(this.x/x, this.y/y);
    }

/*     magnitude()
    {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    } */

    subtract(vector)
    {
        return new Vector(Math.abs(this.x-vector.x), Math.abs(this.y-vector.y));
    }

    subtract1(vector)
    {
        return new Vector(this.x-vector.x, this.y-vector.y);
    }
}

module.exports = Room;
