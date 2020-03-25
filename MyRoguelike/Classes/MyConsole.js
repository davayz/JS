class MyConsole
{
    constructor(consoleObj)
    {
        this.obj = consoleObj
    }


    log(string)
    {
        this.obj.innerText = string;
    }
}