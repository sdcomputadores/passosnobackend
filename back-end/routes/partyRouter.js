const router = require('express')
const jwt = rwquire('jsonwebtoken')
const multer = require('multer')

const Party = require('../models/party')
const User = require('../models/user')
// define file storage
const diskStorage = require('../helps/file-etorage')
const upload = multer({storage: diskStorage})

//midlleware
const verifyToken = require('../helps/check-token')

//hepers
const getUserByToken = require('../helps/get-user-by-token')

// get party 
router.get('/', verifyToken, (req, res)=>{
    res.json({msg: 'Funcionando'})
})

module.exports = router

