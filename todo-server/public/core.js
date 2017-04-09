angular
    .module('mytodo', [ 'ngMaterial', 'ngMdIcons' ])
    .controller('MainController', MainController);

MainController.$inject = ['$http', 'apiService'];


function MainController($http, apiService ) {
    var my = this;

    my.todos = {};
    my.formData = {};

    activate();

    function activate() {
        return getTodo().then(function(){
            console.log("called the service getter")
        });
    }

    function getTodo(){
        return apiService.getList()
            .then(function (data) {
                console.log("controller then called");
                my.todos = data;
                return my.todos;
            })
    }

    // var self = this;
    //
    // self.openDialog = function($event){
    //     $mdDialog.show({
    //       controller: LoginCtrl,
    //       controllerAs: 'ctrl',
    //       templateUrl: 'login.dialog.html',
    //       parent: angular.element(document.body),
    //       targetEvent: $event,
    //       clickOutsideToClose: true
    //   })
    // }

    this.createTodo = function () {
        console.log(my.formData);
        $http.post('/api/create/', my.formData)
            .success(function (data) {
                my.formData = {};
                my.todos = data;
                console.log(data);
            })
            .error(function (data) {
                console.log("Error " + data);
            });
    };
    this.deleteTodo = function (id) {
        $http.delete('/api/delete/' + id)
            .success(function (data) {
                my.todos = data;
            })
            .error(function (data) {
                console.log("Error" + data)
            });
    };
}

 // }]);
