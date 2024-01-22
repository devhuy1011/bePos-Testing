module.exports = {
  STATUS: {
    SUCCESS: `SUCCESS`,
    ERROR: `ERROR`,
  },
  MESSAGE: {
    SUCCESS: `success`,
    ERROR: `error`,
  },

  SYSTEM: {
    AUTH_INVALID: {
      errorCode: 401,
      message: `auth invalid`,
      sub: `Token không hợp lệ`,
    },

    NOT_FOUND: {
      errorCode: 404,
      message: `url not found`,
      sub: `Đường dẫn API không hợp lệ`,
    },
    BODY_INVALID: {
      errorCode: 405,
      message: `body invalid`,
      sub: `Tham số truyền lên không hợp lệ`,
    },
  },
};
