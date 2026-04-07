exports.get_logges_user = (req, res) => {
    res.json({
        fullName: req.user.fullName,
        email: req.user.email,
        userId: req.user._id
    });
}