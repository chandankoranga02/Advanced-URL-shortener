const Links_data = require('../models/LinksData')
const ClicksLogs = require('../models/CicksLogs')



exports.Redirect_window = async (req, res) => {
    const { Shortcode } = req.params;

    const link = await Links_data.findOne({ randomId: Shortcode });

    if (!link) {
       return res.redirect("http://localhost:3000/error?type=notfound");
    }

    if (link.ExpiryDate && link.ExpiryDate < new Date()) {
       return res.redirect("http://localhost:3000/error?type=expired");
    }


    if (link.password) {
        return res.redirect(`http://localhost:3000/verify/${Shortcode}`);
    }


    link.clicks += 1;
    await link.save();


    await ClicksLogs.create({
        randomID: Shortcode,
        ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        deviceInfo: req.headers['user-agent']
    }

    );

    res.redirect(link.originalLink)


}