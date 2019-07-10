 'use strict';
app.controller('SigninFormController', ['services','store', '$modal', '$location', 'toaster', '$scope', '$http', '$state', '$timeout', '$cookieStore', '$rootScope', 'Idle','$localStorage',
	 function(services,store, $modal, $location, toaster, $scope, $http, $state, $timeout, $cookieStore, $rootScope, Idle,$localStorage) {
   
    $rootScope.globals = {};
    
      
	
	$scope.authError = null;
    $scope.dataLoading=false;
  /*
    $scope.user={"username":"fchuquilind@gmail.com",
    "password":"admin"}*/
    $scope.user={};
    $scope.alumno={};

    
    $scope.puebaGratis=function(){
    	var modalUsers = $modal.open({
            templateUrl: 'modalUsersController.html',
            controller: 'modalUsersRegController',
            resolve: {
                service: function() {
                    return $scope.servicepub;
                },
                idval: function() {
                    return 0;
                },
                selectesempresa: function() {
                    return $scope.app.settings.selectesempresa;
                }
            }
        });
    	modalUsers.result.then(function(selectedItem) {        	                 
    		if(selectedItem==1){
    			$scope.authError="La cuenta se creo de manera satisfactoria, Hemos enviado un linc  a su correo ingresado para activar su cuenta."
    		}
        }, function() {});
    }
    $scope.retornaDatos=function(){
    	if ($scope.tok.access_token != undefined) {
        	  store.set('access_token', $scope.tok.access_token);	      
              	return $scope.promise = $http.post($scope.services + 'users/getUser').success(function (data) { 
              		       
              		if (data.estado == 1) {   
              			if(data.defaultObj.dias_disponible<6)
              			{
            			var modalPorExpirar = $modal.open({
            				templateUrl: 'myModalmodalUserPorExpirar.html'
            				, controller: 'modalUserPorExpirado', 
            				size:'sm',
            				backdrop: 'static', keyboard: false,
            				resolve: {
            					tiempo_disponible: function() {
            						return data.defaultObj.dias_disponible;
            					}          					 
            			 	}
            			});
            			modalPorExpirar.result.then(function() { 
            			}, function() {}); 
              		}			
            	      	  var fecha = new Date();
                		var d = fecha.getDate();
                		var m = fecha.getMonth() + 1;
                		var y = fecha.getFullYear();
                		var fecha= d+"/"+m+"/"+y;   
                      	$state.go('app.ui.inicio'); 
                      	
                        	$rootScope.globals = {
                	      	currentUser: {
                	            username: $scope.user.username, 
                	            iddoctor: data.defaultObj.userperfiles,
                	            authdata:  $scope.tok.token_type + " " + $scope.tok.access_token
                	          },
                	      	user:data.defaultObj
                	        };    
                	      $scope.app.settings.selectedClinica=data.defaultObj.idclinica;
                	    $scope.app.settings.selectedLocal=data.defaultObj.idlocal;
                	    $rootScope.globals.idlocal=data.defaultObj.idlocal;
                	    $rootScope.users=data.defaultObj;
                	        $cookieStore.put('globals', $rootScope.globals);   
                	        $cookieStore.put('users', $rootScope.users);  
                	      $http.post($scope.services + '/users/accesos').success(function (data) {       
                	    	    
                            if (data.estado == 1) {      
                                $scope.app.settings.modulos = data.aaData;
                            	$localStorage.accesos=undefined;
                            	$localStorage.accesos=data.aaData;
                                 $rootScope.modulos= data.aaData;
                            } else {          
                                $state.go('access.signin');
                             }
                        }).error(function (data) {   
                      	  $state.go('access.signin');
                          }); 
              			
                   } else { // user expirado por sobrepasar fecha limite
                	  $scope.dataLoading=false;
                	   if (data.estado == 3) {  
                			var modalConfirm = $modal.open({
                				templateUrl: 'myModalmodalUserExpirado.html'
                				, controller: 'modalUserExpirado', 
                				size:'sm',
                				backdrop: 'static', keyboard: false,
                				resolve: {
                					iduser: function() {
                						return data.defaultObj.id;
                					},
                					services: function() {
                						return $scope.url_base;
                					}
                			 	}
                			});
                			modalConfirm.result.then(function() {     
                				$scope.login();
                			}, function() {});
                 	   }
                	   else{
                		   if (data.estado == 4) {  
             		          toaster.pop("error", "", "La fecha actual del sistema es incorrecta,porfavor actualicela y vuelva a interlo", 100000, 'trustedHtml');
                		   	}
                	   }
                 	  $state.go('access.signin');
                 
                  }   
              }).error(function (data) {      
            	  $state.go('access.signin');
             
              });
              
          }
    }
    
    $scope.retornaAlumno = function (alumno) {   
    	     debugger
        return $http.post(services+'zigap/loginAlumno',alumno)
        .success(function (results) {      
            console.log("respuesta correo ",results);
         
            return results;
        }).error(function (results) {
            toaster.pop("error", "", "Error durante la transacciÃ³n:"+results+", codigo:0", 10000, 'trustedHtml');
            return results;
        });
    };

    
    $scope.loginAlumno=function(){
    	   
    	$scope.alumno;
    	$scope.retornaAlumno($scope.alumno).then(function(result) {   
    		if (result.data.estado == 1) {    debugger
    			 
     			
  		 	     $rootScope.users=result.data.aaData[0];
  		 	     $rootScope.lsusers=result.data.aaData;
  		 	     $rootScope.lsprograma_user=result.data.lsprograma;

          	        $cookieStore.put('users', $rootScope.users); 
          	      $cookieStore.put('lsusers', $rootScope.lsusers); 
          	        $cookieStore.put('lsprograma_user', $rootScope.lsprograma_user);  

         	    	$state.go('app.ui.inicio'); 
     
            } else { //  
    			toaster.pop("error","","El usuario no esta registrado ", 10000, 'trustedHtml');	

     	  $state.go('access.signin');
      
            } 
    		
    	})
    	 
           
     
    }

    
    $scope.login = function() {        
    	$scope.user.username="admin@gmail.com";
    	$scope.user.password="admin";
    		$scope.dataLoading=true;
    	 	$http({
            method: 'POST',
            url: $scope.url_base+'oauth/token',
            headers: {  
              "Authorization": "Basic " + btoa("clientIdPassword:secret"),
              "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
            }, 
            transformRequest: function(obj) {   
              var str = [];
              for (var p in obj) str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
              return str.join("&");
            },    
            data: {
              grant_type: "password",
              username: $scope.user.username,
              password: $scope.user.password,
              client_id: "clientIdPassword"
            }
          }).success(function(s) {          
        	  $scope.tok = s;
        	  $http.defaults.headers.post.Authorization = $scope.tok.token_type + " " + $scope.tok.access_token;
        	    
        	  $scope.retornaDatos();
        	    
		  }).error(function(s, status) {
			    $scope.authError = 'Server Error';
		        if (s == null) {
		          toaster.pop("error", "", "No existe conexión con el servidor, por favor comuniquese con su gestor de cuenta.", 10000, 'trustedHtml');
		        } else {
		        	if(s.error_description=='CUINA'){
		        		 toaster.pop("error", "Cuenta inactiva", "La cuenta se encuentra inactiva, ", 10000, 'trustedHtml');
				            $scope.dataLoading = false;
				            $scope.authError = 'Si no cuenta con el correo de activacion de la cuenta, por favor escribanos a dentifact@gmail.com ';
		        	}else{
			          if (s.error == 'unauthorized_user') {
			            toaster.pop("error", "", "Usuario no se encuentra registrado", 10000, 'trustedHtml');
			            $scope.dataLoading = false;
			            $scope.authError = 'Usuario no se encuentra registrado';
			          }
			          if (s.error == 'invalid_grant') {
			            toaster.pop("error", "", "El password ingresado es incorrecto", 10000, 'trustedHtml');
			            $scope.dataLoading = false;
			            $scope.authError = 'El password ingresado es incorrecto';
			          }
			          if (status == 0) {
			            toaster.pop("error", "", "No existe conexión con el servidor, por favor comuniquese con su gestor de cuenta.", 10000, 'trustedHtml');
			          }
		          }
		        }
		   });
      
    	 	
      
    };
  }])
;
app.controller('modalUsersRegController', ['idval', 'selectesempresa', 'service', '$modalInstance','$scope', '$http','$modal','$state','ngTableParams','$q','$filter','toaster',
	function(idval, selectesempresa, service, $modalInstance, $scope, $http,$modal,$state,ngTableParams,$q,$filter,toaster) {
	$scope.delay = 0;
    $scope.minDuration = 0;
    $scope.message = 'Procesando..';
    $scope.backdrop = true;
    $scope.template="themebussi.html";
    $scope.promise = null;
	$scope.accion=1;
    $scope.visible=false;
    $scope.accion=1;
    $scope.rucvalido=true;
    $scope.emailvalido=true;
    $scope.titulonavegacion="Prueba Gratuita";
    $scope.services=service;
    $scope.regresar = function () {
        $scope.accion=1;
        $scope.titulonavegacion="Listado de userss";
        $modalInstance.dismiss('cancel');
    };
    $scope.nuevo = function () {
        $scope.titulonavegacion="Crear nuevo users";
        $scope.users={
            "id":0,
            "ambito":2,
            "accion":0,
            "estado":true
        };   
    };  
 

  
    	$http.post($scope.services+'/pub/dep',{"accion":$scope.accion})
        .then(function(response) {           
            $scope.ubigeos=response.data.aaData;
            $scope.users.departamento=$scope.ubigeos[0].departamento;
        }, function(x) {
            toaster.pop("error", "", "No es posible conectarse con el servicio web", 10000, 'trustedHtml');
        });    	     	   
    	$scope.retonaPorRuc=function(r){
    		return $scope.promise =	$http.post($scope.services+'/pub/returnruc',{"accion":$scope.accion,"clinica":{"ruc":r}})
    	    .then(function(response) {           
    	       if(response.data.estado==1){   
    	    	   $scope.rucvalido=false; 
    	    	   toaster.pop("warning", "", "Numero de ruc de la clinica ya existe", 10000, 'trustedHtml');
    	       }else{
    	    	  $scope.rucvalido=true; 
    	       }    
    	    }, function(x) {
    	        toaster.pop("error", "", "No es posible conectarse con el servicio web", 10000, 'trustedHtml');
    	    });  
    	}
		$scope.retonaPorEmail=function(r){
			return $scope.promise =	$http.post($scope.services+'/pub/returnemail',{"accion":$scope.accion,"email":r})
		    .then(function(response) {           
		       if(response.data.estado==1){
		    	   $scope.emailvalido=false; 
		    	   toaster.pop("warning", "", "El email ingresado ya existe", 10000, 'trustedHtml');
		       }else{
		    	  $scope.emailvalido=true; 
		       }
		    }, function(x) {
		        toaster.pop("error", "", "No es posible conectarse con el servicio web", 10000, 'trustedHtml');
		    });  
		}
$scope.ini = function() {
      $scope.nuevo();
}
$scope.ini();
$scope.crud = function (val,mail) {	 	
    var modalConfirm = $modal.open({
        templateUrl: 'myModalContentConfirma.html',
        controller: 'modalctlConfirma',
        resolve: {
            item: function (
                ) {
                return $scope.users.id>0?$scope.users.id:0;
            },
            estado: function (
                ) {
                return val;
            }
            ,
            nombre: function (
                ) {
                return $scope.users.name;
            }
        }
    });
    modalConfirm.result.then(function () {
    	$scope.users.estado=1;
        return $scope.promise = $http.post($scope.services+'/pub/inserta',$scope.users)
        .then(function(response) {           
            $scope.users={};  
            if(response.data.estado==1){
                toaster.pop("success", "", response.data.msg, 10000, 'trustedHtml');
                $scope.accion=1;
                $modalInstance.close(response.data.estado);
            }else if(response.data.estado==0){
                toaster.pop("success", "", response.data.msg, 10000, 'trustedHtml');
            }else if(response.data.estado==2){
                toaster.pop("info", "",response.data.msg, 10000, 'trustedHtml');
            }else if(response.data.estado==3){
                toaster.pop("error", "",response.data.msg, 10000, 'trustedHtml');
            }else{
                toaster.pop("error", "","Error inesperado en el cliente", 10000, 'trustedHtml');
            }           
        }, function(x) {
            toaster.pop("error", "", "No es posible conectarse con el servicio web", 10000, 'trustedHtml');
        });
        
    }, function () {
        });
};
}]);
app.controller('modalUserExpirado', ['iduser','$rootScope','$scope', '$http', '$modal','$modalInstance','toaster','services',
	function(iduser,$rootScope,$scope, $http, $modal,$modalInstance,toaster,services) {
	 $scope.activacion={};
	 $scope.activacion={};
	 $scope.services=services;
     $scope.activar = function () {  
    	 $scope.activacion.iduser=iduser;    
     	 $http.post($scope.services+'pub/procesatoken',$scope.activacion)
 	    .then(function(response) {     
 	    	  if(response.data.estado==1){
 	    		  $modalInstance.close();
 	    	  }else{
 	  	        toaster.pop("error", "", "Clave incorrecta", 10000, 'trustedHtml');
 	    	  		}
 	    	
 	    }, function(x) {
 	        toaster.pop("error", "", "No es posible conectarse con el servicio web,pruebe reiniciando el navegador", 10000, 'trustedHtml');
 	    });
    	 
    	 // funcion corrobora token 
        
      };
     $scope.regresar = function () {
         $modalInstance.dismiss('cancel');
     };
	
}
]);
app.controller('modalUserPorExpirado', ['tiempo_disponible','$rootScope','$scope', '$http', '$modal','$modalInstance','toaster',
	function(tiempo_disponible,$rootScope,$scope, $http, $modal,$modalInstance,toaster) {
	 $scope.tiempo_disponible=tiempo_disponible;
  
     $scope.entiendo = function () {
    	  $modalInstance.close();
     };
	
}
]);
