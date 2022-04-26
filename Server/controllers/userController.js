//signUp, signIn
const bcrypt = require("bcrypt");
const User = require("../models/User");

const signUp = async (req, res) => {
  const { userName: _userName, passWord: _passWord } = req.body;
  const userNameExists = await User.findOne({ userName: _userName });
  if (userNameExists)
    return res
      .status(409)
      .send({ status: "Failed", msg: "This User Name Already exists" });
  try {
    const hashedPassword = await bcrypt.hash(_passWord, 10);
    const newUser = new User({ ...req.body, passWord: hashedPassword });
    await newUser.save();
    res.status(201).send({ authorized: true });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};

const logIn = async (req, res) => {
  const { userName: _userName, passWord: _passWord } = req.body;
  console.log(_userName, _passWord);
  const user = await User.findOne({ userName: _userName });
  if (!user) return res.status(403).send({ authorized: false });
  try {
    const match = await bcrypt.compare(_passWord, user.passWord);
    if (match)
      return res.send({
        userName: user.userName,
        id: user.id,
        userProfileId: user.userProfileId,
        authorized: true,
      });
    else res.status(403).send({ authorized: false });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};

module.exports = { signUp, logIn };
