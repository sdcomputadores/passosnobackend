const router = require('express').Router()
const jwt = rwquire('jsonwebtoken')
const multer = require('multer')

const Party = require('../models/party')
const User = require('../models/user')
// define file storage
const diskStorage = require('../helps/file-storage')
const upload = multer({storage: diskStorage})

//midlleware
const verifyToken = require('../helps/check-token')

//hepers
const getUserByToken = require('../helps/get-user-by-token')

// create new party
router.post('/', verifyToken,upload.fields([{nome: 'photos'}]),async (req, res)=>{
    
    //req data
    const title = req.body.title
    const description = req.body.descrition
    const partyDate = req.body.party_date

    let files = []

    if(req.files){
        files = req.files.photos
    }

    if(title == "null" || description == 'null'|| partyDate == 'null' ){
        return res.status(400).json({ error: "Preencha ao menso descrição ou data! "})
    }

    //verify token 
    const token = req.header('auth-token')
    const userByToken = await getUserByToken(token)
    const userId = userByToken._id.toSting()
    try{
        const user = await User.findOne({_id: userId})
        let photos =  [ ]

        // creat photo array with path

        if(files && files.length > 0 ){
            files.forEach((photo, i ) => {
                photos[i] = photo.path
            })
        }
        const party = new Party({
            title: title,
            descrition: descrition,
            partyDate: partyDate,
            photos: req.body.privacy,
            userId: iser_id.toString()

        })
        try{
            const newParty = await party.save()
            res.json({error: null, msg: "Evento criado com suceso!", data: newParty})
        }catch(err){
            return res.status(400).json({ error})
        }


    }catch (err){

        return res.status(400).json({ error: "Acesso negado "})
    }




})

router.get("/", async (req, res) => {
    try{
        const parties = await Party.find({privact: false}).sort ([[" id", -1]])
        res.json({error: null, parties: parties})
    }catch (err) {
        return res.status(400).json({ error: "Acesso negado" })
    }
})


 // get all public parties
router.get('/all', async (req, res) => {
     try{
        const parties = await Party.find({privacy: false}).sort([['_id', -1]])
     
    }catch (err) {
        return res.status(400).json({ error })
     }
})

// get all user parties
router.get("/userparties", verifyToken, async ( req, res) => {
    try{
        const token = req.header('auth-token')

        const user = await getUserByToken(token)

        const userId = user._id.toSting()

        const parties = await Party.find({iserId: userId})
        res.json({error: null, parties: parties})

    }catch (error){
        return res.status(400).json({error}) 
    }
})


 
module.exports = router

