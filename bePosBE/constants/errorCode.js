module.exports = {
  USER: {
    AUTH_INVALID: {
      errorCode: 101,
      message: `Email already exists`,
      sub: `Email này đã tồn tại trong hệ thống`,
    },

    NOT_FOUND: {
      errorCode: 102,
      message: `account not found`,
      sub: `Không tìm thấy tài khoản`,
    },
    PASSWORD_INVALID: {
      errorCode: 103,
      message: `password is incorrect`,
      sub: `Mật khẩu hoặc tài khoản không đúng`,
    },
    ROLE_INVALID: {
      errorCode: 104,
      message: `Your role is invalid`,
      sub: `Tài khoản không có quyền`,
    },
  },
  AI_CHAT: {
    NOT_FOUND: {
      errorCode: 201,
      message: `account not found`,
      sub: `Không tìm thấy tài khoản`,
    },
  },
  PROMPTS: {
    NOT_FOUND: {
      errorCode: 301,
      message: `prompt not found`,
      sub: `Không tìm thấy prompts`,
    },
  },
  CATEGORIES: {
    EXIST: {
      errorCode: 401,
      message: `categories is exists`,
      sub: `Thể loại này đã tổn tại`,
    },
  },
  DALLE: {
    ERROR: {
      errorCode: 501,
      message: `error system trying again`,
      sub: `Lỗi hệ thống vui lòng thử lại sau`,
    },
  },
};
