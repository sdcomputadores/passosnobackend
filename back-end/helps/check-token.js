const jwt = require('jsonwebtoken')

//middware to valid token 
const checkToken = (req, res, next) => {
    const token = req.header("auth-token")

    if(!token){
        return res.status(401).json({error: "Acesso negado"})

    }   try {
        const verified = jwt.verifi(token, "nossosecret")
        req.user = verify
        next() //continua
    } catch (err){
        res.status(400).json({error: "O token não é válido"})

    }
     
}

module.export = checkToken