app.factory("zigapServices", ['$modal','$http','toaster','$q','services', function($modal,$http,toaster,$q,services) {
    // ruta del backend en 'services'
	services;
    var obj = {};
    
 
 

  
  obj.validarCorreo = function ( lsAlumno_programa) {   
	  
      return $http.post(services+'zigap/validarcorreo', {"lsAlumno_programa":lsAlumno_programa})
      .success(function (results) {   
          console.log("respuesta correo ",results);
       
          return results;
      }).error(function (results) {
          toaster.pop("error", "", "Error durante la transacciÃ³n:"+results+", codigo:0", 10000, 'trustedHtml');
          return results;
      });
  };
  
  
  obj.actualizaAlumno = function (alumno,lsalum) {   debugger
	  console.log("alumno 1", alumno);
  		var alum={};
  		alum.ape_materno=alumno.ape_materno;
  		alum.ape_paterno=alumno.ape_paterno;
  		alum.cod_alumno=alumno.cod_alumno;
  		alum.id_alum=alumno.id_alum;
  		alum.dni_m=alumno.dni;
  		alum.telefono_movil=alumno.telefono_movil;
  		alum.telefono=alumno.telefono;
  		alum.domicilio_actual=alumno.domicilio_actual;
  		alum.correo_personal=alumno.correo_personal;
  		alum.correo=alumno.correo;
  		alum.nac_fecha=alumno.nac_fecha;
  		alum.lsalum=lsalum;

  	  console.log("alumno 2", alum);

  		 
  
  
      return $http.post(services+'zigap/actualizaAlumno',alum)
      .success(function (results) {   
          console.log("actualiza alumno ",results);
       
          return results;
      }).error(function (results) {
          toaster.pop("error", "", "Error durante la transacciÃ³n:"+results+", codigo:0", 10000, 'trustedHtml');
          return results;
      });
  };

  obj.listarProgramas = function ( id_alum) {   
	  debugger
	  var alumno={};
	  alumno.id_alum=id_alum;
      return $http.post(services+'zigap/lsprograma',alumno)
      .success(function (results) {   
          console.log("respuesta programa ",results);
       
          return results;
      }).error(function (results) {
          toaster.pop("error", "", "Error durante la transacciÃ³n:"+results+", codigo:0", 10000, 'trustedHtml');
          return results;
      });
  };
  
  
  
  
  obj.ListarProducto = function () {
//	  producto.idempresa = 1;
      return $http.post(services+'productos/retornaAllProductos', {"accion":""})
      .success(function (results) { 
          
          if(results.estado=="1"){
              toaster.pop("success", "", "TransacciÃ³n ejecutada correctamente", 10000, 'trustedHtml');
          }else if(results.estado=="0"){
              toaster.pop("error", "", "Error durante la transacciÃ³n:"+results.accion+", codigo:0", 10000, 'trustedHtml');
          }else if(results.estado=="2"){
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
  
  
  
  
  obj.retornaProductocompañia = function () {
//	  producto.idempresa = 1;
      return $http.post(services+'productos/retornaProductocompañia', {"accion":""})
      .success(function (results) { 
          
          if(results.estado=="1"){
              toaster.pop("success", "", "TransacciÃ³n ejecutada correctamente", 10000, 'trustedHtml');
          }else if(results.estado=="0"){
              toaster.pop("error", "", "Error durante la transacciÃ³n:"+results.accion+", codigo:0", 10000, 'trustedHtml');
          }else if(results.estado=="2"){
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
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  obj.insertarproducto = function (producto) { debugger
	  producto.accion='';
      return $http.post(services+'productos/insertaProd', producto)
      .success(function (results) { debugger
          
          if(results.estado=="1"){
              toaster.pop("success", "", "TransacciÃ³n ejecutada correctamente", 10000, 'trustedHtml');
          }else if(results.estado=="0"){
              toaster.pop("error", "", "Error durante la transacciÃ³n:"+results.accion+", codigo:0", 10000, 'trustedHtml');
          }else if(results.estado=="2"){
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
  
  obj.actualizarproducto = function (producto) { debugger
	  producto.accion='';
      return $http.post(services+'productos/actualizarProd', producto)
      .success(function (results) { debugger
          
          if(results.estado=="1"){
              toaster.pop("success", "", "TransacciÃ³n ejecutada correctamente", 10000, 'trustedHtml');
          }else if(results.estado=="0"){
              toaster.pop("error", "", "Error durante la transacciÃ³n:"+results.accion+", codigo:0", 10000, 'trustedHtml');
          }else if(results.estado=="2"){
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
  
  
  
  
  
  
  
  obj.eliminarproducto = function (producto) { debugger
	  producto.accion='';
      return $http.post(services+'productos/eliminaProducto', producto)
      .success(function (results) { debugger
          
          if(results.estado=="1"){
              toaster.pop("success", "", "TransacciÃ³n ejecutada correctamente", 10000, 'trustedHtml');
          }else if(results.estado=="0"){
              toaster.pop("error", "", "Error durante la transacciÃ³n:"+results.accion+", codigo:0", 10000, 'trustedHtml');
          }else if(results.estado=="2"){
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
  
  
  
  
  
  
  
  
  
obj.lsprograma = function () {   
     return $http.post(services+'zigap/lsprograma', {"estado":1})
      .success(function (results) {   
          console.log("lsprograma ",results);
           return results;
      }).error(function (results) {
          toaster.pop("error", "", "Error durante la transacciÃ³n:"+results+", codigo:0", 10000, 'trustedHtml');
          return results;
      });
  };
  
 obj.lsAlumno_programa = function () {   
	  
      return $http.post(services+'zigap/lsalumnoprograma', {"estado":1})
      .success(function (results) {   
          console.log("lsAlumno_programa ",results);
       
          return results;
      }).error(function (results) {
          toaster.pop("error", "", "Error durante la transacciÃ³n:"+results+", codigo:0", 10000, 'trustedHtml');
          return results;
      });
  };
  
 obj.lsAlumno_programa2 = function (total,cantidad,idprograma) {   
	   return $http.post(services+'zigap/lsalumnoprograma', 
    		  {"estado":1,
		   		"offset":total,
		   		"limit":cantidad,
		   		"id_programa":idprograma
    		  })
       .success(function (results) {   
          console.log("lsAlumno_programa2 ",results);
       
          return results.data;
      }).error(function (results) {
          toaster.pop("error", "", "Error durante la transacciÃ³n:"+results+", codigo:0", 10000, 'trustedHtml');
          return results.data;
      });
  };
    
return obj;

}]);




	