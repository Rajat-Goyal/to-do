angular
    .module('mytodo', [ 'ngMaterial', 'ngMdIcons' ])
    .controller('MainController', MainController);

MainController.$inject = ['apiService'];

function MainController( apiService ) {
    var self = this;

    self.todos = {};
    self.formData = {};
    self.createTodo = createTodo;
    self.deleteTodo = deleteTodo;

    activate();

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

