class FOV
{
    constructor(obj, tiles)
    {
        this.obj = obj;
        this.tiles = tiles;
    }

    update()
    {
        for (var x = 1; x <= 4; x++)
        {
            tiles[this.obj.x + x][this.obj.y].visibility = "true";
            if (tiles[this.obj.x + x][this.obj.y] == "wall") break;
        }
        for (var x = 1; x <= 4; x++)
        {
            tiles[this.obj.x - x][this.obj.y].visibility = "true";
            if (tiles[this.obj.x - x][this.obj.y] == "wall") break;
        }
        for (var y = 1; y <= 4; y++)
        {
            tiles[this.obj.x][this.obj.y+y].visibility = "true";
            if (tiles[this.obj.x][this.obj.y+y] == "wall") break;
        }
        for (var y = 1; y <= 4; y++)
        {
            tiles[this.obj.x][this.obj.y-y].visibility = "true";
            if (tiles[this.obj.x][this.obj.y-y] == "wall") break;
        }
    }
}
