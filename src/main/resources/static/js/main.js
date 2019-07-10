'use strict';

angular.module('app')
.controller('AppCtrl', ['store','$q', 'toaster', '$modal', '$interval', '$location', '$state', '$cookieStore', '$rootScope', '$scope', '$translate', '$localStorage', '$window', '$http', 'Idle',
 function(store,$q, toaster, $modal, $interval, $location, $state, $cookieStore, $rootScope, $scope, $translate, $localStorage, $window, $http, Idle) {
     var isIE = !!navigator.userAgent.match(/MSIE/i);
            if($localStorage.accesos){
        	  $rootScope.modulos = $localStorage.accesos;     
          }
             
        $scope.ruta={};
        
     	$scope.ruta.val=window.window.location.href;
	   $scope.$watch(function(){
		   return $scope.ruta.val;
		  },function(){
	 		  });
     
     
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');      
    //  $scope.url_base="http://192.168.10.70:80/";
     $scope.url_base="http://localhost:8081/";
    //$scope.url_base="http://192.168.2.127:8081/";
   //  $scope.url_base="http://127.0.0.1:8082/";

      $scope.url_api="api/";
      $scope.services=$scope.url_base+ $scope.url_api;
      $scope.servicepub=$scope.url_base;
      $scope.cantidadderegistrosporpagina=15;
      $scope.refreshtabla = "Mostar los registros visibles";
      $scope.refreshtablasoloactivos = "Click para cargar los registros ocultos";
      $scope.nuevoregistro = "Nuevo registro";
      $scope.clickpara = "Click para ";
      $scope.guardarregistro = "  en la base de datos el registro ingresado";
      $scope.eliminarregistro = "Click para eliminar el registro";
      $scope.seleccionarregistro = "Click para seleccionar un registro del listado";
      $scope.proveedorconceptos = "Click para seleccionar los proveedores del concepto.";
      $scope.ordenescompraconceptos = "Click para seleccionar las ordenes de compra pendientes del concepto.";
      $scope.formatofechaglobal = 'dd-MM-yyyy';
      $scope.icononuevo="fa fa-plus";0
      $scope.btnnuevo = "Nuevo";
      $scope.btnexportar = "Exportar";
      $scope.btnimportar = "Importar";
      $scope.btnregresar = "Regresar";
      $scope.btnactivos = "Activos";
      $scope.btninactivos = "Inactivos";
      $scope.btnbuscar = "Buscar";
      $scope.formatofechaglobal="dd-MM-yyyy"
    	  
      $scope.sizemax=4096000;
      $scope.delay = 0;
      $scope.tamaniogen=screen.width==1024?4:screen.width==1280?10:20;
      $scope.nombremodulo="";
      $scope.minDuration = 0;
      $scope.message = '';
      $scope.backdrop = true;
      $scope.template = "themebussi.html";
      $scope.promise = null;
      $scope.app = {
        name: 'DentiHome',
        version: '2.0.1',
        // for chart colors
        color: {
            primary: '#7266ba',
            info:    '#23b7e5',
            success: '#27c24c',
            warning: '#fad733',
            danger:  '#f05050',
            light:   '#e8eff0',
            dark:    '#3a3f51',
            black:   '#1c2b36'
          },
        settings: {
          themeID: 1,
          navbarHeaderColor: 'bg-light dker',
          navbarCollapseColor: 'bg-white-only',
          asideColor: 'bg-light dker',
          headerFixed: true,
          asideFixed: false,
          asideFolded: true,
          asideDock: false,
          container: false,
          modulos:[],
          selectedClinica:0,
          selectedLocal:0
        }
      }
      
      $scope.listafiltros=[{
          id:0,
          "nombre":"Todos los registros"
      },{
          id:1,
          "nombre":"Activos"
      },{
          id:2,
          "nombre":"Inactivos"
      }]
      // save settings to local storage
      if ( angular.isDefined($localStorage.settings) ) {
        $scope.app.settings = $localStorage.settings;
      } else {
        $localStorage.settings = $scope.app.settings;
      }     
      $scope.$watch('app.settings', function(){
        if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
          // aside dock and fixed must set the header fixed.
          $scope.app.settings.headerFixed = true;
        }
        // save to local storage
        $localStorage.settings = $scope.app.settings;
      }, true);
      // retorna accesos del usuario

      $scope.cambiaLocal = function (d) {
    	  $scope.app.settings.selectedLocal=d;
    	  $state.reload();
      }
      
      $scope.retornaLocales = function () {   
    	  $http.post($scope.services + '/local/list',{"accion":"1","idclinica":$scope.app.settings.selectedClinica}).success(function (data) {
              if (data.estado == 1) {
                  $scope.locales = data.aaData;
                  if(data.aaData.length>0){
                	  $scope.app.settings.selectedLocal=data.aaData[0].idlocal;
                  }else{
                	  
                  }
              } else {
                  $state.go('access.signin');
              }
          }).error(function (data) {
          });
      }
      
      // angular translate
      $scope.lang = { isopen: false };
      $scope.langs = {en:'English', de_DE:'German', it_IT:'Italian'};
      $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
      $scope.setLang = function(langKey, $event) {
        // set the current lang
        $scope.selectLang = $scope.langs[langKey];
        // You can change the language during runtime
        $translate.use(langKey);
        $scope.lang.isopen = !$scope.lang.isopen;
      };
      
      function isSmartDevice( $window )
      {
          // Adapted from http://www.detectmobilebrowsers.com
          var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
          return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }

  }])
 //.constant('API_BASE', 'http://192.168.2.127:8081')
//.constant('services', 'http://192.168.2.127:8081/'+'api/')
//.constant('services','http://localhost:8081/'+'pub/')
 	.constant('services','https://backencuesta223.herokuapp.com/'+'pub/')
.constant('API_BASE', 'http://localhost:8081');

app.filter('setDecimal', ['$filter', function($filter) {
    return function(input, places) {
        if (isNaN(input)) return input;
        // If we want 1 decimal place, we want to mult/div by 10
        // If we want 2 decimal places, we want to mult/div by 100, etc
        // So use the following to create that factor
        var factor = "1" + Array(+(places > 0 && places + 1)).join("0");
        return Math.round(input * factor) / factor;
    };
}]);
app.directive('passwordMatch', [function() {
    return {
        restrict: 'A',
        scope: true,
        require: 'ngModel',
        link: function(scope, elem, attrs, control) {
            var checker = function() {
                var e1 = scope.$eval(attrs.ngModel);
                var e2 = scope.$eval(attrs.passwordMatch);
                if (e2 != null) return e1 == e2;
            };
            scope.$watch(checker, function(n) {
                control.$setValidity("passwordNoMatch", n);
            });
        }
    };
}]);