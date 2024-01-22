const dayJS = require(`dayjs`);

/**
 * Mã hóa dữ liệu trước khi gửi về client
 * @param req
 * @param data
 * @returns {*}
 */
const endCodeData = (req, data) => {
  try {
    return data;
    // if (process.env.NODE_ENV === 'development') return data;
    // let key = req.headers.hash_key;
    // return crypto_js.AES.encrypt(JSON.stringify(data), key).toString();
  } catch (e) {
    throw e;
  }
};

/**
 * response responseError
 * @param req
 * @param res
 * @param errorCode
 * @param data
 * @param message
 * @returns {*}
 */
const responseError = ({
  req,
  res,
  error = {},
  message = _res.MESSAGE.ERROR,
  errorDetail,
}) => {
  try {
    _log.err(message, error, errorDetail);

    let errorCode = 403;
    if (error.errors) {
      //Body invalid
      error = error.errors;
      errorCode = _res.SYSTEM.BODY_INVALID.errorCode;
      message = _res.SYSTEM.BODY_INVALID.message;
    }
    if (error.stack) error = error.stack.toString();

    return res.status(200).send({
      status: _res.STATUS.ERROR,
      message: errorDetail ? errorDetail.message : message.toString(),
      errorCode: errorDetail ? errorDetail.errorCode : errorCode,
      error: endCodeData(req, error),
    });
  } catch (e) {
    throw e;
  }
};

/**
 * response responseSuccess
 * @param req
 * @param res
 * @param data
 * @param message
 * @returns {*}
 */
const responseSuccess = ({
  req,
  res,
  data = {},
  message = _res.MESSAGE.SUCCESS,
}) => {
  try {
    // _log.log(message, process.env.NODE_ENV === `development` ? data : ``);

    return res.status(200).json({
      status: _res.STATUS.SUCCESS,
      message,
      data: endCodeData(req, data),
    });
  } catch (e) {
    throw e;
  }
};

/**
 * Push thông điệp socket về app theo userId
 * @param userId
 * @param event
 * @param data
 */
const emitEventToUser = (userId, event, data = {}) => {
  try {
    let io = global._io;

    if (io.sockets.adapter.rooms[`roomAppSocket`]) {
      let socketIds = io.sockets.adapter.rooms[`roomAppSocket`].sockets;
      let clientSocketId = null;

      for (let socketId in socketIds) {
        let itemSocket = io.sockets.sockets[socketId];
        if (
          itemSocket &&
          itemSocket.type_user &&
          itemSocket.user_id &&
          itemSocket.type_user === `APP ANDROID` &&
          itemSocket.user_id === userId
        ) {
          clientSocketId = socketId;
          break;
        }
      }

      if (clientSocketId && event) {
        io.to(clientSocketId).emit(event, data);
        _log.log(`socketId: ` + clientSocketId + " " + event);
      }
    }
  } catch (e) {
    _log.err(`emit_event_to_user: ` + e);
  }
};

const randomOTP = (lengthNumber = 6) => {
  try {
    let valueOTP = "";

    while (lengthNumber > 0) {
      valueOTP += Math.floor(Math.random() * 9) + 1;
      lengthNumber--;
    }
    return valueOTP;
  } catch (e) {
    throw e;
  }
};

const randomString = (length = 15) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

/**
 * Loại bỏ dấu của tiếng việt
 * @param str
 * @returns {string}
 */
const removeVietnameseTones = (str = "") => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ|Ð/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư

  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );

  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  return str;
};

/**
 * Tạo mã tự tăng
 * @param code
 * @param prefix tiền tố phía trước
 * @param length độ dài
 * @returns {string}
 */
const genCodeAuto = (code = 1, prefix, length = 5) => {
  const lengthCode = code.toString().length;
  if (lengthCode > length)
    return (prefix ? prefix : new dayJS().format("YYYYMM")) + code.toString();
  let index = 0;
  while (index < length - lengthCode) {
    code = "0" + code;
    index++;
  }

  return (prefix ? prefix : new dayJS().format("YYYYMM")) + code;
};

/**
 * Làm tròn tiền tệ
 * @param money
 * @param number
 * @returns {number}
 */
const roundMoney = (money = 0, number = 2) => {
  return Number(money.toFixed(number));
};

/**
 * Chuyển đổi định dạng tiền tệ
 * @param money
 * @param unit
 * @returns {string}
 */
const formatMoney = (money = 0, unit = ` VNĐ`) => {
  return (money + unit).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

/**
 * Push url file về client cuối cùng
 * @param roomUser
 * @param urlFile
 */
const pushLastSocket = ({ roomUser, urlFile }) => {
  try {
    //lấy ra client cuối cùng connect socket để gửi urlFile
    let lastSocketId = [
      ...(_io?.sockets?.adapter?.rooms?.get(roomUser) || []),
    ]?.pop();
    if (lastSocketId)
      _io.to(lastSocketId).emit(_const.SOCKET.EVENT.DOWNLOAD_FILE, {
        urlFile,
      });
  } catch (e) {
    _log.err(`pushLastSocket`, e);
  }
};

/**
 * Format phone number
 * @param phoneNumber
 * @returns {string}
 */
function formatPhoneNumber(phoneNumber) {
  // Xóa toàn bộ khoảng trắng trong số điện thoại
  const trimmed = phoneNumber.replace(/\s/g, "");

  // Kiểm tra nếu số điện thoại đã có số 0 ở đầu thì bỏ qua
  if (trimmed.startsWith("0")) {
    return trimmed;
  }

  // Thêm số 0 vào đầu số điện thoại
  const formatted = "0" + trimmed;

  return formatted;
}

module.exports = {
  endCodeData,
  responseError,
  responseSuccess,
  randomOTP,
  randomString,
  removeVietnameseTones,
  genCodeAuto,
  roundMoney,
  formatMoney,
  emitEventToUser,
  pushLastSocket,
  formatPhoneNumber,
};
