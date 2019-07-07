'use strict';

// signup controller
app.controller('activacuentaController', ['$location','toaster','$scope', '$http', '$state','$stateParams','$rootScope','$cookieStore','Idle',
    function($location,toaster,$scope, $http, $state,$stateParams,$rootScope,$cookieStore,Idle) {   
        $scope.user={};
            if($location.search().token!=undefined&&$location.search().token.length>0){
                $http.post( $scope.url_base+'/pub/activacuenta', 
                {                   
                    accion:$location.search().token,
                    estado : 1
                }
                ).success(function(rer) {                
                    if(rer.estado=="1"){                  
                        $state.go('access.signin'); 
                        toaster.pop("success", "Activación de cuenta!", "Su cuenta fue activada satisfactoriamente, por favor ingrese sus credenciales", 10000, 'trustedHtml');                    
                    }else if(rer.estado=="2"){    
                        toaster.pop("info", "Activación de cuenta!", "No fue posible anular el token", 10000, 'trustedHtml');                    
                        return false;
                    }else if(rer.estado=="3"){    
                        toaster.pop("error", "Activación de cuenta!", "Error inesperado", 10000, 'trustedHtml');                                       
                        return false;
                    }else if(rer.estado=="4"){    
                        toaster.pop("error", "Activación de cuenta!", "Error inesperado", 10000, 'trustedHtml');                    
                        return false;
                    }else if(rer.estado=="5"){    
                        $state.go('access.forgotpwd');                

                        toaster.pop("warning", "Activación de cuenta!", "El link ingresado no existe ,por favor ingrese su correo nuevamente y se le enviara un nuevo link, donde podra restaurar su contraseña", 10000, 'trustedHtml');                    
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
       
      
    }])
;