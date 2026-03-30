const Yup = require("yup");

const formSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .max(28, "Username too long")
    .min(6, "Username too short"),
  password: Yup.string()
    .required("Password is required")
    .max(28, "Password too long")
    .min(6, "Password too short"),
});

const friendSchema = Yup.object({
  friendsName: Yup.string()
    .required("Username is required")
    .max(28, "Username too long")
    .min(6, "Username too short"),
});

module.exports = { formSchema, friendSchema };
