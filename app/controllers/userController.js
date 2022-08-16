const User = require("../models/user")

const userController = {}

userController.register = (req, res) => {
    const body = req.body

    User.find({ email: body.email })
        .then((user) => {
            if (user.length === 0) {
                const newUser = new User(body)
                newUser.save()
                    .then((user) => {
                        res.status(200).send({ message: "registered" })
                    })
                    .catch((err) => {
                        res.json(err)
                    })
            } else {
                res.json({ error: "email already exists" })
            }
        })

}

userController.login = (req, res) => {

    const body = req.body
    User.findOne({ email: body.email })
        .then((user) => {
            if (!user) {
                res.json({ error: 'Invalid login credentials' })
            } else {
                return user.generateToken(body.password)
            }
        })
        .then((token) => {
            res.json(token)
        })
        .catch((err) => {
            res.json(err)
        })
}


module.exports = userController