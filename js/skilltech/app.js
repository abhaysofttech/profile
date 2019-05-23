var app = angular.module('skilltech', ['ionic', 'skilltech.routes','skilltech.services','ngSanitize']);
app.run(function($ionicPlatform, $rootScope, $window, $location, $state,SkilltechService) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        // if (window.cordova && window.cordova.plugins.Keyboard) {
        //     cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // }
        SkilltechService.getAllData().then(function (result) {
		 console.log(result);
		});
        
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

    });
 

})
app.controller('HomeCtrl', function($ionicPlatform, $compile, $scope, $ionicModal, $state, $q, $rootScope, $http, $window, $location) {


});
app.controller('projectCtrl',function($ionicPlatform, $compile, $scope, $ionicModal, $state, $q, $rootScope, $http, $window, $location,SkilltechService){
       $ionicPlatform.ready(function() {
       var projectData =  SkilltechService.getJsonData();
       $scope.projects = projectData.projects;
        if($scope.projects == undefined){
            $state.go('home');
        }   
           
      $scope.projectDetails = function(a,b){
                console.log(a,b)

      }

       })
});
app.controller('projectDetailsCtrl',function($ionicPlatform, $compile, $scope, $sce,$ionicModal, $state, $q, $rootScope, $http, $window,$stateParams, $location,SkilltechService){
      console.log($stateParams.projectName);
    $scope.trustAsHtml = function(content) {
                        return $sce.trustAsHtml(content);
                    }
      var allProjectData =  SkilltechService.getJsonData();
     var projectData =  SkilltechService.getJsonFile($stateParams.projectName);
       $scope.project = projectData;
    
      if ($stateParams.indxid == 0) {
            $scope.previousProjectData = allProjectData.projects[allProjectData.projects.length - 1];
            $scope.preindex = 2;
            $scope.nextProjectData = allProjectData.projects[1];
            $scope.nextindex = 1;
  
        } else if ($stateParams.indxid == allProjectData.projects.length - 1) {
            $scope.previousProjectData = allProjectData.projects[allProjectData.projects.length - 2];
            $scope.preindex = 1;
            $scope.nextProjectData = allProjectData.projects[0];
            $scope.nextindex = 0;
        } else {
            $scope.previousProjectData = allProjectData.projects[$stateParams.indxid - 1];
            $scope.preindex = $stateParams.indxid - 1;
            $scope.nextProjectData = allProjectData.projects[$stateParams.indxid + 1];
            $scope.nextindex = $stateParams.indxid + 1;
        }
});
