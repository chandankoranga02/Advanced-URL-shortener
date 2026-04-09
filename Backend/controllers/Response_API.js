const { nanoid } = require("nanoid");
const bcrypt = require('bcrypt')
const LinksData = require('../models/LinksData');
const mongoose =  require('mongoose')



exports.Response_POST_API = async (req, res) => {


    const { originalURL, Password, expiryDate } = req.body;
    


    if (!originalURL) {
        return res.status(400).json({ msg: "Enter URL first " })
    }

    let Shortcode;
    let RegisteredURL = true;


    while (RegisteredURL) {
        Shortcode = nanoid(7); 
       RegisteredURL = await LinksData.findOne({ randomId: Shortcode });
    }

    const hashedPassword = Password ?  await bcrypt.hash(Password, 10) : null;
  //   const userId = "67f123abc456def789"; temporary user id fro te



    const newLInks = await LinksData.create({
        usedBy: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
        originalLink: originalURL,
        randomId: Shortcode,
        password:  hashedPassword,
        ExpiryDate: expiryDate ? new Date(expiryDate) : null,
        status: "ACTIVE"
    })

    newLInks.save() ;



    res.status(201).json({
        ShortURL: `http://localhost:5000/${Shortcode}`
    })

}