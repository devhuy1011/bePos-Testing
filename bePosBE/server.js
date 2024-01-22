const express = require(`express`);
const path = require("path");
const ProductsModel = require("./api/models/ProductsModel.js");

global._const = require(`./constants/index.js`);
global._validationResult = require("express-validator").validationResult;
global._mongoose = require(`mongoose`);
global._log = require(`./utils/log.js`);
global._helper = require(`./utils/helper.js`);
global._res = require(`./constants/response.js`);
global._error = require(`./constants/errorCode.js`);
global._io;

express.application.prefix = express.Router.prefix = function (path, ...args) {
  //Cấu hình cho phép dùng prefix trong router
  let router = express.Router();
  const controllers = args.slice(0, args.length - 1);
  this.use(path, ...controllers, router);
  const configure = args[args.length - 1];
  configure(router);
  return router;
};

const cors = require("cors");
const mongodb = require(`./connections/mongodb.js`);
const bodyParser = require(`body-parser`);
const router = require(`./api/routers/index.js`);

//const Routes
// const userRoute = require("./api/routers/UserRouters.js");

const port = process.env.PORT || 8000;

const server = express();
// Middleware để log URL
server.use((req, res, next) => {
  _log.log(`Received request to: ${req.method} ${req.originalUrl}`);
  next();
});

mongodb.once(`open`, async () => {
  _log.log(`MongoDB connected`);
  await startServer();
});

mongodb.on(`error`, (error) => {
  _log.err(`Connect to MongoDB error!`, error);
});

const startServer = async () => {
  //Enable cors
  server.use(
    cors({
      origin: "*",
      methods: "GET,POST,OPTIONS,PUT,PATCH,DELETE",
      optionsSuccessStatus: 200,
    })
  );

  // for parsing application/json
  server.use(bodyParser.json({ limit: "50mb" }));
  server.use(express.static(path.join("public/dalle")));

  // for parsing application/xwww-
  server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
  server.listen(port, async () => {
    router.setRouterHttp(server);

    server.use((req, res) => {
      return _helper.responseError({
        req,
        res,
        errorDetail: _res.SYSTEM.NOT_FOUND,
      });
    });

    server.use((error, req, res) => {
      return _helper.responseError({ req, res, error });
    });

    _log.log(`Server is running port ${port}`);
  });
};
