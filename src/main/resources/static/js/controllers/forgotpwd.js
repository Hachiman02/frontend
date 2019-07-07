'use strict';

app.controller('forgotpwdController', ['store', '$modal', '$location', 'toaster', '$scope', '$http', '$state', '$timeout', '$cookieStore', '$rootScope', 'Idle',
	 function(store, $modal, $location, toaster, $scope, $http, $state, $timeout, $cookieStore, $rootScope, Idle) {
   
	$scope.resetPassword=function(email){
		
		 return $scope.promise =$http.post($scope.url_base+'pub/resetpassword',{"email":email})
        .then(function(response) { 
        	if(response.data.estado==1){
        		toaster.pop("success","Restauración de contraseña" ,"Su solicitud ha sido recibida y le hemos enviado un correo. Por favor revise su bandeja de entrada o su bandeja de spam." , 10000, 'trustedHtml');
        		$state.go('access.signin')
        	}else{
        	if(response.data.estado==3){
        		toaster.pop("warning","Cuenta inactiva" ,response.data.msg , 10000, 'trustedHtml');
        	}
        	if(response.data.estado==0){
        		toaster.pop("warning","Cuenta no existe" ,response.data.msg , 10000, 'trustedHtml');
        	}
        	}
        }, function(x) {
            toaster.pop("error", "", "No es posible conectarse con el servicio web", 10000, 'trustedHtml');
        }); 
	}
	
	
}]);
