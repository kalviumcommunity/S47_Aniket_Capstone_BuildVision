const jwt = require('jsonwebtoken')

const { auth } = require('express-oauth2-jwt-bearer')

const Validation = async (req, res, next) => {
    try {
        const authenticate = req.headers["authorization"]
        // console.log("auth",req.headers.authorization)
        
        if (!authenticate) {
            return res.status(400).send("Please Provide Autherisation")
        }
        const token = authenticate
        // console.log('token', token);
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
            // console.log("Auth")
            const checkJwt = auth({
                audience: 'http://BuildVision',
                issuerBaseURL: `https://dev-bhzywqcftmwjth02.us.auth0.com/`,
            })
            // console.log('decode',checkJwt)
            next()
        } catch (error) {
            return res.status(500).json({ error: "Auth token error" })
        }
    } catch (error) {
        return res.status(500).json({ error: "token failed" })
    }
}


module.exports = { Validation }