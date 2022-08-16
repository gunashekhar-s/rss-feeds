const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator');
const isEmail = require("validator/lib/isEmail")


const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "email is required"],
        maxlength: 128,
        lowercase: true,
        trim: true,
        unique: true,
        validate: {
            validator: (value) => {
                return isEmail(value)
            },
            message: () => {
                return "invalid email address"
            }
        }
    },

    password: {
        type: String,
        required: [true, "password is requried"],
        minlength: [8, 'password must be minimum 8 characters long'],
        maxlength: [128, 'password should not be more than 128 characters long']
    }

}, { timestamps: true })


// encrypting password before save using pre hooks
userSchema.pre('save', function (next) {
    const user = this
    bcrypt.genSalt(10)
        .then((salt) => {
            bcrypt.hash(user.password, salt)
                .then((hash) => {
                    user.password = hash
                    next()
                })
        })
})

// instance methods
userSchema.methods.generateToken = async function (password) {
    const user = this
    const match = await bcrypt.compare(password, user.password)
    if (match) {
        const tokenData = {
            _id: user._id,
        }
        // creating JWT TOKEN
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

        return Promise.resolve({ token })
    } else {
        return Promise.reject({ error: 'Invalid login credentials' })
    }
}


userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema)
module.exports = User