
class BrowserUtils {
                     //http://css-tricks.com/snippets/javascript/
    constructor() {}

    public static hasBrowserHistory():boolean
    {
        return !!(window.history && history.pushState);
    }

    public static hasLocalStorage():boolean
    {
        try {
            return ('localStorage' in window) && window.localStorage !== null;
        } catch(error) {
            return false;
        }
    }

    public static hasSessionStorage():boolean
    {
        try {
            return ('sessionStorage' in window) && window.sessionStorage !== null;
        } catch(error){
            return false;
        }
    }
}