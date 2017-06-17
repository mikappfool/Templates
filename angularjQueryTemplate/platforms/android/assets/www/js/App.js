angular.module('App', ['ngCordova'])
    .controller('MainController', function($scope) {
        var debugging = false,
            log = console.log;
        
        $scope.menuIsOpen = false;
        $scope.appDetails {
            'title':'TITLE_HERE!'
        }

        //
        // After resource-loading, start the app :)
        //
        var initializeApp = function() {
            log('App is Ready!');

        }
        // On-device ::Back button:: pressed
        // close app, back one nav, etc.
        // handle navigation buttons here - target = (android 4.4 ~ 6.1)
        var backPressed = 0;
        var handleOnBackButton = function(e) {
            backPressed++;
            e.preventDefault();

            setTimeout(function(){
                backPressed = 0;
            },1000);

            if ($scope.menuIsOpen){
                $("#menu").fadeOut();
                $scope.menuIsOpen = false;
            } else {
                var r = confirm("Are you sure you want to exit?");
                if (r == true) {
                    navigator.app.exitApp();
                }
            }
            if (backPressed > 1){
                    navigator.app.exitApp();
            }
        }












        var loadJSDependencies = function() {
            log('Loading Resource Dependencies...');
            var scriptsToLoad = [
                //'js/libs/ng-cordova.min.js',
                'js/libs/cordova.js',
                'js/libs/permissions.js'
            ];
            for (var i in scriptsToLoad){
                var url = scriptsToLoad[i];
                var fileref = document.createElement('script');

                fileref.setAttribute('type', 'text/javascript');
                fileref.setAttribute('src', url);
                $('head').append(fileref);
                log('[ ' + url + ' ] loaded');
            }
        };

        var init = function() {
            if (typeof cordova === typeof 'undefined'){
                
                loadDummyData();//log('loading dummy data');
            } else {
                if (!debugging){
                    initializeApp();    
                }
                
            }
        }

        $(document).ready(function() {
            if (debugging){
                loadDummyData();

            } else {
                // load up cordova, and startup the app
                loadJSDependencies();
                init();

            }


            // helps resolve an issue with document selector and drag events, pulls into overflow area 
            // which shouldnt be scrollable to
            var docWidth = document.documentElement.offsetWidth;
            [].forEach.call(
              document.querySelectorAll('*'),
              function(el) {
                if (el.offsetWidth > docWidth) {
                  log(el);
                }
              }
            );

            // At this point, screen elements are loaded
            //   TODO: either have listeners fire at start
            //         -or attach handlers directly to el handles
            //         
            // initNavListeners();// init listeners for app elements

            // do document ready stuff
        }).on('deviceready', function() {
            // do deviceready stuff, put all calls to plugins in here
            document.addEventListener("backbutton", handleOnBackButton, false);

            if (!debugging){
                // Fire Startup events here
            }
        });





        // the end...
    });










