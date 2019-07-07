'use strict';
 app.controller('cambiaPasswordController', ['store', '$modal', '$location', 'toaster', '$scope', '$http', '$state', '$timeout', '$cookieStore', '$rootScope', 'Idle',
	 function(store, $modal, $location, toaster, $scope, $http, $state, $timeout, $cookieStore, $rootScope, Idle) {
   
	 $scope.user={};
	   
     
     
     $scope.updatePass = function() {
     	
         if($location.search().token!=undefined&&$location.search().token.length>0){
        	 return $scope.promise =$http.post($scope.url_base+'pub/updatePassg', 
             {
                 password : $scope.user.password,
                 accion:$location.search().token,
                 estado : 1
             }
             ).success(function(rer) {                
                 if(rer.estado=="1"){                  
                     $state.go('access.signin'); 
                     toaster.pop("info", "", "Password cambiado satisfactoriamente, por favor ingrese sus credenciales", 10000, 'trustedHtml');                    
                 }else if(rer.estado=="2"){    
                     toaster.pop("info", "", "No fue posible anular el token", 10000, 'trustedHtml');                    
                     return false;
                 }else if(rer.estado=="3"){    
                     toaster.pop("error", "", "Error inesperado", 10000, 'trustedHtml');                                       
                     return false;
                 }else if(rer.estado=="4"){    
                     toaster.pop("error", "", "Error inesperado", 10000, 'trustedHtml');                    
                     return false;
                 }else if(rer.estado=="5"){    
                     $state.go('access.forgotpwd');                

                     toaster.pop("info", "", "El link ingresado no existe ,por favor ingrese su correo nuevamente y se le enviara un nuevo link, donde podra restaurar su contraseña", 10000, 'trustedHtml');                    
                     return false;
                 }else {    
                     toaster.pop("error", "", "Error inesperado", 10000, 'trustedHtml');                    
                     return false;
                 }            
             }).error(function(data) {
                 toaster.pop("error", "", "Se ha producido un error", 10000, 'trustedHtml');
             
             });
         }else{
             toaster.pop("info", "", "El link ingresado no existe ,por favor ingrese su correo nuevamente y se le enviara un nuevo link, donde podra restaurar su contraseña", 10000, 'trustedHtml');                    

         }
     }
	
	
}]);
