angular
    .module('mytodo', [ 'ngMaterial', 'ngMdIcons' ])
    .controller('MainController', MainController);

MainController.$inject = ['apiService', '$mdDialog'];

function MainController( apiService, $mdDialog ) {
    var self = this;

    self.todos = {};
    self.formData = {};
    self.createTodo = createTodo;
    self.deleteTodo = deleteTodo;
    self.login = login;

    activate();

    function login(ev) {
        $mdDialog.show({
            controller: 'LoginDialogController',
            controllerAs: 'vm',
            templateUrl: 'login-dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: false // Only for -xs, -sm breakpoints.
        })
            .then(function() {
                console.log( 'logged in');
            }, function() {
                console.log('Cancelled');
            });
    };

    function activate() {
        return getTodo().then(function(){
            console.log("called the service getter")
        });
    }

    function getTodo(){
        return apiService.getList()
            .then(function (data) {
                self.todos = data;
                return self.todos;
            });
    }

    function createTodo(){
        return apiService.createItem(self.formData)
            .then(function(data){
                self.todos = data;
                self.formData = {};
                return self.todos;
            });
    }

    function deleteTodo( id ){
        return apiService.deleteById(id)
            .then(function(data){
                self.todos = data;
                return self.todos;
            });
    }
}

