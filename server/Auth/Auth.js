const jwt = require('jsonwebtoken')
const { auth } = require('express-oauth2-jwt-bearer')

const Validation = async (req, res, next) => {
    try {
        const auth = req.headers["authorization"]
        // console.log("auth",auth)
        if (!auth) {
            return res.status(400).send("Please Provide Autherisation")
        }
        const token = auth.split(" ")[1]
        console.log('token', token);
        try {
            // console.log(token)
            const decode = jwt.verify(token, "mynameiskaran")
            // console.log("jwt token", token)
            req.user = decode
            // console.log("decoded",decode)
            return next()
        }
        catch (err) {
            console.log("jwt token fail")
        }

        try {
            // console.log('auth', token)
            const decode = auth({
                audience: 'aniketgoyal791@gmail.com',
                issuerBaseURL: `https://dev-bhzywqcftmwjth02.us.auth0.com/`,
            })
            next()
        } catch (error) {
            res.status(500).json({ error: "Auth token error" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
    }


module.exports = { Validation }