'use strict';
/**
 * Config for the router
 */
angular.module('app').run(
    ['$rootScope', '$state', '$stateParams', '$location', '$cookieStore', '$http',
        function($rootScope, $state, $stateParams, $location, $cookieStore, $http) {
    	      
    	$rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = $rootScope.globals.currentUser.authdata; // jshint
            $http.defaults.headers.common['Content-Type'] = 'text/html; charset=iso-8859-1';
            // ignore:line
        }
           
        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            // redirect to login page if not
            // logged in and trying to
            // access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/access/registrate', '/access/precing', '/access/actpass','/access/activacuenta', '/access/asistencia',
                '/access/permisos', '/access/signin', '/access/signup', '/access/regcorrecto', '/access/forgotpwd','/access/confirmpaciente','/access/formpaciente',
                ,'/access/formulariofin'

            ]) === -1;    
            var loggedIn = $rootScope.globals.currentUser;
    
            if (restrictedPage && !loggedIn) {   
                $rootScope.globals = {};
                // $state.go('access.signin');
                $cookieStore.remove('globals');
                $http.defaults.headers.common.Authorization = 'Basic';
                $location.path('/access/signin');
            }
            else {
            	
            }
        });
        }
    ]).config(
    [ '$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 
      function ($stateProvider,   $urlRouterProvider, JQ_CONFIG) {
          
          $urlRouterProvider
              .otherwise('/app/calendar');
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'tpl/app.html'
                	  
              })
                // fullCalendar
              .state('app.calendar', {
                  url: '/calendar',
                  templateUrl: 'tpl/app_calendar.html',
                  // use resolve to load other dependences
               
              resolve: {
                  deps: ['$ocLazyLoad','uiLoad',
                      function($ocLazyLoad,uiLoad) {
                          
                          
                          return uiLoad.load(
                                  JQ_CONFIG.fullcalendar.concat(['js/controllers/select.js?v=1.1.2','js/app/calendar/calendar.js',
                                	  'js/app/paciente/modalPacienteNController.js','js/app/confirm/modalctlConfirma.js'])
                                ).then(
                                  function(){
                                    return $ocLazyLoad.load(['ui.calendar','ui.select']);
                                  }
                                )
                          
                      }
                  ]
              }
              
              })
              .state('app.dashboard-v1', {
                  url: '/dashboard-v1',
                  templateUrl: 'tpl/app_dashboard_v1.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/controllers/chart.js']);
                    }]
                  }
              })
              .state('app.ui', {
                  url: '/ui',
                  template: '<div ui-view class="fade-in-up"></div>'
              })
              
              .state('app.seg.pagina', {
                  url: '/paginas',
                  templateUrl: 'tpl/pagina/list.html',
                  controller: 'paginaController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/pagina/paginaController.js','js/app/confirm/modalctlConfirma.js'
                        	  ,'js/controllers/select.js?v=1.1.2','ui.select']);
                      }]
                    }
              })
                .state('app.seg.modulo', {
                  url: '/modulos',
                  templateUrl: 'tpl/modulo/list.html',
                  controller: 'moduloController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/modulo/moduloController.js','js/app/confirm/modalctlConfirma.js'
                        	  ,'js/controllers/select.js?v=1.1.2','ui.select']);
                      }]
                    }
              })
               .state('app.seg.anotaciones', {
                    url: '/anotaciones',
                    templateUrl: 'tpl/anotaciones/list.html',
                    controller: 'anotacionesController',
                    resolve: {
                        deps: ['$ocLazyLoad',
                          function( $ocLazyLoad ){
                            return $ocLazyLoad.load(['js/app/anotaciones/anotacionesController.js','js/app/confirm/modalctlConfirma.js'
                            	,'js/controllers/select.js?v=1.1.2','ui.select']);
                        }]
                      } 
              })
              .state('access.activacuenta', {
                  url: '/activacuenta',
                  templateUrl: 'tpl/page_activaCuenta.html?v=1.1.2',
                  controller: 'activacuentaController',
                  resolve: {
                      deps: ['uiLoad',
                          function(uiLoad) {
                              return uiLoad.load(['js/controllers/activacuentaController.js?v=1.1.2']);
                          }
                      ]
                  },
                  params: {
                      'token': null
                  }
              })
                   .state('app.seg.perfiles', {
                  url: '/perfiles',
                  templateUrl: 'tpl/perfiles/list.html',
                  controller: 'perfilesController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/perfiles/perfilesController.js','js/app/confirm/modalctlConfirma.js'
                        	  ,'js/controllers/select.js?v=1.1.2','ui.select']);
                      }]
                    }
              })
                 .state('app.ui.perfilespaginas', {
                                    url: '/perfilespaginas/:id',
                                    templateUrl: 'tpl/perfiles/permisos.html',
                                    controller: 'perfilespaginasController',
                                    resolve: {
                                        deps: ['$ocLazyLoad',
                                            function ($ocLazyLoad) {
                                                return $ocLazyLoad.load(['js/app/perfiles/perfilesController.js','js/app/confirm/modalctlConfirma.js']);
                                            }]
                                    }
                                })
              
                
               .state('app.seg', {
                  url: '/seg',
                  template: '<div ui-view class="fade-in-up"></div>'
              })
               .state('app.seg.users', {
                  url: '/usuarios',
                  templateUrl: 'tpl/users/list.html',
                  controller: 'usersController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/users/usersController.js','js/app/confirm/modalctlConfirma.js'
                        	  ,'js/controllers/select.js?v=1.1.2','ui.select']);
                      }]
                    }
              }).state('app.seg.perfilespaginas', {
                  url: '/perfilespaginass',
                  templateUrl: 'tpl/perfilespaginas/list.html',
                  controller: 'perfilespaginasController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/perfilespaginas/perfilespaginasController.js','js/app/confirm/modalctlConfirma.js']);
                      }]
                    }
              }).state('app.seg.ubigeo', {
                  url: '/ubigeos',
                  templateUrl: 'tpl/ubigeo/list.html',
                  controller: 'ubigeoController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/ubigeo/ubigeoController.js','js/app/confirm/modalctlConfirma.js']);
                      }]
                    }
              }).state('app.seg.accionesodontograma', {
                  url: '/accionesodontogramas',
                  templateUrl: 'tpl/accionesodontograma/list.html',
                  controller: 'accionesodontogramaController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/accionesodontograma/accionesodontogramaController.js','js/app/confirm/modalctlConfirma.js']);
                      }]
                    }
              }).state('app.seg.citasmedicas', {
                  url: '/citasmedicass',
                  templateUrl: 'tpl/citasmedicas/list.html',
                  controller: 'citasmedicasController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/citasmedicas/citasmedicasController.js','js/app/confirm/modalctlConfirma.js']);
                      }]
                    }
              }).state('app.seg.clientdetails', {
                  url: '/clientdetailss',
                  templateUrl: 'tpl/clientdetails/list.html',
                  controller: 'clientdetailsController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/clientdetails/clientdetailsController.js','js/app/confirm/modalctlConfirma.js']);
                      }]
                    }
              }).state('app.seg.diagnostico', {
                  url: '/diagnosticos',
                  templateUrl: 'tpl/diagnostico/list.html',
                  controller: 'diagnosticoController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/diagnostico/diagnosticoController.js','js/app/confirm/modalctlConfirma.js']);
                      }]
                    }
              }).state('app.seg.evolucionhc', {
                  url: '/evolucionhcs',
                  templateUrl: 'tpl/evolucionhc/list.html',
                  controller: 'evolucionhcController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/evolucionhc/evolucionhcController.js','js/app/confirm/modalctlConfirma.js']);
                      }]
                    }
              }).state('app.seg.fisiologicos', {
                  url: '/fisiologicoss',
                  templateUrl: 'tpl/fisiologicos/list.html',
                  controller: 'fisiologicosController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/fisiologicos/fisiologicosController.js','js/app/confirm/modalctlConfirma.js']);
                      }]
                    }
              }).state('app.seg.fisiologicoshc', {
                  url: '/fisiologicoshcs',
                  templateUrl: 'tpl/fisiologicoshc/list.html',
                  controller: 'fisiologicoshcController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/fisiologicoshc/fisiologicoshcController.js','js/app/confirm/modalctlConfirma.js']);
                      }]
                    }
              }).state('app.seg.funcionesviologicas', {
                  url: '/funcionesviologicass',
                  templateUrl: 'tpl/funcionesviologicas/list.html',
                  controller: 'funcionesviologicasController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/funcionesviologicas/funcionesviologicasController.js','js/app/confirm/modalctlConfirma.js']);
                      }]
                    }
              }).state('app.seg.funcionesviologicashc', {
                  url: '/funcionesviologicashcs',
                  templateUrl: 'tpl/funcionesviologicashc/list.html',
                  controller: 'funcionesviologicashcController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/funcionesviologicashc/funcionesviologicashcController.js','js/app/confirm/modalctlConfirma.js']);
                      }]
                    }
              }).state('app.seg.gradoinstitucion', {
                  url: '/gradoinstitucions',
                  templateUrl: 'tpl/gradoinstitucion/list.html',
                  controller: 'gradoinstitucionController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/gradoinstitucion/gradoinstitucionController.js','js/app/confirm/modalctlConfirma.js'
                        	  ,'js/controllers/select.js?v=1.1.2','ui.select']);
                      }]
                    }
              }).state('app.seg.grupodiente', {
                  url: '/grupodientes',
                  templateUrl: 'tpl/grupodiente/list.html',
                  controller: 'grupodienteController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/grupodiente/grupodienteController.js','js/app/confirm/modalctlConfirma.js']);
                      }]
                    }
              }).state('app.seg.historiaclininca', {
                  url: '/historiaclinincas',
                  templateUrl: 'tpl/historiaclininca/list.html',
                  controller: 'historiaclinincaController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/historiaclininca/historiaclinincaController.js','js/app/confirm/modalctlConfirma.js']);
                      }]
                    }
              }).state('app.seg.niveldiente', {
                  url: '/niveldientes',
                  templateUrl: 'tpl/niveldiente/list.html',
                  controller: 'niveldienteController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/niveldiente/niveldienteController.js','js/app/confirm/modalctlConfirma.js']);
                      }]
                    }
              }).state('app.seg.ocupacion', {
                  url: '/ocupacions',
                  templateUrl: 'tpl/ocupacion/list.html',
                  controller: 'ocupacionController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/ocupacion/ocupacionController.js','js/app/confirm/modalctlConfirma.js'
                        	  ,'js/controllers/select.js?v=1.1.2','ui.select']);
                      }]
                    }
              }).state('app.seg.parametros', {
                  url: '/parametross',
                  templateUrl: 'tpl/parametros/list.html',
                  controller: 'parametrosController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/parametros/parametrosController.js','js/app/confirm/modalctlConfirma.js']);
                      }]
                    }
              }).state('app.seg.odontrograma', {
                  url: '/odontrogramas',
                  templateUrl: 'tpl/odontrograma/list.html',
                  controller: 'odontrogramaController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/odontrograma/odontrogramaController.js','js/app/confirm/modalctlConfirma.js']);
                      }]
                    }
              }).state('app.seg.paciente', {
                  url: '/pacientes',
                  templateUrl: 'tpl/paciente/list.html',
                  controller: 'pacienteController',
                  resolve: {
                      deps: ['$ocLazyLoad','uiLoad',
                    	  
                        function( $ocLazyLoad){                
                          return $ocLazyLoad.load('angularFileUpload', 'textAngular').then(function() {
                          return $ocLazyLoad.load(['js/app/paciente/pacienteController.js','js/app/confirm/modalctlConfirma.js'
                        	  ,'js/controllers/select.js?v=1.1.2','ui.select']);
                          });
                          
                     }]
             
              
              
                    }
              }).state('app.seg.paciente.hc', {
                  url: '/pacienteshc',
                  templateUrl: 'tpl/paciente/pacientesgen.html'
              }).state('app.seg.paciente.hcp', {
                  url: '/datospaciente',
                  params:{'id':null},
                  templateUrl: 'tpl/paciente/pacientesgen.html',
                  controller: 'pacienteEveController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function ($ocLazyLoad) {
                              return $ocLazyLoad.load(['js/app/paciente/pacienteControllerEve.js','js/app/confirm/modalctlConfirma.js'])
              				 
                          }]
                  }
                  
              }).state('app.seg.configuracion', {
                  url: '/configuracion',
                  templateUrl: 'tpl/configuracion/list.html',
                  controller: 'configuracionController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/configuracion/configuracionController.js',
                        	  'js/app/confirm/modalctlConfirma.js','js/controllers/select.js?v=1.1.2','ui.select']);
                      }]
                    }
                
                  
                  
              }).state('app.seg.pacienteanamnesis', {
                  url: '/pacienteanamnesiss',
                  templateUrl: 'tpl/pacienteanamnesis/list.html',
                  controller: 'pacienteanamnesisController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/pacienteanamnesis/pacienteanamnesisController.js','js/app/confirm/modalctlConfirma.js']);
                      }]
                    }
              }).state('app.seg.pacienteodontograma', {
                  url: '/pacienteodontogramas',
                  templateUrl: 'tpl/pacienteodontograma/list.html',
                  controller: 'pacienteodontogramaController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/pacienteodontograma/pacienteodontogramaController.js','js/app/confirm/modalctlConfirma.js']);
                      }]
                    }
              }).state('app.seg.pacienteodontogramadiagnosticos', {
                  url: '/pacienteodontogramadiagnosticoss',
                  templateUrl: 'tpl/pacienteodontogramadiagnosticos/list.html',
                  controller: 'pacienteodontogramadiagnosticosController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/pacienteodontogramadiagnosticos/pacienteodontogramadiagnosticosController.js','js/app/confirm/modalctlConfirma.js']);
                      }]
                    }
              }).state('app.seg.patologicos', {
                  url: '/patologicoss',
                  templateUrl: 'tpl/patologicos/list.html',
                  controller: 'patologicosController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/patologicos/patologicosController.js','js/app/confirm/modalctlConfirma.js']);
                      }]
                    }
              }).state('app.seg.patologicoshc', {
                  url: '/patologicoshcs',
                  templateUrl: 'tpl/patologicoshc/list.html',
                  controller: 'patologicoshcController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/patologicoshc/patologicoshcController.js','js/app/confirm/modalctlConfirma.js']);
                      }]
                    }
              }).state('app.seg.servicio', {
                  url: '/servicios',
                  templateUrl: 'tpl/servicio/list.html',
                  controller: 'servicioController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/servicio/servicioController.js','js/app/confirm/modalctlConfirma.js'
                        	  ,'js/controllers/select.js?v=1.1.2','ui.select']);
                      }]
                    }
              }).state('app.seg.estadoevento', {
                  url: '/estadoeventos',
                  templateUrl: 'tpl/estadoevento/list.html',
                  controller: 'estadoeventoController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/estadoevento/estadoeventoController.js','js/app/confirm/modalctlConfirma.js']);
                      }]
                    }
              }).state('app.seg.sutipodocumentoidentidad', {
                  url: '/sutipodocumentoidentidads',
                  templateUrl: 'tpl/sutipodocumentoidentidad/list.html',
                  controller: 'sutipodocumentoidentidadController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/sutipodocumentoidentidad/sutipodocumentoidentidadController.js','js/app/confirm/modalctlConfirma.js'
                        	  ,'js/controllers/select.js?v=1.1.2','ui.select']);
                      }]
                    }
              }).state('app.seg.tipodenticion', {
                  url: '/tipodenticions',
                  templateUrl: 'tpl/tipodenticion/list.html',
                  controller: 'tipodenticionController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/tipodenticion/tipodenticionController.js','js/app/confirm/modalctlConfirma.js']);
                      }]
                    }
              }).state('app.seg.tipoodontograma', {
                  url: '/tipoodontogramas',
                  templateUrl: 'tpl/tipoodontograma/list.html',
                  controller: 'tipoodontogramaController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/tipoodontograma/tipoodontogramaController.js','js/app/confirm/modalctlConfirma.js']);
                      }]
                    }
              }).state('app.seg.doctor', {
                  url: '/doctors',
                  templateUrl: 'tpl/doctor/list.html',
                  controller: 'doctorController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/doctor/doctorController.js','js/app/confirm/modalctlConfirma.js'
                        	  ,'js/controllers/select.js?v=1.1.2','ui.select']);
                      }]
                    }
              }).state('app.seg.tratamiento', {
                  url: '/tratamiento',
                  templateUrl: 'tpl/tratamiento/list.html',
                  controller: 'tratamientoController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/tratamiento/tratamientoController.js','js/app/confirm/modalctlConfirma.js']);
                      }]
                    }
              }).state('app.seg.convenios', {
                  url: '/convenios',
                  templateUrl: 'tpl/convenios/list.html',
                  controller: 'conveniosController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/convenios/conveniosController.js',
                        	  'js/app/confirm/modalctlConfirma.js','js/controllers/select.js?v=1.1.2','ui.select']);
                      }]
                    }
              }).state('app.seg.empresa', {
                  url: '/empresa',
                  templateUrl: 'tpl/empresa/list.html',
                  controller: 'empresaController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/empresa/empresaController.js',
                        	  'js/app/confirm/modalctlConfirma.js','js/controllers/select.js?v=1.1.2','ui.select']);
                      }]
                    }
              }).state('app.seg.insumo', {
                  url: '/insumo',
                  templateUrl: 'tpl/insumo/list.html',
                  controller: 'insumoController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/insumo/insumoController.js',
                        	  'js/app/confirm/modalctlConfirma.js'
                        	  ,'js/controllers/select.js?v=1.1.2','ui.select']);
                      }]
                    }
              }).state('app.seg.instrumental', {
                  url: '/instrumental',
                  templateUrl: 'tpl/instrumental/list.html',
                  controller: 'instrumentalController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/instrumental/instrumentalController.js',
                        	  'js/app/confirm/modalctlConfirma.js','js/controllers/select.js?v=1.1.2','ui.select']);
                      }]
                    }
              }).state('app.seg.tipoconvenio', {
                  url: '/tipoconvenio',
                  templateUrl: 'tpl/tipoconvenio/list.html',
                  controller: 'tipoconvenioController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/tipoconvenio/tipoconvenioController.js',
                        	  'js/app/confirm/modalctlConfirma.js']);
                      }]
                    }
              }).state('app.seg.especialidad', {
                  url: '/especialidads',
                  templateUrl: 'tpl/especialidad/list.html',
                  controller: 'especialidadController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/especialidad/especialidadController.js','js/app/confirm/modalctlConfirma.js'
                        	  ,'js/controllers/select.js?v=1.1.2','ui.select']);
                      }]
                    }
              }).state('app.seg.local', {
                  url: '/locals',
                  templateUrl: 'tpl/local/list.html',
                  controller: 'localController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/local/localController.js','js/app/confirm/modalctlConfirma.js'
                        	  ,'js/controllers/select.js?v=1.1.2','ui.select']);
                      }]
                    }
              }).state('app.seg.clinica', {
                  url: '/clinicas',
                  templateUrl: 'tpl/clinica/list.html',
                  controller: 'clinicaController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/clinica/clinicaController.js','js/app/confirm/modalctlConfirma.js'
                        	  ,'js/controllers/select.js?v=1.1.2','ui.select']);
                      }]
                    }
              })
       
              // pages
              
              // others
              .state('lockme', {
                  url: '/lockme',
                  templateUrl: 'tpl/page_lockme.html'
              })
              .state('access', {
                  url: '/access',
                  template: '<div ui-view class="fade-in-right-big smooth"></div>'
              })
              .state('access.signin', {
                  url: '/signin',
                  templateUrl: 'tpl/page_signin.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/controllers/signin.js','js/app/confirm/modalctlConfirma.js'] );
                      }]
                  }
              })
              .state('access.confirmpaciente', {
                  url: '/confirmpaciente',
                  templateUrl: 'tpl/page_confirmpaciente.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/controllers/confirmpaciente.js','js/app/confirm/modalctlConfirma.js'] );
                      }]
                  }
              }).state('access.formpaciente', {
                  url: '/formpaciente',
                  templateUrl: 'tpl/page_formpaciente.html',
                  resolve: {
                      deps: ['$ocLazyLoad','uiLoad',
                          function($ocLazyLoad,uiLoad) {
                              
                              
                              return uiLoad.load(
                                      JQ_CONFIG.fullcalendar.concat(['js/controllers/select.js?v=1.1.2','js/app/paciente/modalPacienteNController.js',
                                    	  'js/controllers/formpaciente.js','js/app/confirm/modalctlConfirma.js'])
                                    ).then(
                                      function(){
                                        return $ocLazyLoad.load(['ui.calendar','ui.select']);
                                      }
                                    )
                              
                          }
                      ]
                  }
              })
              .state('access.signup', {
                  url: '/signup',
                  templateUrl: 'tpl/page_signup.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/controllers/signup.js','js/app/confirm/modalctlConfirma.js'] );
                      }]
                  }
              })
              .state('access.forgotpwd', {
                  url: '/forgotpwd',
                  templateUrl: 'tpl/page_forgotpwd.html',
                  controller: 'forgotpwdController',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/controllers/forgotpwd.js'] );
                      }]
                  }
              })
               .state('access.actpass', {
                  url: '/actpass',
                  templateUrl: 'tpl/page_actpassw.html',
                  controller: 'cambiaPasswordController',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/controllers/cambiaPasswordController.js'] );
                      }]
                  }
              })
              
              .state('access.404', {
                  url: '/404',
                  templateUrl: 'tpl/page_404.html'
              })

            
              .state('layout', {
                  abstract: true,
                  url: '/layout',
                  templateUrl: 'tpl/layout.html'
              })
              .state('layout.fullwidth', {
                  url: '/fullwidth',
                  views: {
                      '': {
                          templateUrl: 'tpl/layout_fullwidth.html'
                      },
                      'footer': {
                          templateUrl: 'tpl/layout_footer_fullwidth.html'
                      }
                  },
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/controllers/vectormap.js'] );
                      }]
                  }
              })
              .state('layout.mobile', {
                  url: '/mobile',
                  views: {
                      '': {
                          templateUrl: 'tpl/layout_mobile.html'
                      },
                      'footer': {
                          templateUrl: 'tpl/layout_footer_mobile.html'
                      }
                  }
              })
              .state('layout.app', {
                  url: '/app',
                  views: {
                      '': {
                          templateUrl: 'tpl/layout_app.html'
                      },
                      'footer': {
                          templateUrl: 'tpl/layout_footer_fullwidth.html'
                      }
                  },
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/controllers/tab.js'] );
                      }]
                  }
              })
              .state('apps', {
                  abstract: true,
                  url: '/apps',
                  templateUrl: 'tpl/layout.html'
              })
              .state('apps.note', {
                  url: '/note',
                  templateUrl: 'tpl/apps_note.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/app/note/note.js',
                                               JQ_CONFIG.moment] );
                      }]
                  }
              })
              .state('apps.contact', {
                  url: '/contact',
                  templateUrl: 'tpl/apps_contact.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/app/contact/contact.js'] );
                      }]
                  }
              })
              .state('app.weather', {
                  url: '/weather',
                  templateUrl: 'tpl/apps_weather.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(
                              {
                                  name: 'angular-skycons',
                                  files: ['js/app/weather/skycons.js',
                                          'js/app/weather/angular-skycons.js',
                                          'js/app/weather/ctrl.js',
                                          JQ_CONFIG.moment ] 
                              }
                          );
                      }]
                  }
              })
              .state('app.todo', {
                  url: '/todo',
                  templateUrl: 'tpl/apps_todo.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/app/todo/todo.js',
                                               JQ_CONFIG.moment] );
                      }]
                  }
              })
              .state('app.todo.list', {
                  url: '/{fold}'
              })
              .state('music', {
                  url: '/music',
                  templateUrl: 'tpl/music.html',
                  controller: 'MusicCtrl',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load([
                            'com.2fdevs.videogular', 
                            'com.2fdevs.videogular.plugins.controls', 
                            'com.2fdevs.videogular.plugins.overlayplay',
                            'com.2fdevs.videogular.plugins.poster',
                            'com.2fdevs.videogular.plugins.buffering',
                            'js/app/music/ctrl.js', 
                            'js/app/music/theme.css'
                          ]);
                      }]
                  }
              })
              
              /////////////////////////////////////////
              //ZIGAP
              
                .state('app.ui.infoacademica', {
                  url: '/infoacademica',
                  templateUrl: 'tpl/zigap/infoacademica.html',
                  controller: 'zigapController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/zigap/controller/zigapController.js']);
                      }]
                    }
              })
               .state('app.ui.experiencialaboral', {
                  url: '/experiencialaboral',
                  templateUrl: 'tpl/zigap/experiencialaboral.html',
                  controller: 'zigapController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/zigap/controller/zigapController.js']);
                      }]
                    }
              })
            
               .state('app.ui.formacionacademica', {
                  url: '/formacionacademica',
                  templateUrl: 'tpl/zigap/formacionacademica.html',
                  controller: 'zigapController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/zigap/controller/zigapController.js']);
                      }]
                    }
              })
              .state('app.ui.inicio', {
                  url: '/inicio',
                  templateUrl: 'tpl/zigap/inicio.html',
                  controller: 'zigapController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/zigap/controller/zigapController.js']);
                      }]
                    }
              })
              
              .state('app.ui.actualizardatos', {
                  url: '/actualizaDatos',
                  templateUrl: 'tpl/zigap/formulario.html',
                  controller: 'zigapController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/zigap/controller/zigapController.js']);
                      }]
                    }
              })
              
              
              .state('app.ui.valoracionservicios', {
                  url: '/valoracion',
                  templateUrl: 'tpl/zigap/seleccion.html',
                  controller: 'zigapController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['js/app/zigap/controller/zigapController.js']);
                      }]
                    }
              })
              
              //////////////////////////////////////
              
              
              
              
              
              
              
              
              
              
              .state('app.logout', {
                    url: 'logout',
                    controller: ['$cookieStore', '$state', '$scope', 'API_BASE', '$http', '$location', 'store', '$rootScope',
                              function($cookieStore, $state, $scope, API_BASE, $http, $location, store, $rootScope) {
                            store.remove('access_token');
                            $http.get(API_BASE + '/oauth/revoke-token');
                            $rootScope.globals = {};
                            $state.go('access.signin');
                            $cookieStore.remove('globals');
                            $http.defaults.headers.common.Authorization = 'Basic ';
                        }
                    ]
                })
         
      }
    ]
  );