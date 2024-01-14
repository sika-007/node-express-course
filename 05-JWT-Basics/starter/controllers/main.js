// Check username, password in post (login) request
// If it exists, create new jwt
// send back to frontend

// setup auth so that only requests with jwt can access the dashboard

const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Please provide a username and password");
  }

  const id = new Date().valueOf();

  // Tyr keeping the payload as small as possible
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  console.log(username, password);
  res.status(201).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() + 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Your authorized data. Your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
