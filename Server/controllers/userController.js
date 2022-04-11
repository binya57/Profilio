//signUp, signIn
const bcrypt = require("bcrypt");

const users = [];

const signUp = async (req, res) => {
  const { email, password } = req.body;
  if (users.find((user) => user.email === email))
    return res
      .status(409)
      .send("You already have an account, sign in to continue");
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { email, password: hashedPassword };
    users.push(newUser);
    res.status(201).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};

const logIn = async (req, res) => {
  const user = users.find((user) => user.email === req.body.email);

  if (!user) return res.status(403).send("Not Authorized");

  try {
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) return res.send(true);
    else res.status(403).send("Not Authorized");
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};

module.exports = { signUp, logIn };
