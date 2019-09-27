const Tag = require("../services/models/tag_model");
const Todo = require("../services/models/todo_model");

// GET section
async function list(ctx) {
  try {
    const tags = await Tag.find().sort("_id");
    ctx.body = tags;
    console.log(ctx.method + " to " + ctx.host + "" + ctx.url);
    return ctx.body;
  } catch (error) {
    ctx.body = { message: error };
  }
}

async function show(ctx) {
  const id = ctx.params.id;
  try {
    // const tag = await Tag.findById(id);
    const tag = await Tag.findOne({ id: id });
    ctx.body = tag;
    console.log(ctx.method + " to " + ctx.host + "" + ctx.url);
    return ctx.body;
  } catch (error) {
    ctx.body = { message: error };
  }
}

async function getTodos(ctx) {
  const id = ctx.params.id;
  try {
    // const todo = await Todo.findOne({ 'tags.id': id });
    const tag = await Tag.findOne({ id: id });
    const todos = tag.todos
    ctx.body = todos;
    console.log(ctx.method + " to " + ctx.host + "" + ctx.url);
    return ctx.body;
  } catch (error) {
    ctx.body = { message: error };
  }
}

// POST section
async function add(ctx) {
  const id = "tag_" + Date.now().toString();
  const url = "http://" + ctx.host + "" + ctx.url + "" + id;

  ctx.request.body["id"] = id;
  ctx.request.body["url"] = url;

  const newTag = ctx.request.body;

  try {
    // Tittle empty validation
    if (!newTag.title)
      return ctx.throw(400, { error: '"title" is a required field' });

    // Data type title validation
    if (!typeof data === "string" || !newTag.title.length) {
      return ctx.throw(400, {
        error: '"title" must be a string with at least one character'
      });
    }
    const tag = await Tag(newTag).save();
    console.log(ctx.method + " to " + ctx.host + "" + ctx.url);
    ctx.body = tag;
    return ctx.body;
  } catch (error) {
    ctx.body = { message: error };
  }
}

// PATCH section
async function update(ctx) {
  const id = ctx.params.id;
  const updatedTag = ctx.request.body;

  try {
    // Tittle empty validation
    if (!updatedTag.title)
      return ctx.throw(400, { error: '"title" is a required field' });

    // Data type title validation
    if (!typeof data === "string" || !updatedTag.title.length) {
      return ctx.throw(400, {
        error: '"title" must be a string with at least one character'
      });
    }

    const tag = await Tag.findOne({ id: id });
    tag.title = updatedTag.title ? updatedTag.title : tag.title;

    // Update todo in database
    const patchedTag = await tag.save();
    console.log(ctx.method + " to " + ctx.host + "" + ctx.url);
    ctx.body = patchedTag;
    return ctx.body;
  } catch (error) {
    ctx.body = { message: error };
  }
}

// DELETE section
async function remove(ctx) {
  const id = ctx.params.id;

  try {
    // const tag = await Tag.findById(id);
    const tag = await Tag.findOne({ id: id });
    const deletedtag = await tag.remove();
    ctx.body(deletedtag);
    console.log(ctx.method + " to " + ctx.host + "" + ctx.url);
    ctx.status = 204;
    return ctx.status;
  } catch (error) {
    ctx.body = { message: error };
  }
}

async function clear(ctx) {
  try {
    const tags = await Tag.find();
    tags.forEach(async tag => {
      const deletedtags = await Tag.findByIdAndDelete(tag._id);
      ctx.body = deletedtags;
    });

    console.log(ctx.method + " to " + ctx.host + "" + ctx.url);
    ctx.status = 204;
    return ctx.status;
  } catch (error) {
    ctx.body = { message: error };
  }
}

module.exports.list = list;
module.exports.add = add;
module.exports.show = show;
module.exports.update = update;
module.exports.remove = remove;
module.exports.clear = clear;
module.exports.getTodos = getTodos;
