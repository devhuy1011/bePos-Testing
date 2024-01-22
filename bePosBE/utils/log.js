const dayJS = require(`dayjs`);
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

const fs = require("fs");
dayJS.extend(utc);
dayJS.extend(timezone);
/**
 * Ghi lại log
 * @param message: Thông điệp
 * @param data: object (tùy chọn)
 */
function log(message, data = "") {
  if (!message) return;
  console.log(
    dayJS().tz(_const.SYSTEM.TIMEZONE).format(`🔸 HH:mm:ss.SSS DD/MM/YY `) +
      message,
    data
  );
  // const errorLogPath = "error.log";
  // fs.appendFile(
  //   errorLogPath,
  //   `${new Date().toISOString()}: ${message}\n`,
  //   (err) => {
  //     if (err) {
  //       console.error("Failed to log error to file:", err);
  //     }
  //   }
  // );
}

/**
 * Ghi lại lỗi
 * @param message: Thông điệp
 * @param error: Lỗi (tùy chọn)
 * @param errorDetail: Chi tiết lỗi
 */
function err(message = "", error, errorDetail) {
  try {
    const errorLogPath = "error.log";
    if (error?.errors) message += ` | ` + JSON.stringify(error.errors);
    else if (error?.stack) message += ` | ` + error.stack.toString();
    if (errorDetail) message += ` | ` + JSON.stringify(errorDetail);

    // console.log(
    //   dayJS().tz(_const.SYSTEM.TIMEZONE).format(`❌ HH:mm:ss.SSS DD/MM/YY `) +
    //     message
    // );
    // Ghi lỗi vào tệp văn bản
    fs.appendFile(
      errorLogPath,
      `${new Date().toISOString()}: ${message}\n`,
      (err) => {
        if (err) {
          console.error("Failed to log error to file:", err);
        }
      }
    );
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  log,
  err,
};
