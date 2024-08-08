
const User = require('../models/userlogin'); // Assuming you have a User model
const jwt = require('jsonwebtoken')
// User signup
exports.userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "Email already Exist" });
    }
    const user = new User({ name, email, password });
    await user.save();
    // const payload = {
    //   id: user._id,
    //   email: user.email,
    // }

    // const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    //   expiresIn: "36000m",
    // })
    return res.status(201).json({ message: "User created successfully", user: user });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};


// User signin
exports.userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Enter Email" });
    }
    if (!password) {
      return res.status(400).json({ message: "Enter Password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found" })
    }
    if (email == user.email && password == user.password) {
      const payload = {
        id: user._id,
        email: user.email,
      }

      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
      })

      return res.json({ message: "login success", user, accessToken })
    }
    else {
      return res.status(400).json({ message: "Unsuccessfull" })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error signing in' });
  }

};
exports.getUser = async (req, res) => {
  const user = req.user;
  const userdata = await User.find({ _id: user.id });
  console.log(userdata);
  if (userdata) {
    return res.status(200).json(userdata);
  }
}

