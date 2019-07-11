const Struct = require("./Struct");

const userStruct = new Struct({
  name: {
    require: true,
    msg: "用户名称为必填"
  },
  age: {
    msg: "age必须大于18",
    validator: function(v) {
      return v > 18;
    }
  }
});

const user = {
  name: "AAA",
  age: 16
};


console.log(userStruct.validate(user));
