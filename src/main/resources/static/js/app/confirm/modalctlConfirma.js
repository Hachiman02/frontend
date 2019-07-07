app.controller('modalctlConfirma', ['item', 'estado', '$modalInstance', '$scope',
    function (item, estado, $modalInstance, $scope) {
        $scope.item = item;
        $scope.estado = estado;
        
        $scope.nombre=$scope.item.producto;
        $scope.ok = function () {  
            $modalInstance.close($scope.item, $scope.estado);
        };
        $scope.no = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);

app.controller('modalctlConfirmaDinamico', ['titulo', 'mensaje','nombre', '$modalInstance', '$scope',
    function (titulo, mensaje,nombre, $modalInstance, $scope) {
       $scope.titulo=titulo;
       $scope.mensaje=mensaje;
       $scope.nombre=nombre;
        $scope.ok = function () {
            $modalInstance.close($scope.item, $scope.estado);
        };
        $scope.no = function () {
            $modalInstance.dismiss('cancel');
        };
        
    }]);