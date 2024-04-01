const jwt = require('jsonwebtoken')

const Validation = async (req, res, next) => {
    const auth = req.headers["authorization"]
    // console.log(auth)
    if (!auth) {
        return res.status(400).send("Please Provide Autherisation")
    }
    else {
        try {
            const token = auth.split(" ")[1]
            console.log(token)
            const decode = jwt.verify(token, "mynameiskaran")
            req.user = decode
            // console.log("decoded",decode)
            return next()
        }
        catch (err) {
            return res.status(400).send("Token failed")
        }
    }
}

module.exports = { Validation }