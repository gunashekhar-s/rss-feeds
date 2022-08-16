const jwt = require("jsonwebtoken")

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
        res.status(401).json({ error: "Authentication token is missing" })
    } else {
        try {
            const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.token = tokenData
            next()

        } catch (err) {
            res.status(401).json({ error: err.message })
        }
    }
}


module.exports = authenticateUser