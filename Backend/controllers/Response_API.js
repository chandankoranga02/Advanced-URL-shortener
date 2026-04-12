const { nanoid } = require("nanoid");
const bcrypt = require('bcrypt')
const LinksData = require('../models/LinksData');
const mongoose =  require('mongoose')
const QRCode =  require('qrcode')



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


     await LinksData.create({
        usedBy: req.user._id,
        originalLink: originalURL,
        randomId: Shortcode,
        password:  hashedPassword,
        ExpiryDate: expiryDate ? new Date(expiryDate) : null,
        status: "ACTIVE"
    })


    const qrcode =  await QRCode.toDataURL(`http://localhost:5000/${Shortcode}`);

    res.status(201).json({
        ShortURL: `http://localhost:5000/${Shortcode}` ,
        qrcode : qrcode 
    })

}