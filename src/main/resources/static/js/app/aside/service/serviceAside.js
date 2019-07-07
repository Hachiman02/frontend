app.factory("servicesAside", ['$http','toaster','services', function($http,toaster,services) {
    // ruta del backend en 'services'
    var obj = {};
        
   obj.listarClinicas= function () {  
       return $http.post(services+'clinica/retornaClinicaTodas',{"accion":1}).then(function (response) {
               if (typeof response.data === 'object') {
                   return response.data;
               } else {
                   // invalid response
               
               }
           }, function (response) {
               // something went wrong
               
           });
   };  
   
   obj.retornalogo= function (user) {   debugger
	     if(user!=null){
           return $http.post(services+'/clinica/retornalogo',user).then(function (response) { 
               if (typeof response.data === 'object') {   
                   return response.data;
               } else {
                   // invalid response
                   return response.data;
               }
           }, function (response) {
               // something went wrong
               return response.data;
           });
       }
   };
   
   
   obj.listarLocal= function (idclinica) {  
       return $http.post(services+'local/retornaLocalPorClinica',
    		   {"accion":1,
    		     "idclinica":idclinica}).then(function (response) {
               if (typeof response.data === 'object') {
                   return response.data;
               } else {
                   // invalid response
               
               }
           }, function (response) {
               // something went wrong
               
           });
   }; 
    
  obj.getModels= function (accion) {

        if(accion==1){
            return $http.post('/appappla/company/list').then(function (response) {
                if (typeof response.data === 'object') {
                    return response.data;
                } else {
                    // invalid response
                  
                }
            }, function (response) {
                // something went wrong
             
            });
        }
        if(accion==2){
            return $http.post('/appappla/company/listTodos').then(function (response) {
                if (typeof response.data === 'object') {
                    return response.data;
                } else {
                    // invalid response
                 
                }
            }, function (response) {
                // something went wrong
                
            });
        }
    };      // 
    obj.crudCompany = function (company) {
        return $http.post('/appappla/company/inserta/', company)
        .success(function (results) {    
            
            if(results.accion=="1"){
                toaster.pop("success", "", "TransacciÃ³n ejecutada correctamente", 10000, 'trustedHtml');
            }else if(results.accion=="0"){
                toaster.pop("error", "", "Error durante la transacciÃ³n:"+results.accion+", codigo:0", 10000, 'trustedHtml');
            }else if(results.accion=="2"){
                toaster.pop("info", "", "Sin acceso al sistema", 10000, 'trustedHtml');
            }else{
                toaster.pop("error", "", "Error durante la transacciÃ³n:"+results.accion+", codigo:0", 10000, 'trustedHtml');
            }
            return results;
        }).error(function (results) {
            toaster.pop("error", "", "Error durante la transacciÃ³n:"+results+", codigo:0", 10000, 'trustedHtml');
            return results;
        });
    };
   
 
    return obj;
}]);