const mongoose = require('mongoose')

const clickLogsSchema = new mongoose.Schema({

  linkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LinksData",
    required: true,
    index: true
  },

  ipAddress: String,

  deviceInfo: String

}, {
  timestamps: true
});

module.exports = mongoose.model("ClicksLogs", clickLogsSchema)