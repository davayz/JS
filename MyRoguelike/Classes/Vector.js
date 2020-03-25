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

module.exports = Vector;