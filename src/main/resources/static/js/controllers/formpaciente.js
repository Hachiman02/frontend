'use strict';
  app.controller('formPacienteController', ['store', '$modal','$location', 'toaster', '$scope', '$http', '$state', '$timeout', '$cookieStore', '$rootScope', 'Idle',
	 function(store, $modal,$location, toaster, $scope, $http, $state, $timeout, $cookieStore, $rootScope, Idle) {
	 
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		$scope.cit={};
		var idlocal=31;
		$scope.end=false;
		$scope.precision = 400;
		$scope.lastClickTime = 0;
		$scope.seldoctor=0;
		$scope.selestado=0;
		$scope.doctores=[];
		
		//$scope.servicepub="http://192.168.1.109:8082/";
		$scope.servicepub="http://127.0.0.1:8082/";

		function CompararFechas(Fecha1)
		{  
			var f=new Date(Fecha1).addHours(5);		
			var CDate = new Date(f);
			
			var Hoy = new Date();//Fecha actual del sistema
		
			if (CDate < Hoy){
			   d=1;
			}
			else{
			    if (Fecha1 == Hoy){
			        d=0;
			    }
			    else{
			        d=0;
			    }
			}
			return d;
		}
		  
	    $http.post($scope.servicepub+'/pub/listdoct',{"accion":1})
	    .then(function(response) {            
	        $scope.doctores=response.data.aaData;
	    });
	
		$scope.Finish=function(){
			//state.go('access.confirmpaciente');
			windows.close;
		};
				
		
		$scope.alertOnEventClick = function(event, jsEvent, view) {
			if(!$scope.end){
			if($scope.cit.iddoctor!=undefined){
				if(CompararFechas(event)==0){
				var modalEvent = $modal.open({
					templateUrl: 'Modalformpaciente.html',
					controller: 'modalformpaciente',
					size:'lg',
					backdrop: 'static', keyboard: false,
					resolve: {
						service: function() {
							return $scope.servicepub;
						},
						idval: function() {
							return event.id;
						},
						selectedLocal: function() {
							return $scope.app.settings.selectedLocal;
						},
						idlocal: function() {
							return idlocal;
						},	
						date: function() {
							return event;
						},						
						estado: function() {
							return 1;
						},
						iddoctor: function() {
							return $scope.cit.iddoctor;
						}
					}
				});
			 	modalEvent.result.then(function() {          
					$scope.end=true;      
					$scope.retornaData();
					
				}, function() {
					
				});
			}else{
				toaster.pop("info", "","La fecha de la solicitud es pasada", 10000, 'trustedHtml');
			}
			}
			else{
				toaster.pop("info", "","Seleccione primero a un doctor", 10000, 'trustedHtml');
			}
		}else{
		}
			
	}
		
		
		$scope.overlay = $('.fc-overlay');		
		
		Date.prototype.addHours= function(h){
		    this.setHours(this.getHours()+h);
		    return this;
		}

		$scope.events = [];
		
		
		$scope.retornaData = function() {
			$http.post($scope.servicepub + '/pub/citaslist', {
				"accion": 1,
				"idlocal":idlocal,
				"iddoctor":$scope.cit.iddoctor,
				"estado":0
			}).then(function(response) {     
 				var events = [];
			var apellido_paterno,apellido_materno;
				var arr = $scope.events.slice(0, $scope.events.length);	        
		        $scope.events.splice(0, $scope.events.length);
				angular.forEach(response.data.aaData, function(event, key) {
					if(event.paciente.apepat==undefined){
						apellido_paterno='';
					}else{
						apellido_paterno=event.paciente.apepat;
					}
					if(event.paciente.apemat==undefined){
							apellido_materno='';
						}else{
							apellido_materno=event.paciente.apemat;
						}
				 	$scope.events.push({
						id: event.idcitasmedicas,
						//title: event.paciente.nombre + ' ' + apellido_paterno + ' ' + apellido_materno,
						start: event.inicio,
						end: event.fin,      
						info: event.comentarios,
						className:'bg-dark',
						doctor: event.doctor.nombres,
						startEditable:false,
						color: 'bg-dark'
					});
				});
			}, function(x) {
				toaster.pop("error", "", "No es posible conectarse con el servicio web", 10000, 'trustedHtml');
			});			
		}
		
		$scope.eventSources = [$scope.events, $scope.retornaData];
		
		$scope.uiConfig = {  
			calendar: {
				height: 450,
				timezone: "America/Lima",
				editable: true,
				header: {
					left: 'prev',
					center: 'title',
					right: 'next'
				},
				dayClick: $scope.alertOnEventClick,
				eventDrop: $scope.alertOnDrop,
				minTime: "08:00:00",
				maxTime: "21:00:00",
				lang: 'es',
				defaultView: 'agendaWeek',
				eventResize:$scope.alertOnResize,
				eventMouseover: $scope.alertOnMouseOver,
				loading: function(bool) {
					$('#loading').toggle(bool);
				},
				viewSubSlotLabel: true,
				allDaySlot: false,
				nowIndicator: true,
				slotDuration: '00:15:00',
				slotLabelInterval: '00:15:00',
				slotLabelFormat: 'HH:mma',
				timeFormat: 'HH:mma',
				slotEventOverlap: false, // Overlap de eventos
				displayEventTime: true,
				selectable: true,
				selectHelper: true,
				editable: false,
				eventClick: function(event, jsEvent, view) {
					event.color="bg-primary lter";
		 			}		
			}
		};
		$scope.uiConfig.calendar.dayNames = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Saturday"];
		$scope.uiConfig.calendar.dayNamesShort = ["Dom", "Lun", "Mar", "Mier", "Juev", "Vier", "Sab"];
		/* add custom event*/
		/* Change View */
		$scope.changeView = function(view, calendar) {    
			$('.calendar').fullCalendar('changeView', view);
		};
		$scope.today = function(calendar) {
			$('.calendar').fullCalendar('today');
		};
		$scope.changeView('agendaWeek'); 
  }]);
  app.controller('modalformpaciente', ['store','$modalInstance','idval','idlocal','date','iddoctor','$modal','service','$location', 'toaster', '$scope', '$http', '$state', '$timeout', '$cookieStore', '$rootScope', 'Idle',
		 function(store,$modalInstance,idval,idlocal,date,iddoctor,$modal,service,$location, toaster, $scope, $http, $state, $timeout, $cookieStore, $rootScope, Idle) {
 	  $scope.servicepub=service;
	  $scope.authError = null;
	    $scope.dataLoading=false;
	    var hora = 0;
	    $scope.cita={};
	    $scope.cita.iddoctor=iddoctor;    
	    $scope.cita.fecha=date._i[2]+'-'+(date._i[1]+1)+'-'+date._i[0];
		if(date._i[4]==0 && date._i[3]<10){
	    $scope.cita.horas='0'+date._i[3]+':'+date._i[4] + '0';
	    }else{
	    	if(date._i[3]<10){
	    	$scope.cita.horas='0'+date._i[3]+':'+date._i[4];
	    	}else{
	    		if(date._i[4]==0){
	    			$scope.cita.horas=date._i[3]+':'+date._i[4] + '0';
	    		}else{
	    			$scope.cita.horas=date._i[3]+':'+date._i[4]
	    		}
	    	}
	    }
		var minutos = 0;
		var horarini = ""
		var reshorafin;	    
	    $scope.regresar = function() {
	    	$modalInstance.dismiss('cancel');
	    }
	    
	    var numeros=["0","1","2","3","4","5","6","7","8","9"];
	    
	    $scope.validarnum=function(e){   
	    	var key=e;
	    	var cval=false;
	    	var tmp=key.substring(0,(key.length-1));
	    	if(key.length>0 && key!=''){
	    		for(var i=0;i<numeros.length;i++){
	    			if(key[key.length-1]==numeros[i]){    				
	    				cval=true;
	    				i=i+numeros.length;
	    				}else{
	    					cval=false;	    				
	    				}
	    			}
	    		if(!cval){
	    			toaster.pop("error", "", "Caracter invalido. Favor ingrese solo números.", 10000, 'trustedHtml');
    				$scope.cita.numero=tmp;
	    		}
	    		}
	    	}
	    $scope.validarcel=function(e){   
	    	var key=e;
	    	var cval=false;
	    	var tmp=key.substring(0,(key.length-1));
	    	if(key.length>0 && key!=''){
	    		for(var i=0;i<numeros.length;i++){
	    			if(key[key.length-1]==numeros[i]){    				
	    				cval=true;
	    				i=i+numeros.length;
	    				}else{
	    					cval=false;	    				
	    				}
	    			}
	    		if(!cval){
	    			toaster.pop("error", "", "Caracter invalido. Favor ingrese solo números.", 10000, 'trustedHtml');
    				$scope.cita.numerocelular=tmp;
	    		}
	    		}
	    	}
	    
	    $scope.validarnom=function(e){
	    	var key=e;
	    	var tmp=key.substring(0,(key.length-1));
	    	if(key.length>0 && key!=''){
	    		for(var i=0;i<numeros.length;i++){
	    			if(key[key.length-1]==numeros[i]){
	    				toaster.pop("error", "", "Caracter invalido. Favor ingrese solo letras.", 10000, 'trustedHtml');
	    				$scope.cita.nombres=tmp;
	    				i=i+numeros.length;
	    				}
	    			}
	    		}
	    	}
	    $scope.validarape=function(e){
	    	var key=e;
	    	var tmp=key.substring(0,(key.length-1));
	    	if(key.length>0 && key!=''){
	    		for(var i=0;i<numeros.length;i++){
	    			if(key[key.length-1]==numeros[i]){
	    				toaster.pop("error", "", "Caracter invalido. Favor ingrese solo letras.", 10000, 'trustedHtml');
	    				$scope.cita.apellido=tmp;
	    				i=i+numeros.length;
	    				}
	    			}
	    		}
	    	}
	    
	    $scope.crud = function(val, mail) {		
	    	  
			var modalConfirm = $modal.open({
				templateUrl: 'myModalContentConfirma.html',
				controller: 'modalctlConfirma',
				resolve: {
					item: function() {
						return $scope.cita.idcitasmedicas > 0 ? $scope.cita.idcitasmedicas : 0;
					},
					estado: function() {
						return val;
					},
					nombre: function() {
						return $scope.cita.nombre;
					}
				}
			});
			modalConfirm.result.then(function() {
				  
				
				$scope.cita.fecha=date._i[0]+'/'+(date._i[1]+1)+'/'+date._i[2];
				
				var cita={
						"estado":1,
						"accion":1,
						"nombres":$scope.cita.nombres,
						"correo":$scope.cita.correo,
						"numero":$scope.cita.numero,
						"fecha":$scope.cita.fecha,
						"horas":$scope.cita.horas,
						"iddoctor":$scope.cita.iddoctor,
						"idlocal":idlocal,
				}
				return $scope.promise = $http.post($scope.servicepub + "/pub/insertasol", cita).then(function(response) {  
					$scope.cita = {};
					if (response.data.estado == 1) {
						  $modalInstance.close();
						toaster.pop("success", "", response.data.msg, 10000, 'trustedHtml');
					}
					else if (response.data.estado == 0) {
						toaster.pop("success", "", response.data.msg, 10000, 'trustedHtml');
					}
					else if (response.data.estado == 2) {
						toaster.pop("info", "", response.data.msg, 10000, 'trustedHtml');
					}
					else if (response.data.estado == 3) {
						toaster.pop("error", "", response.data.msg, 10000, 'trustedHtml');
					}
					else {
						toaster.pop("error", "", "Error inesperado en el cliente", 10000, 'trustedHtml');
					}
				}, function(x) {
					toaster.pop("error", "", "No es posible conectarse con el servicio web", 10000, 'trustedHtml');
				});
			}, function() {});
		};
	  
  }]);