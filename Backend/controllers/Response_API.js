const bcrypt = require('bcrypt')
const LInksData = require('../models/LinksData');


const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 7);
};



exports.Response_POST_API = async (req, res) => {


    const { originalURL, password, expiryDate } = req.body;


    if (!originalURL) {
        return res.status(400).json({ msg: "Enter URL first " })
    }


    let Shortcode;
    let RegisteredURL = true;


    while (RegisteredURL) {
        Shortcode = generateRandomId();
       RegisteredURL = await LInksData.findOne({ randomId: Shortcode });
    }

    const hashedPassword = password ?  await bcrypt.hash(password, 10) : null;
    const userId = "67f123abc456def789";

    const newLInks = await LinksData.create({
        usedBy: userId,
        originalLink: originalURL,
        randomId: Shortcode,
        password:  hashedPassword,
        ExpiryDate: expiryDate ? new Date(expiryDate) : null,
        status: "ACTIVE"
    })

    res.status(201).json({
        ShortURL: `http://localhost:5000/${Shortcode}`
    })

}