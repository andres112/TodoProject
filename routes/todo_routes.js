const Router = require("koa-router");
const control = require("../controllers/index");

const router = new Router();

router
  .get("/", control.todo.list)
  .del("/", control.todo.clear)
  .post("/", control.todo.add)
  .get("/:id", control.todo.show)
  .patch("/:id", control.todo.update)
  .del("/:id", control.todo.remove)
  .get("/:id/tags", control.todo.getTags)
  .delete("/:id/tags", control.todo.deleteTags)
  .post("/:id/tags", control.todo.addTag)
  .delete("/:todo_id/tags/:tag_id", control.todo.deleteTag);

module.exports = router.routes();
