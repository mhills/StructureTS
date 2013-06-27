///<reference path=''/>

class Util {

    constructor() {}

    public static getRandomBoolean():boolean
    {
        return (Math.random() > .5) ? true : false;
    }
}