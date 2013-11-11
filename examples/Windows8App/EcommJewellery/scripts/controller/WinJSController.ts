///<reference path='../_declare/winjs.d.ts'/>
///<reference path='../_declare/winrt.d.ts'/>

///<reference path='../com/codebelt/structurets/controller/BaseController.ts'/>
///<reference path='../com/codebelt/structurets/events/LoaderEvent.ts'/>
///<reference path='../com/codebelt/structurets/events/TimerEvent.ts'/>
///<reference path='../com/codebelt/structurets/utils/Timer.ts'/>

///<reference path='../utilities/App.ts'/>
///<reference path='../utilities/Gesture.ts'/>
///<reference path='../services/GPJConnectService.ts'/>
///<reference path='../services/LocationService.ts'/>
///<reference path='../repositories/ModelLineRepository.ts'/>
///<reference path='../repositories/ModelColorMapRepository.ts'/>
///<reference path='../repositories/ColorRepository.ts'/>
///<reference path='../repositories/SpecCategoryRepository.ts'/>
///<reference path='../repositories/AccoladeRepository.ts'/>
///<reference path='../repositories/AccessoryRepository.ts'/>
///<reference path='../repositories/StickerRepository.ts'/>

var Application = WinJS.Application;
var Activation = Windows.ApplicationModel.Activation;
var Navigation = WinJS.Navigation;

/**
 * YUIDoc_comment
 *
 * @class WinJSController
 * @extends BaseController
 * @constructor
 **/
class WinJSController extends BaseController {

    public CLASS_NAME:string = 'WinJSController';

    private _timer:Timer = null;
    private _sonarTimer:Timer = null;

    constructor() {
        super();


        // Begin executing setup operations.
        this.performSetupTasks();

        // Retrieve splash screen object.
//        var splash = eventArgs.detail.splashScreen;

        // Hide wrapper until done loading
//        $('.wrapper').hide();

        WinJS.UI.processAll();
    }


    performSetupTasks() {
        Gesture.initialize();

        var self = this;

        //Load All data for app, then go home
        this.applicationLoad().done(this.allDataLoaded.bind(this), this.handleLoadError.bind(this));

//        this.applicationLoad().done(function () {
//console.log("done")
            // Setup Attractor Video
//            self._timer = new Timer(App.settings.attractorLoopTimeout * 1000, 1);
//            self._timer.addEventListener(TimerEvent.TIMER_COMPLETE, self.onTimerComplete, self);
//
//            self._sonarTimer = new Timer(App.settings.sonarTimeout * 1000, 0);
//            self._sonarTimer.addEventListener(TimerEvent.TIMER, self.onSonarTimer, self);
//            self._sonarTimer.start();
//
//            _attractView = new AttractView();
//            _attractView.setVideoPath(App.settings.attractorVideoPath);
//            _videoContainer = document.getElementById("js-videoContainer");
//            _videoContainer.addEventListener("mousedown", hideVideo, false);
//
//            _mainNav = new MainNavView();
//
//            document.addEventListener("click", handleDocumentClick, false);
//
//            var modelLineCollection = ModelLineCollection.getInstance();
//            modelLineCollection.initializeData(ModelLineRepository);
//
//            if (Debug.isDebugBuild) {
//                Debug.initialize();
//            }
//
//            if (App.settings.stickerModel) {
//                Navigation.navigate(URL.MODEL_LINE_DETAIL, { modelId: App.settings.stickerModel });
//            } else {
//                Navigation.navigate(URL.HOME);
//            }
//
//            removeExtendedSplash();



//        }, this.handleLoadError.bind(this));

    }

    private allDataLoaded() {
        console.log("allDataLoaded");

        var modelLineCollection = ModelLineCollection.getInstance();
        modelLineCollection.initializeData(ModelLineRepository);

        this.dispatchEvent(new LoaderEvent(LoaderEvent.LOAD_COMPLETE));
    }

    onSonarTimer(event:TimerEvent) {
        var date = new Date();
        GPJConnectService.sendSonarSignal().done(function (success) {
            if (success) {
                //console.log(date.toLocaleTimeString() + " SONAR: Success");
            } else {
                //console.log(date.toLocaleTimeString() + " SONAR: Failure");
            }
        }, function (error) {
            if (error && error.message) {
                //console.log(date.toLocaleTimeString() + " SONAR: Error: " + error.message);
            }
        });
    }

    removeExtendedSplash() {
        $('#extendedSplashScreen').hide();
        $('.wrapper').show();
    }

    /*----------------[ Public Methods ]--------------------------*/


//    Default.updateAttractorTimeout = function (milliseconds) {
//    _timer.setDelay(milliseconds);
//}
//
//    Default.startAttractorTimer = function () {
//    _timer.start();
//}
//
//    Default.stopAttractorTimer = function () {
//    _timer.stop();
//}
//
//    Default.setAttractorVideo = function (filepath) {
//    _attractView.setVideoPath(filepath);
//}
    /*----------------[ Private Methods ]--------------------------*/


    handleLoadError(error) {
        //TODO: Handle multiple errors
        //Flatten out all of the error arrays into one array;
        var errorArray = _.flatten(error).filter(function (obj) { return obj != undefined });
        var message = new Windows.UI.Popups.MessageDialog(errorArray[0].message);
        message.commands.append(new Windows.UI.Popups.UICommand("Exit", function () {
            window.close();
        }));
        message.showAsync();
    }

    applicationLoad() {
        return WinJS.Promise.join([
            ModelLineRepository.initializeData().then(this.handleModelLinesLoad.bind(this)),
            LocationService.Init(),
            ModelColorMapRepository.initializeData(),
            GPJConnectService.initializeData(),
            App.initialize(),
            ColorRepository.initializeData(),
            SpecCategoryRepository.initializeData().then(this.handleSpecsLoad.bind(this))
        ])
    }

    handleModelLinesLoad() {
        var modelLines = ModelLineRepository.getAllModelLines();
        return ModelRepository.initializeData().then(this.handleCarModelsLoad.bind(this));
    }

    handleCarModelsLoad() {
        var models = ModelRepository.getAllModels();
        return WinJS.Promise.join([
            AccoladeRepository.initializeData(models),
            TrimRepository.initializeData(models).then(function()
            {
                var trims = TrimRepository.getAllTrims();
                return StickerRepository.initializeData(trims)
            }),
            AccessoryRepository.initializeData(models)
        ]);
    }

    handleSpecsLoad() {
        var specCategories = SpecCategoryRepository.getAllCategories();
        return SpecRepository.initializeData(specCategories);
    }

    onTimerComplete(event:TimerEvent) {
        console.log("onTimerComplete")
        if (App.settings.mode === "handheld") {
//            _timer.stop();
//            hideVideo();
        }
        else {
//            _timer.stop();
//            _attractView.show();
        }
    }

    hideVideo() {
//        _attractView.hide();

        //On hiding of video, check if we need to go to Admin screen
        if (!GPJConnectService.checkLogin()) {
//            _timer.stop();
//            Navigation.navigate("/views/admin/admin.html");
        }
        else {
//            _timer.start();
        }
    }

    handleDocumentClick(event) {
        var correctGesture = Gesture.checkGesture({ x: event.clientX, y: event.clientY });
        if (correctGesture) {
//            _timer.stop();
//            Navigation.navigate("/views/admin/admin.html", { step: 1 });
        }
        else {
//            if (_timer.running)
//                _timer.reset();
        }
    }

}


