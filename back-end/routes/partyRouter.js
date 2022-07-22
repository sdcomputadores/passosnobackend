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

// create new party
router.post('/', verifyToken,upload.fields([{nome: 'photos'}]),async (req, res)=>{
    
    //req data
    const title = req.body.title
    const description = req.body.descrition
    const partyDate = req.body.party_date

    let files = []

    if(req.file){
        file = req.files.photos
    }

    if(title == "null" || description == 'null'|| partyDate == 'null' ){
        return res.staus(400).json({ error: "Preencha ao menso descrição ou data! "})
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
            return res.staus(400).json({ error})
        }


    }catch (err){

        return res.staus(400).json({ error: "Acesso negado "})
    }




})

module.exports = router

