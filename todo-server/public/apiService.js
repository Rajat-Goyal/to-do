angular
    .module('mytodo')
    .factory('apiService', apiService);

apiService.$inject = ['$http' ];

function apiService($http) {
    return {
        getList: getList,
        createItem: createItem,
        deleteById: deleteById
    };

    function getList(){
        return $http.get('/api/')
            .then(getListComplete)
            .catch(getListFailed);

        function getListComplete(response) {
            return response.data;
        }
        function getListFailed(error){
            console.log('Request failed for getList.' + error);
        }
    }
    
    function createItem(formData) {
        return $http.post('/api/create', formData)
            .then(createItemComplete)
            .catch(createItemFailed);
        function createItemComplete(response) {
            return response.data;
        }
        function createItemFailed(error) {
            console.log("Error creating new item " + error);
        }
    }

    function deleteById(id){
        return $http.delete('/api/delete/' + id)
            .then(deleteComplete)
            .catch(deleteFailed);

        function deleteComplete(response) {
            return response.data;
        }
        function deleteFailed(error) {
            console.log('Error in deleting item ' + error) ;
        }
    }
}