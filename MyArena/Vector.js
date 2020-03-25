class Vector
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }

    normalize()
    {
        var length = Math.sqrt(this.x*this.x+this.y*this.y);
        var invlength = 1/length;

        this.x*=invlength;
        this.y*=invlength;
    }

    magnitude()
    {
        return Math.sqrt(this.x*this.x+this.y*this.y);
    }
}

module.exports = Vector;