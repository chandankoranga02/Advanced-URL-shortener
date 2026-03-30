const Links_data = require('../models/LinksData')
const ClicksLogs = require('../models/CicksLogs')



exports.Redirect_window = async (req, res) => {
    const { shortcode } = req.params;

    const link = await Links_data.findOne({ randomId: shortcode });

    if (!link) {
        return res.status(404).json({ msg: "Link not found " })
    }

    if (link.ExpiryDate && link.ExpiryDate < new Date()) {
        return res.status(400).json({ msg: "Link expired" })
    }

    if (link.password) {
        return res.redirect(`http://localhost:3000/verify/${shortcode}`);
    }

    link.clicks += 1;
    await link.save();

    await ClicksLogs.create({
        randomID: shortcode,
        ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        deviceInfo: req.headers['user-agent']
    },
        { timestamps: true }
    );


    res.redirect(link.originalLink)

}