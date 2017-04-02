var Todo = require('../models/todo');


exports.todo_list = function(req, res, next){
  Todo.find( function(err, todos){
    if(err) { res.send(err);}
    else {
      res.json(todos);
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
      console.log("new item : " + req.body.title );
      console.log(todo);
      Todo.find( function(err, todos){
        if(err) { res.send(err);}
        else {
          res.json(todos);
        }
      });
    }
  });
};

exports.todo_delete = function(req, res, next){
  console.log("DELETE : " + req.params.todo_id);
  Todo.remove({ _id: req.params.todo_id }, function(err, todo){
    if(err) { res.send(err); }
    else {
      console.log("DELETED! : " + req.params.todo_id);
      //this.todo_list();
      Todo.find( function(err, todos){
        if(err) { res.send(err);}
        else {
          res.json(todos);
        }
      });
    }
  })
};
