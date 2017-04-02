var Todo = require('../models/todo');


var getAllTodo = function(callback){
  Todo.find( function(err, result){
    if(err){
      return callback(err, "error in getting list");
    }
    else {
      return callback(err, result);
    }
  });
}

var createTodo = function(data, callback){
  Todo.create({
    title: data.title,
    text: data.text,
    done: false
  }, function(err, result){
    if(err) {
      return callback(err, "error in creating new entry");
    }
    else{
      getAllTodo(function(err, list){
        return callback(err, list);
      });
    }
  });
};

var deleteTodo = function(todoId, callback){
  Todo.remove({_id: todoId})
      .exec(function(err, result){
        if(err){
          return callback(err, "error in deleting item");
        }
        else{
          getAllTodo(function(err, list){
            return callback(err, list);
          });
        }
      });
};


exports.todo_list = function(req, res, next){
  getAllTodo( function(err, result) {
    res.status(200).json(result);
  });
};

exports.todo_create = function(req, res, next){
  createTodo(req.body, function(err, newtodo){
    res.status(200).json(newtodo);
  })
};

exports.todo_delete = function(req, res, next){
  console.log("DELETE : " + req.params.todo_id);
  deleteTodo(req.params.todo_id, function(err, newtodo){
    res.status(200).json(newtodo);
  });
};
