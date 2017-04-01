var Todo = require('../models/todo');


exports.todo_list = function(req, res, next){
  Todo.find( function(err, todo_list){
    if(err) { res.send(err);}
    else {
      res.json(todo_list);
    }
  });

};

exports.todo_create = function(req, res, next){
  Todo.create({
    title : req.body.title,
    text  : req.body.text,
    done  : false
  }, function(err, todo){
    if(err) { res.send(err); }
    else {
      res.send("done!");
      console.log(todo);
    }
  });
};

exports.todo_delete = function(req, res, next){
  Todo.remove({ _id: req.params.todo_id }, function(err, res){
    if(err) { res.send(err); }
    else {
      res.send(res);
      console.log("DELETE" + req.params.todo_id);
    }
  })
};
