const SavingData = require('../models/FormData')
const bcrypt = require('bcrypt')

exports.SignUP_post = async (req, res) => {
  const { fullName, email, password } = req.body;
  const IP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (!fullName || !email || !password) { return res.status(400).json({ msg: "All fields required" }) }
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingEmail = await SavingData.findOne({ email: email })
  if (existingEmail) { return res.status(400).json({ msg: "user with this email already exist" }) }


  const user = new SavingData({
    fullName: fullName,
    email: email,
    password: hashedPassword,
    ipaddres: IP,
    DeviceInfo: req.headers['user-agent']
  })


  if (existingEmail) { return res.status(400).json({ msg: "user with this email already exist" }) }

  await user.save();

  res.status(200).send(" user created successfully ")

}
