import { todo } from "../Models/newModel.js";
import "dotenv/config";


export const createTodo = async (req, res) => {
  try {
    const task = req.body.task;
    const description = req.body.description;


    console.log(req.user,"user")
    const newTask = new todo({
      task: task,
      description: description,
      status:"pending",
      myUser: req.user.id,
    });

    await newTask.save();

    res.status(200).json({ success: true, msg: "task created" });
  } catch (e) {
    res.status(500).json({ success: false, msg: "something went wrong" });
    console.log(e.message);
  }
};

export const updateTodo = async (req, res) => {
  const id = req.params.id;

  try {
    if (!id) {
      res.status(200).json({ success: false, msg: "Id is required" });
      return;
    }
    const findTodo = await todo.findByIdAndUpdate(
      {
        _id: id, myUser: req.user.id
      },
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      msg: "todo updated successfully",
      data: findTodo,
    });
  } catch (e) {
    res.status(500).json({ success: false, msg: "something went wrong" });
    console.log(e.message);
  }
};

export const deleteTodo = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteTodo = await todo.findByIdAndDelete({ _id : id, 
      myUser: req.user.id});
    res
      .status(200)
      .json({ success: false, msg: "deleted succesfully", data: deleteTodo });
  } catch (e) {
    res.status(500).json({ success: false, msg: "something went wrong" });
    console.log(e.message);
  }
};
export const getTodos = async (req, res) => {

  const { status } = req.query;

  const filter = { 
    myUser: req.user.id }

  if(status){
    filter.status = status;
  }

  try {
    const todos = await todo.find(filter);
    res.status(200).json(todos);
  } catch (e) {
    res.status(500).json({ success: false, msg: "something went wrong" });
    console.log(e.message);
  }
};
