// NOTE: follows many conventions defined by https://github.com/johnpapa/angular-styleguide

(function() {
  angular
    .module('iframe', [])
    .controller('IFrameCtrl', IFrameCtrl)
    .filter('trustAsResourceUrl', trustAsResourceUrl);

  trustAsResourceUrl.$inject = ['$sce'];

  function trustAsResourceUrl($sce) {
    return function(val) {
      return $sce.trustAsResourceUrl(val);
    };
  }

  IFrameCtrl.$inject = ['$window'];

  function IFrameCtrl($window) {
    //instance vars
    var vm = this;
    vm.url = null;

    activate();

    function activate() {
      //get URL parameter named SSO
      var ssoParam = getParameter('sso', $window.location.href);

      // set url to iframe src
      vm.url = ssoParam;
    }

   function getParameter(name, url) {
        if(!name || !url) return null;
        var key = '?' + name + '=';
        var results = url.split(key);
        return results.length > 0 ? results[1] : null;
   }
  }
})();
