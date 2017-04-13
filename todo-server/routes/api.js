var express = require("express");
var todo_controller = require('../controllers/todoController');

var router = express.Router();

router.get('/', todo_controller.todo_list);                       // Get the list of TODO
router.post('/create', todo_controller.todo_create);              // Create a new TODO item on POST
router.delete('/delete/:todo_id', todo_controller.ensureAuthorized, todo_controller.todo_delete);   // DELETE the TODO item


module.exports = router;
