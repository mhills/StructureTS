
class DeviceUtil {

    constructor() {}

    public static isAndroid():boolean {
        return navigator.userAgent.match(/Android/i);
    }

    public static isBlackBerry():boolean {
        return navigator.userAgent.match(/BlackBerry/i)|| navigator.userAgent.match(/BB10; Touch/);
    }

    public static isiOS():boolean {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    }

    public static isOpera():boolean {
        return navigator.userAgent.match(/Opera Mini/i);
    }

    public static isWindows():boolean {
        return navigator.userAgent.match(/IEMobile/i);
    }

    public static isMobile():boolean {
        return (DeviceUtil.Android() || DeviceUtil.BlackBerry() || DeviceUtil.iOS() || DeviceUtil.Opera() || DeviceUtil.Windows());
    }

}