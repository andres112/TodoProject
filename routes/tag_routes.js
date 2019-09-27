const Router = require("koa-router");
const control = require("../controllers/index");

const router = new Router();

router
  .get("/", control.tag.list)
  .post("/", control.tag.add)
  .del("/", control.tag.clear)
  .get("/:id", control.tag.show)
  .patch("/:id", control.tag.update)
  .del("/:id", control.tag.remove)
  .get("/:id/todos", control.tag.getTodos);

module.exports = router.routes();