const Todo = require("../services/models/todo_model");
const Tag = require("../services/models/tag_model");

// GET section
async function list(ctx) {
  try {
    const todos = await Todo.find().sort("_id");
    ctx.body = todos;
    console.log(ctx.method + " to " + ctx.host + "" + ctx.url);
    return ctx.body;
  } catch (error) {
    ctx.body = { message: error };
  }
}

async function show(ctx) {
  const id = ctx.params.id;
  try {
    // const todosById = await Todo.findById(id);
    const todosById = await Todo.findOne({ id: id });
    if (!todosById) {
      ctx.state = 400;
      return ctx.state;
    }
    ctx.body = todosById;
    console.log(ctx.method + " to " + ctx.host + "" + ctx.url);
    return ctx.body;
  } catch (error) {
    ctx.body = { message: error };
  }
}

async function getTags(ctx) {
  const id = ctx.params.id;
  try {
    const todos = await Todo.findOne({ id: id });
    ctx.body = todos.tags;    
    console.log(ctx.method + " to " + ctx.host + "" + ctx.url);
    return ctx.body;
  } catch (error) {
    ctx.body = { message: error };
  }
}

// POST section
async function add(ctx) {
  const id = "todo_" + Date.now().toString();
  const url = "http://" + ctx.host + "" + ctx.url + "" + id;

  ctx.request.body["id"] = id;
  ctx.request.body["url"] = url;

  const newTodo = ctx.request.body;

  try {
    // Tittle empty validation
    if (!newTodo.title) {
      ctx.throw(400, { error: '"title" is a required field' });
    }

    // Data type title validation
    const title = newTodo.title;
    if (!typeof data === "string" || !title.length) {
      ctx.throw(400, {
        error: '"title" must be a string with at least one character'
      });
    }
    const todo = await Todo(newTodo).save();
    console.log(ctx.method + " to " + ctx.host + "" + ctx.url);
    ctx.body = todo;
    return ctx.body;
  } catch (error) {
    ctx.body = { message: error };
  }
}

async function addTag(ctx) {
  const todo_id = ctx.params.id;
  const tag_id = ctx.request.body.id;
  try {
    const responseTodo = await Todo.findOne({ id: todo_id });
    const responseTag = await Tag.findOne({ id: tag_id });

    responseTodo.tags.push({
      id: responseTag.id,
      title: responseTag.title,
      url: responseTag.url
    });

    responseTag.todos.push({
      id: responseTodo.id,
      title: responseTodo.title,
      completed: responseTodo.completed,
      order: responseTodo.order,
      url: responseTodo.url
    });
    await responseTag.save();
    const patchedTodo = await responseTodo.save();
    console.log(ctx.method + " to " + ctx.host + "" + ctx.url);
    ctx.body = patchedTodo;
    return ctx.body;
  } catch (error) {
    ctx.body = { message: error };
  }
}

// UPDATE section
async function update(ctx) {
  const id = ctx.params.id;
  const updatedTodo = ctx.request.body;

  try {
    // Title validation
    if (
      "title" in updatedTodo &&
      (!typeof data === "string" || !updatedTodo.title.length)
    ) {
      ctx.throw(400, {
        error: '"title" must be a string with at least one character'
      });
    }
    const todo = await Todo.findOne({ id: id });
    todo.title = updatedTodo.title ? updatedTodo.title : todo.title;
    todo.completed = updatedTodo.completed
      ? updatedTodo.completed
      : todo.completed;
    todo.order = updatedTodo.order ? updatedTodo.order : todo.order;

    // Update todo in database
    const patchedTodo = await todo.save();
    console.log(ctx.method + " to " + ctx.host + "" + ctx.url);
    ctx.body = patchedTodo;
    return ctx.body;
  } catch (error) {
    ctx.body = { message: error };
  }
}

// DELETE section
async function remove(ctx) {
  const id = ctx.params.id;

  try {
    // const todo = await Todo.findById(id);
    const todo = await Todo.findOne({ id: id });
    const deletedtodo = await todo.remove();
    ctx.body(deletedtodo);
    console.log(ctx.method + " to " + ctx.host + "" + ctx.url);
    ctx.status = 204;
    return ctx.status;
  } catch (error) {
    ctx.body = { message: error };
  }
}

async function clear(ctx) {
  try {
    const todos = await Todo.find();
    todos.forEach(async todo => {
      const deletedtodos = await Todo.findByIdAndDelete(todo._id);
      ctx.body = deletedtodos;
    });

    console.log(ctx.method + " to " + ctx.host + "" + ctx.url);
    ctx.status = 204;
    return ctx.status;
  } catch (error) {
    ctx.body = { message: error };
  }
}

async function deleteTags(ctx) {
  const id = ctx.params.id;
  try {
    const todo = await Todo.findOne({ id: id });
    todo.tags = todo.tags.filter(x => !x.id);
    await todo.save();
    ctx.status = 204;
    console.log(ctx.method + " to " + ctx.host + "" + ctx.url);
    return ctx.status;
  } catch (error) {
    ctx.body = { message: error };
  }
}

async function deleteTag(ctx) {
  const todo_id = ctx.params.todo_id;
  const tag_id = ctx.params.tag_id;
  try {
    // const todo = await Todo.findById(id);
    const todo = await Todo.findOne({ id: todo_id });
    todo.tags = todo.tags.filter(x => x.id != tag_id);
    const deletedTag = await todo.save();
    ctx.body = deletedTag;
    ctx.status = 204;
    console.log(ctx.method + " to " + ctx.host + "" + ctx.url);
    return ctx.status;
  } catch (error) {
    ctx.body = { message: error };
  }
}

module.exports.list = list;
module.exports.clear = clear;
module.exports.add = add;
module.exports.show = show;
module.exports.update = update;
module.exports.remove = remove;
module.exports.getTags = getTags;
module.exports.addTag = addTag;
module.exports.deleteTags = deleteTags;
module.exports.deleteTag = deleteTag;
