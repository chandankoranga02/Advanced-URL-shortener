const mongoose = require('mongoose')


const formDataSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    provider : {
      type: String,
      enum : ["google", "local"],
      default : "local"
    },

    password: {
        type: String,
        required: ()=>{
            return this.provider === "local";  // function will return either true or false
        },
        minlength: 6
    },

    ipaddres: {
        type: String
    },

    DeviceInfo: {
        type: String

    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("SignUpFormData", formDataSchema);