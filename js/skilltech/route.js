angular.module('skilltech.routes', [])

.config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {

    $ionicConfigProvider.views.transition('none');
    $stateProvider
    //Login Details 
        .state('home', {
        cache: false,
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl',
        })
    .state('projects', {
        cache: false,
        url: '/projects',
        templateUrl: 'templates/projects.html',
        controller: 'projectCtrl'
        })
     .state('viewprojects', {
        cache: false,
        url: '/viewprojects',
        templateUrl: 'templates/project_details.html',
        controller: 'projectDetailsCtrl',
         params: {
                projectName: [],
             indxid:[]
            }
        })
     .state('contact', {
        cache: false,
        url: '/contact',
        templateUrl: 'templates/contact.html',
        controller: 'HomeCtrl',
        })
    .state('tutorial', {
       // cache: false,
        url: '/tutorial',
        templateUrl: 'templates/tutorial.html'
        })
    .state('tutorialDetails', {
       // cache: false,
        url: '/tutorialDetails',
        templateUrl: 'templates/tutorial_details.html'
        })
    $urlRouterProvider.otherwise('/home');
})



    //$urlRouterProvider.otherwise(function ($injector, $location) {
    //    var names = window.location.search;
    //    var hash = window.location.hash;
    //    if (names != "") {
    //        var re = /\s*=\s*/;
    //        var nameList = names.split(re);
    //        if (nameList[0] === "?industryHome" && nameList[1] != "") {
    //            var id = parseInt(nameList[1]);
    //            return '/industryHome/' + id;
    //        }
    //        else {
    //            return '/home';
    //        }
    //    }
    //    else {
    //        return '/home';
    //    }
    //})
