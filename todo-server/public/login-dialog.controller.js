angular
    .module('mytodo')
    .controller('LoginDialogController', LoginDialogController);

LoginDialogController.$inject = ['$mdDialog'];

function LoginDialogController( $mdDialog ) {
   var vm = this;
   vm.username = null;
   vm.password = null;

   vm.handleSubmit = handleSubmit;
   vm.handleCancel = handleCancel;
   
   function handleSubmit() {
       console.log("handling submit");
        return $mdDialog.hide();
   }
   function handleCancel() {
       return $mdDialog.hide();
   }
}