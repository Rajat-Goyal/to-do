angular
    .module('mytodo')
    .factory('apiService', apiService);

apiService.$inject = ['$http' ];

function apiService($http) {
    return {
        getList: getList
    };

    function getList(){
        return $http.get('/api/')
            .then(getListComplete)
            .catch(getListFailed);

        function getListComplete(response) {
            console.log("apiservice then called " + response); //  todo remove this
            console.log(response.data); // todo remove this
            return response.data;
        }
        function getListFailed(error){
            console.log('Request failed for getList.' + error);
        }
    }
}