module.exports.todo = todo_router => {
  todo_router.prefix("/v1");
  todo_router.use('/todos',require("./todo_routes"));
};

module.exports.tag = tag_router => {
  tag_router.prefix("/v1");
  tag_router.use('/tags',require("./tag_routes"));
};
