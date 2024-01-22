const ProductsModel = require("../models/ProductsModel");

/**
 * Tạo PRODUCTS
 * @param req
 * @param res
 * @param io
 * @returns {Promise<*>}
 */
const create = async (req, res, io) => {
  try {
    _validationResult(req).throw();
    const { body } = req;
    const { name, description, price, category } = body;

    const cate = new ProductsModel({
      name,
      description,
      price,
      category,
    });

    await cate.save();
    _helper.responseSuccess({ req, res });
  } catch (error) {
    return _helper.responseError({ req, res, error: error });
  }
};

/**
 * Get ALl PRODUCTS
 * @param req
 * @param res
 * @param io
 * @returns {Promise<*>}
 */
const getAll = async (req, res, io) => {
  try {
    _validationResult(req).throw();
    const { body } = req;
    let { page, limit, searchValue } = body;

    page = Number(page || 1);
    limit = Number(limit || 10);
    if (limit > 50) limit = 50;

    let options = {
      page: page,
      limit: limit,
      sort: {
        created: -1,
      },
    };

    let query = {};
    if (searchValue) {
      query.$or = [
        { name: { $regex: searchValue, $options: "i" } }, // Tìm kiếm khớp với trường name
        { category: { $regex: searchValue, $options: "i" } }, // Tìm kiếm khớp với trường category
      ];
    }

    const aggregate = ProductsModel.aggregate([
      {
        $match: query,
      },
    ]);

    let productData = await ProductsModel.aggregatePaginate(aggregate, options);

    _helper.responseSuccess({ req, res, data: productData });
  } catch (error) {
    return _helper.responseError({ req, res, error: error });
  }
};

/**
 * Get details PRODUCTS
 * @param req
 * @param res
 * @param io
 * @returns {Promise<*>}
 */
const details = async (req, res, io) => {
  try {
    _validationResult(req).throw();
    const { body } = req;
    const { prodId } = body;

    // console.log("da vao day");
    // console.log(prodId);

    const data = await ProductsModel.findOne({ _id: prodId });

    _helper.responseSuccess({ req, res, data });
  } catch (error) {
    return _helper.responseError({ req, res, error: error });
  }
};

/**
 * Update PRODUCTS
 * @param req
 * @param res
 * @param io
 * @returns {Promise<*>}
 */
const update = async (req, res, io) => {
  try {
    _validationResult(req).throw();
    const { body } = req;
    const { name, description, price, category, prodId } = body;

    const data = await ProductsModel.findByIdAndUpdate(prodId, {
      name,
      description,
      price,
      category,
    });

    _helper.responseSuccess({ req, res, data });
  } catch (error) {
    return _helper.responseError({ req, res, error: error });
  }
};

/**
 * Update PRODUCTS
 * @param req
 * @param res
 * @param io
 * @returns {Promise<*>}
 */
const disable = async (req, res, io) => {
  try {
    _validationResult(req).throw();
    const { body } = req;
    const { prodId } = body;

    const data = await ProductsModel.findByIdAndUpdate(prodId, {
      status: _const.PRODUCTS.STATUS.DISABLE,
    });

    _helper.responseSuccess({ req, res, data });
  } catch (error) {
    return _helper.responseError({ req, res, error: error });
  }
};
/**
 * Update PRODUCTS
 * @param req
 * @param res
 * @param io
 * @returns {Promise<*>}
 */
const deleteCate = async (req, res, io) => {
  try {
    _validationResult(req).throw();
    const { body } = req;
    const { prodId } = body;

    const data = await ProductsModel.findByIdAndUpdate(prodId, {
      status: _const.PRODUCTS.STATUS.DELETE,
    });

    _helper.responseSuccess({ req, res, data });
  } catch (error) {
    return _helper.responseError({ req, res, error: error });
  }
};

module.exports = {
  create,
  getAll,
  details,
  update,
  disable,
  deleteCate,
};
