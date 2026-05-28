const login_logs = require("../models/Login_data");
const Login = require("../models/FormData");
const jwt = require("jsonwebtoken");
const { Oauth2Client } = require("../config/GoogleConfig");

exports.Google_Login = async (req, res) => {
  const { code } = req.body;
  const { tokens } = await Oauth2Client.getToken(code);
  Oauth2Client.setCredentials(tokens);

  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
  );
  const { email, name } = await response.json();

  const IP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const Device = req.headers["user-agent"];

  // for existing user
  const existing_user = await Login.findOne({ email: email });

  if (existing_user) {
    const token = jwt.sign(
      { id: existing_user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    const successfully_logedIn = new login_logs({
      LogedInBy: existing_user._id,
      IpAddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
      DeviceInfo: req.headers["user-agent"],
      status: "SUCCESS",
    });

    await successfully_logedIn.save();

    return res.status(200).json({ msg: "Login successful" });
  }

  // for new user

  const Newuser = await Login.create({
    fullName: name,
    email: email,
    provider: "google",
    ipaddres: IP,
    DeviceInfo: Device,
  });

  const token = jwt.sign({ id: Newuser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  return res.status(200).json({ msg: "Signup successful" });
};
