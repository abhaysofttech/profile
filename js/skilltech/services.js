angular.module('skilltech.services', [])

    .factory('SkilltechService', function ($http, $state, $q, $ionicLoading, $timeout, $ionicPopup, $rootScope, $window) {
        var projectsCache = {};
        var JsonCache = {};

        function getAllData() {
            var deferred = $q.defer();
            $http({
                    method: 'GET',
                    url: "js/skilltech/projects.json",
                    headers: {
                        "Accept": "application/json;odata=verbose"
                    }
                })
                .success(function (response) {
                    projectsCache["projects"] = response.projects;
                    for (var i = 0; i < response.projects.length; i++) {
                        if (response.projects[i]) {
                            try {
                                jsonObtained = response.projects[i];
                            } catch (e) {
                                console.log(e); // error in the above string (in this case, yes)!
                                jsonObtained = undefined;
                                //console.log('There is a JSON error in SKitJSONStoreV41UAT list at contentID -- ' + response.d.results[i].content_id);
                            }
                        }
                        if (jsonObtained) {
                            JsonCache[response.projects[i].projectName] = response.projects[i];
                        }

                    }
                    deferred.resolve(JsonCache);
                }, function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function getJsonFile(contentId) {
            return JsonCache[contentId];
        }

        function getJsonData() {
            return projectsCache;
        }
        return {
            getAllData: getAllData,
            getJsonFile: getJsonFile,
            getJsonData: getJsonData

        }


    })