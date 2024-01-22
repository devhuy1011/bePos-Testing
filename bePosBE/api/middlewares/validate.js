const { body } = require("express-validator");

const validate = (endPoint) => {
  try {
    switch (endPoint) {
      case `products/create`:
        return [
          // body("name").custom((value) => {
          //   if (value !== value.toUpperCase()) {
          //     throw new Error("Tên products phải viết hoa toàn bộ");
          //   }
          //   return true; // Giá trị hợp lệ
          // }),
        ];
      case `products/get-all`:
      case `products/get-admin`:
        return [];
      case `products/details`:
      case `products/disable`:
      case `products/delete-cate`:
      case `products/delete-prompts`:
        return [
          body("prodId").custom((value) => {
            console.log(value);
            return _mongoose.Types.ObjectId(value);
          }),
        ];
      case `products/update`:
        return [
          body("prodId").custom((value) => {
            return _mongoose.Types.ObjectId(value);
          }),
        ];

      default:
        console.log(endPoint + ` not setting validate`);
        return [];
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = validate;
