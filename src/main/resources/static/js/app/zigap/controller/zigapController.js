app.controller('zigapController',['$scope', '$http','$rootScope','ngTableParams','$cookieStore','$location',
	'$filter','ngTableParams','zigapServices','$q','$modal','toaster', function($scope, $http, $rootScope,ngTableParams,
		$cookieStore, $location, $filter, ngTableParams, zigapServices, $q,
		$modal, toaster) {
	 debugger
	$scope.obj={};
	$scope.lsAlumno_programa={};
	$scope.programa={};
	$scope.lsproducto = [];  
	$scope.producto={};
	$scope.lsempresa=[{"razon_social":"nissan"},{"razon_social":"nike"},{"razon_social":"samsung"}];
    $rootScope.users = $cookieStore.get('users') || {};
    $rootScope.lsusers = $cookieStore.get('lsusers') || {};

    
    $scope.user= $rootScope.users;
    
    
    $scope.actualizaAlumno=function(){  debugger
  	  console.log("alumno 2", $scope.user);

    	zigapServices.actualizaAlumno($scope.user,$rootScope.lsusers).then(function(result) {
           debugger 
    		
    		toaster.pop("success", "", result.data.msg, 10000, 'trustedHtml');

     		 
    		}, function(result) {
    			// something went wrong
    			return $q.reject(result.data);
    		});;
    	
    	
    	}
    
	/*$scope.validarCorreo=function(){  
	zigapServices.validarCorreo($scope.lsAlumno_programa).then(function(result) {
			   
				 $scope.lsAlumno_programa = result.data.aaData;
		 
		}, function(result) {
			// something went wrong
			return $q.reject(result.data);
		});;
	
	
	}*/
	/*
	$scope.crud = function() {
		debugger
		if($scope.producto.codpro==null){
			toaster.pop("error","","INGRESE El CODIGO DE PRODUCTO", 10000, 'trustedHtml');
		}else{
		$modalInstance.close($scope.producto);
		}
	}*/
	
	/*
	$scope.listarProducto = function() {
		debugger
		zigapServices.ListarProducto().then(function(result) {

			if (typeof result.data === 'object') {
				debugger
				$scope.lsproducto = result.data.aaData;

			} else {
				// invalid response
				return $q.reject(result.data);
			}
		}, function(result) {
			// something went wrong
			return $q.reject(result.data);
		});
	}
	$scope.listarProducto();*/
	
	/*$scope.retornaProductocompañia = function() {
		debugger
		zigapServices.retornaProductocompañia().then(function(result) {
			
			if (typeof result.data === 'object') {
				debugger
				$scope.lsproducto = result.data.aaData;
				console.log("compañia", $scope.lsproducto);
			} else {
				// invalid response
				return $q.reject(result.data);
			}
		}, function(result) {
			// something went wrong
			return $q.reject(result.data);
		});
	}*/
	
	
	
	
	
	
	
	
	/*
	
	// ----eliminar marca
	$scope.eliminaMarca = function(index) {
		debugger
		console.log("marca", $scope.producto);
		for (var i = 0; i < $scope.lsproducto.length; i++) {
			if ($scope.lsproducto[i] == $scope.lsproducto[index]) {
				$scope.producto = $scope.lsproducto[i];
				break;
			}
		}
		zigapServices.eliminarproducto($scope.producto).then(function(result) {
			$scope.producto = result.data.defaultObj;
			$scope.listarProducto();

		}, function(result) {
			// something went wrong
			return $q.reject(result.data);
		});

	}
	*/
	
	
	/*
	
	// ----actualizar marca
	$scope.actualizarMarca = function(producto) {
		debugger
		var modalMarca = $modal.open({
			templateUrl : 'modalnuevoMarca.html',
			controller : 'modalzigapController',
			size : 'md',
			resolve : {
				objMarca : function() {
					debugger
					return producto;
				}
			}
		});
		modalMarca.result.then(function(producto) {
			zigapServices.actualizarproducto(producto).then(function(result) {
				$scope.listarProducto();
				 
			});

		}, function() {
			$scope.producto={};
		});
	}
	
	*/
	
	
	/*
	
	$scope.nuevaMarca = function() {
		debugger
		var modalMarca = $modal.open({
			templateUrl : 'modalnuevoMarca.html',
			controller : 'modalzigapController',
			size : 'md',
			resolve : {
				objMarca : function() {
					return $scope.producto;
				}
			}
		});
		modalMarca.result.then(function(producto) {
			zigapServices.insertarproducto(producto).then(function(result) {
				$scope.retornaProductocompañia();
				$scope.producto={};
			});
		}, function() {
			$scope.retornaProductocompañia();
			
		});

	}
	*/
	/*
	
	   $scope.tableParamsAlumno = new ngTableParams({
	        page: 1,            // show first page
	        count:$scope.cantidadderegistrosporpagina,          // count per page
	        sorting: {
	            name: 'asc'     // initial sorting
	        }
	    }, {
	        getData: function ($defer, params) {   
	            
	                if(params.page()==1){    debugger
	                	var a =params.count();
	                 zigapServices.lsAlumno_programa2((params.page() * params.count())-params.count(),params.count(),$scope.programa.id_programa).then(function(data){  
	                        var filteredData = params.filter() ?
	                        $filter('filter')(data.data.aaData, params.filter()) 
	                        : data.data.aaData;
	                        var orderedData = params.sorting() ?
	                        $filter('orderBy')(filteredData, params.orderBy()) 
	                        : filteredData;                    
	                        $scope.obj = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
	                        params.total(data.data.defaultObj.count);
	                       $defer.resolve($scope.obj);
	                       $scope.lsAlumno_programa=data.data.aaData;
	                
	                    });
	                }else{  
	                   	zigapServices.lsAlumno_programa2((params.page() * params.count())-params.count(),params.count(),$scope.programa.id_programa).then(function(datac){                      
	                		$scope.lsAlumno_programa=datac.data.aaData;
	                		$defer.resolve(datac.data.aaData);
	                    });
	                 }
	     }
	    }, function (error) {   
	        console.log('errror', error);
	    });
	   
   $scope.listarAlumnos= function(){
	   $scope.tableParamsAlumno.reload();
     }
   
	$scope.lsprograma=function(){  
	zigapServices.lsprograma().then(function(result) {
	if (typeof result.data === 'object') {
			  
			 $scope.lsprograma = result.data.aaData;
	} else {
			// invalid response
			return $q.reject(result.data);
		}
	}, function(result) {
		// something went wrong
		return $q.reject(result.data);
	});
	}
	
	$scope.seleccionar= function(index){debugger
		$scope.lsAlumno_programa;
	}
	
     /*
 	$scope.lsAlumno_programa=function(){  
 	zigapServices.lsAlumno_programa().then(function(result) {
 	if (typeof result.data === 'object') {
 			  
 			 $scope.lsAlumno_programa = result.data.aaData;
 	} else {
 			// invalid response
 			return $q.reject(result.data);
 		}
 	}, function(result) {
 		// something went wrong
 		return $q.reject(result.data);
 	});
 	}*/
////////////////////////////////////////////////////////////////////////  	
   /* $scope.login = function() {  
     	$scope.user={};
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
               username: "admin@gmail.com",
               password: "admin",
               client_id: "clientIdPassword"
             }
           }).success(function(s) {
         	   
         	  $scope.tok = s;
               if ($scope.tok.access_token != undefined) { 
             	   
         $http.defaults.headers.post.Authorization = $scope.tok.token_type + " " + $scope.tok.access_token;
    /*  $http.post($scope.services + 'users/login', $scope.user)
            .then(function(response) {    
         	    
                   if (response.data.estado == '1') {
                 	   
          	  $scope.val = response.data.defaultObj; 
          	 
        // SetCredentials($scope.val.email, $scope.val.nombres +($scope.tok.token_type + " " + $scope.tok.access_token),$scope.val.password);
        store.set('access_token', $scope.tok.access_token);
              $http.defaults.headers.post.Authorization = $scope.tok.token_type + " " + $scope.tok.access_token;
           
            
               }
            }) */

              /* }
               
              /* $scope.tableParamsAlumno.reload();
               $scope.lsprograma();
            //   $scope.lsAlumno_programa();
 		  }).error(function(s, status) {
 			    $scope.authError = 'Server Error';
 		        if (s == null) {
 		          toaster.pop("error", "", "No existe conexión con el servidor, por favor comuniquese con su gestor de cuenta.", 10000, 'trustedHtml');
 		        } else {
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
 		   });

       
     };
      $scope.login();*/
}]);

app.controller('modalzigapController',['$scope', '$http','$rootScope','ngTableParams','$cookieStore','$location',
	'$filter','ngTableParams','zigapServices','$q','$modalInstance','$modal','toaster','objMarca', function($scope, $http, $rootScope,ngTableParams,
		$cookieStore, $location, $filter, ngTableParams, zigapServices, $q,$modalInstance,
		$modal, toaster,objMarca) {
	$scope.producto={};
	$scope.lsproducto = [];
	$scope.lsempresa=[{"razon_social":"nissan"},{"razon_social":"nike"},{"razon_social":"samsung"}];
	angular.copy(objMarca, $scope.producto);
	debugger

	
	/*$scope.listarProducto = function() {
		debugger
		zigapServices.ListarProducto().then(function(result) {

			if (typeof result.data === 'object') {
				debugger
				$scope.lsproducto = result.data.aaData;

			} else {
				// invalid response
				return $q.reject(result.data);
			}
		}, function(result) {
			// something went wrong
			return $q.reject(result.data);
		});
	}
	$scope.listarProducto();*/
	/*
	$scope.retornaProductocompañia = function() {
		debugger
		zigapServices.retornaProductocompañia().then(function(result) {
			
			if (typeof result.data === 'object') {
				debugger
				$scope.lsproducto = result.data.aaData;
				console.log("compañia", $scope.lsproducto);
			} else {
				// invalid response
				return $q.reject(result.data);
			}
		}, function(result) {
			// something went wrong
			return $q.reject(result.data);
		});
	}
	$scope.retornaProductocompañia();
	
	*/
	/*
	$scope.crud = function() {
		debugger
		if($scope.producto.codpro==null){
			toaster.pop("error","","INGRESE El CODIGO DE PRODUCTO", 10000, 'trustedHtml');
		}else{
		$modalInstance.close($scope.producto);
		}
	}
	
	$scope.regresar = function() {
		$modalInstance.dismiss('cancel');
	}
	*/
	
}]);
 