const Koa = require("koa");
const routerTodo = require("koa-router")();
const routerTag = require("koa-router")();
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const jsonKoa = require("koa-json");
const Helmet = require("koa-helmet");

const dbConnection = require("./services/dbConnection");

const app = new Koa();

// import the index.js located in ./routers
require("./routes").todo(routerTodo);
require("./routes").tag(routerTag);

// Middlewares
app
  .use(jsonKoa())
  .use(bodyParser())
  .use(cors())
  .use(Helmet());

// routes section
app
  .use(routerTodo.routes())
  .use(routerTodo.allowedMethods())
  .use(routerTag.routes())
  .use(routerTag.allowedMethods());

// koa static for front end purposes
app.use(require("koa-static")("./build"))

// Connection to DB
dbConnection();

// server Connection
app.listen(8080, () => console.log("Server started..."));
