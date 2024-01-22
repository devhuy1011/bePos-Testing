const express = require("express");
const ProductsController = require("../controllers/productsController");
const validate = require(`../middlewares/validate`);

const router = express.Router();

module.exports = router;

module.exports = (server, io) => {
  server.prefix(`/`, (router) => {
    router.get(`/`, (req, res) => {
      return res.status(200).json({
        message: `Welcome to project bePos test`,
      });
    });

    router.prefix(`/products`, (router) => {
      router.post(`/create`, validate("products/create"), (req, res) =>
        ProductsController.create(req, res)
      );
      router.post(`/get-all`, validate("products/get-all"), (req, res) =>
        ProductsController.getAll(req, res)
      );
      router.post(`/details`, validate("products/details"), (req, res) =>
        ProductsController.details(req, res)
      );
      router.post(`/update`, validate("products/update"), (req, res) =>
        ProductsController.update(req, res)
      );
      router.post(`/disable`, validate("products/disable"), (req, res) =>
        ProductsController.disable(req, res)
      );
      router.post(
        `/delete-cate`,
        validate("products/delete-cate"),
        (req, res) => ProductsController.deleteCate(req, res)
      );
    });
  });
};
