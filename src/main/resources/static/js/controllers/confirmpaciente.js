'use strict';
app.controller('PacienteFormController', ['store', '$modal', '$location', 'toaster', '$scope', '$http', '$state', '$timeout', '$cookieStore', '$rootScope', 'Idle',
	 function(store, $modal, $location, toaster, $scope, $http, $state, $timeout, $cookieStore, $rootScope, Idle) { 
    debugger
	$scope.authError = null;
    $scope.dataLoading=false;
    $scope.ruta={};
    $rootScope.globals = {};
     $scope.login = function() {debugger
    	   window.open("http://192.168.1.123/#/access/formpaciente","lineadecodigo","directories=yes, location=yes, menubar=yes, scrollbars=yes, statusbar=yes, tittlebar=yes, width=1800, height=1800");
    	//$state.go('access.formpaciente');
    }
  }]);