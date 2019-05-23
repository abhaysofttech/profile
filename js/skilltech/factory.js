angular
    .module('core', [])
    .factory('MyModal', MyModal);
MyModal.$inject = ['$ionicModal', '$rootScope'];

function MyModal($ionicModal, $rootScope) {
    var $scope = $rootScope.$new(),
        myModalInstanceOptions = {
            scope: $scope,
            focusFirstInput: true
        };
    var myModal = {
        open: open
    };
    return myModal;

    function open() {
        $ionicModal.fromTemplateUrl(
            'templates/video-modal.html',
            myModalInstanceOptions
        ).then(function(modalInstance) {
            $scope.closePlayer = function() {
                if (myPlayer != null)
                    myPlayer.pause();
                myPlayer.dispose();
                closeAndRemove(modalInstance);
            };
            return modalInstance.show();
        });
    }

    function closeAndRemove(modalInstance) {
        return modalInstance.hide()
            .then(function() {
                return modalInstance.remove();
            });
    }


}