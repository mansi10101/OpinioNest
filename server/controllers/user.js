const UserModel = require("../models/user");
var bcrypt = require("bcrypt");

var BCRYPT_SALT_ROUNDS = 12;

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;
  const userExist = await UserModel.findOne({ email: email });
  if (userExist) {
    return res.status(403).json({
      error: "Email already exists.",
    });
  }
  const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  const user = await UserModel.create({
    email,
    password: hashedPassword,
    name,
  });
  res.status(200).json(user);
};

const authenticateUser = async (req, res) => {
  const { email, password } = req.body;
  const userExist = await UserModel.findOne({ email: email });
  if (!userExist) {
    return res.status(403).json({
      error: "Incorrect username or password.",
    });
  }

  const samePassword = await bcrypt.compare(password, userExist.password);

  if (!samePassword) {
    return res.status(401).json({ error: "Incorrect username or password." });
  }
  res.status(200).json(userExist);
};

const googleauth = async (req, res) => {
  const { email, name, image } = req.body;
  const userExist = await UserModel.findOne({ email: email });
  if (userExist) {
    return res.status(200).json(userExist);
  } else {
    const user = await UserModel.create({
      email,
      image,
      name,
    });
    res.status(200).json(user);
  }
};

module.exports = {
  registerUser,
  authenticateUser,
  googleauth,
};
