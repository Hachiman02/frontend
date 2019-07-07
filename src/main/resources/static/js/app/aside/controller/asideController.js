app.controller('asideController', function(zigapServices,services,$timeout,$state,$rootScope,$cookieStore,$scope, $http,$location,$filter,ngTableParams,servicesAside) {
   var id="lsCompany";
     
   $scope.lsClinica=[];
   $scope.lsLocal=[];
   $scope.imagenlogo={};
   debugger
    $rootScope.users = $cookieStore.get('users') || {};
    console.log("$rootScope.users ",$rootScope.users);
    
    $rootScope.lsprograma_user = $cookieStore.get('lsprograma_user') || {};
    $scope.lsPrograma=$rootScope.lsprograma_user;
    
     $scope.empresa = {
  			"nombre":"Empresa"
  				};
    $scope.usuario = {
  			"nombre":"Usuario"
  				};
    $scope.user=$rootScope.users;
    var path;
    
    cargarDatosUser= function(){
        $scope.nombreusuario1= $scope.user.nom_alumno;
        $scope.nombreusuario2=$scope.user.ape_paterno+$scope.user.ape_materno;
         /* var p = $scope.user.name.length;
        if(p>15){
      	  $scope.nombreusuario1= $scope.user.name.substr(0, 14);
      	  $scope.nombreusuario1=$scope.nombreusuario1+"-";
      	  $scope.nombreusuario2=$scope.user.name.substr(14, p-14);
         }else{
      	   $scope.nombreusuario1= $scope.user.name;
         };*/
    }
    cargarDatosUser();
    
    
    
    $scope.listarProgramas = function(){    debugger    
    	zigapServices.listarProgramas( $scope.user.id_alum)
    	.then(function(data){        debugger
  		   $scope.lsPrograma=data.aaData;
  		
  		 console.log("$scope.lsClinica ",$scope.lsClinica);
   	  });
    }
    
    
    
    
   // $scope.listarProgramas();
    
    $scope.seteaPrograma= function(){ 
        $cookieStore.put('users', $rootScope.users);  
       }
    
 
 
   
 
 
    

});

 
