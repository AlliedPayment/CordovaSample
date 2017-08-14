/// <reference path='../../typings/angularjs/angular.d.ts'/>
// NOTE: follows many conventions defined by https://github.com/johnpapa/angular-styleguide
(function(config) {

    angular.module('sso', [])
        .controller('SSOCtrl', SSOCtrl)
        .filter('trustAsResourceUrl', trustAsResourceUrl);

    SSOCtrl.$inject = ['ssoService'];
    trustAsResourceUrl.$inject = ['$sce'];

    function trustAsResourceUrl($sce) {
        return function(val) {
            return $sce.trustAsResourceUrl(val);
        };
    }


    function SSOCtrl(ssoService) {
        //instance vars
        var vm = this;
        var ssoUrl = config.apiUrl + '/sso';
        //exposed api
        vm.date = new Date();
        vm.url = config.origin;

        activate();

        function activate() {
            ssoService.getData(config.ssoRequest)
                .then(
                //Success
                function(data) {
                    vm.data = data;
                    vm.jsonStr = JSON.stringify(data);
                    sso();
                }, onError);
        }



        function onError(error) {
            console.log('An Error Has Occured');
            console.log(error);
            vm.error = error;
        }

        function sso() {
            console.log('Submitting form data to ' + ssoUrl);
            ssoService.sso(ssoUrl, vm.data)
                .then(
                //Success
                function(data) {
                    console.log(data);
                    if (data.Uri) {
                        console.log('SSO success!');
                        console.log(data);
                        vm.url = data.Uri;
                    } else {
                        console.log('Error no URI in response data!');
                        console.log(data);
                        vm.error = data;
                    }
                },
                onError
                );
        }

        function reset() {
            vm.error = null;
            vm.url = config.origin;
            ssoService.getData(config.ssoRequest)
                .then(
                //Success
                function(data) {
                    vm.data = data;
                    vm.jsonStr = JSON.stringify(data);
                }, onError);
        }

    }
} (Config));
