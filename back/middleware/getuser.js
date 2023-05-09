const jwt = require('jsonwebtoken')

const jwt_sceret = 'thisIsMySecert'

const fetchuser = (req, res, next)=>{
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error:"please authenticate using a valid token"})
    }
    
    try {
         const data = jwt.verify(token, jwt_sceret)
         req.user = data.user
        
     } catch (error) {
        res.status(401).send({error:"please authenticate using a valid token"})
     }
    next()
}

module.exports = fetchuser