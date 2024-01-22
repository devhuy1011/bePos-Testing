const userModel = require(`../api/models/UserModel`);
const jwt = require(`jsonwebtoken`);

/**
 * Auth Supper Admin
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const authSupperAdmin = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization)
      return _helper.responseError({
        req,
        res,
        errorDetail: _res.SYSTEM.AUTH_INVALID,
      });

    let objVerify = jwt.verify(authorization, process.env.TOKEN_SECRET);

    if (!objVerify || !objVerify._id || !objVerify.userName) {
      return _helper.responseError({
        req,
        res,
        errorDetail: _res.SYSTEM.AUTH_INVALID,
      });
    }

    //Kiểm tra token còn trong redis không
    const keyRedis = _const.REDIS.USER_TOKEN_DASHBOARD(objVerify._id);
    let cacheRedis = await _redis.get(keyRedis);

    if (!cacheRedis || cacheRedis !== authorization) {
      return _helper.responseError({
        req,
        res,
        errorDetail: _res.SYSTEM.AUTH_INVALID,
      });
    }

    let userData = await userModel.findOne({
      _id: objVerify._id,
      status: _const.USER.STATUS.ACTIVE,
      userName: { $in: ["thanhthinh95@kiemsaphia.com"] },
    });

    if (!userData?.role?.includes(_const.USER.ROLE.ADMIN)) {
      return _helper.responseError({
        req,
        res,
        errorDetail: _res.SYSTEM.AUTH_INVALID,
      });
    }
    userData = JSON.parse(JSON.stringify(userData));

    delete userData.password;

    req.userData = userData;
    req.token = authorization;
    req.objVerify = objVerify;

    _log.log("User Admin", {
      originalUrl: req.originalUrl,
      fullName: userData.firstName + " " + userData.name,
      _id: userData._id,
    });

    next();
  } catch (e) {
    return _helper.responseError({
      req,
      res,
      errorDetail: _res.SYSTEM.AUTH_INVALID,
    });
  }
};

/**
 * AuthAdmin
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const authAdmin = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization)
      return _helper.responseError({
        req,
        res,
        errorDetail: _res.SYSTEM.AUTH_INVALID,
      });

    let objVerify = jwt.verify(authorization, process.env.TOKEN_SECRET);

    if (!objVerify || !objVerify._id || !objVerify.userName) {
      return _helper.responseError({
        req,
        res,
        errorDetail: _res.SYSTEM.AUTH_INVALID,
      });
    }

    //Kiểm tra token còn trong redis không
    const keyRedis = _const.REDIS.USER_TOKEN_DASHBOARD(objVerify._id);
    let cacheRedis = await _redis.get(keyRedis);

    if (!cacheRedis || cacheRedis !== authorization) {
      return _helper.responseError({
        req,
        res,
        errorDetail: _res.SYSTEM.AUTH_INVALID,
      });
    }

    let userData = await userModel.findOne({
      _id: objVerify._id,
      status: _const.USER.STATUS.ACTIVE,
    });

    if (!userData?.role?.includes(_const.USER.ROLE.ADMIN)) {
      return _helper.responseError({
        req,
        res,
        errorDetail: _res.SYSTEM.AUTH_INVALID,
      });
    }
    userData = JSON.parse(JSON.stringify(userData));

    delete userData.password;

    req.userData = userData;
    req.token = authorization;
    req.objVerify = objVerify;

    _log.log("User Admin", {
      originalUrl: req.originalUrl,
      fullName: userData.firstName + " " + userData.name,
      _id: userData._id,
    });

    next();
  } catch (e) {
    return _helper.responseError({
      req,
      res,
      errorDetail: _res.SYSTEM.AUTH_INVALID,
    });
  }
};

/**
 * Auth khi xem log
 * @param req
 * @param res
 * @param next
 */
const authLogging = (req, res, next) => {
  try {
    const { token } = req.query;
    if (!token || token !== _config.AWS.TOKEN_LOG)
      return _helper.responseError({
        req,
        res,
        errorDetail: _res.SYSTEM.AUTH_INVALID,
      });
    next();
  } catch (e) {
    return _helper.responseError({
      req,
      res,
      errorDetail: _res.SYSTEM.AUTH_INVALID,
    });
  }
};

/**
 * Auth tổng quan của cả hệ thống
 * @param req
 * @param res
 * @param next
 */
const authSystem = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization)
      return _helper.responseError({
        req,
        res,
        errorDetail: _res.SYSTEM.AUTH_INVALID,
      });

    let objVerify = jwt.verify(authorization, process.env.TOKEN_SECRET);

    if (!objVerify || !objVerify._id) {
      return _helper.responseError({
        req,
        res,
        errorDetail: _res.SYSTEM.AUTH_INVALID,
      });
    }

    req.objVerify = objVerify;
    next();
  } catch (e) {
    return _helper.responseError({
      req,
      res,
      errorDetail: _res.SYSTEM.AUTH_INVALID,
    });
  }
};

/**
 * Auth user cho socket
 * @returns {Promise<void>}
 */
const authSocketUser = async (token) => {
  try {
    if (!token) return;

    let objVerify = jwt.verify(token, process.env.TOKEN_SECRET);
    if (
      !objVerify ||
      !objVerify._id ||
      !objVerify.firstName ||
      !objVerify.lastName
    )
      return;

    let userData = await userModel.findOne({
      _id: _mongoose.Types.ObjectId(objVerify._id),
      // active: _const.USER.STATUS.ACTIVE,
    });

    if (!userData) return;
    userData = JSON.parse(JSON.stringify(userData));

    delete userData.password;
    return userData;
  } catch (e) {
    throw e;
  }
};
module.exports = {
  authSystem,
  authAdmin,
  authSupperAdmin,
  authLogging,
  authSocketUser,
};
