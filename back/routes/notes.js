const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/getuser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');


// ROUTE 1 -- getting users all notes (/auth/api/fetchallnotes)
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        res.status(500).send('some error occured')
        console.log(error)
    }
})


// ROUTE 2 -- adding notes correspondes to a users (/auth/api/addnote)
router.post('/addnote', fetchuser, [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 3 })
], async (req, res) => {

    const { title, description, tag, color } = req.body
    //if user entered anything wrong then show bad request
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }

    try {
        const note = new Note({
            title, description, tag, color, user: req.user.id
        })
        const savednote = await note.save()
        res.json(savednote)

    } catch (error) {
        res.status(500).send('some error occured')
        console.log(error)
    }
})

// ROUTE 3 -- updating note correspondes to a users (/notes/api/updatenote)

router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    
    try {
        
        const {title, description, tag} = req.body
    
        let newnote = {}
    
        if(title){newnote.title = title}
        if(description){newnote.description = description}
        if(tag){newnote.tag = tag}
    
        let note = await Note.findById(req.params.id)
    
        if(!note){
            res.status(404).send('not found')
        }
        if(note.user.toString() !== req.user.id){
            res.status(401).send('not allowed')
        }
    
        note = await Note.findByIdAndUpdate(req.params.id , {$set: newnote}, {new: true} )
        res.json(note)
        
    } catch (error) {
        res.status(500).send('some error occured')
        console.log(error)
    }

})


// ROUTE 4 -- deleting note correspondes to a users (/notes/api/deletenote)

router.delete('/deletenote/:id', fetchuser, async (req, res)=>{


    try {
            let note = await Note.findById(req.params.id)
        
            if(!note){
                res.status(404).send('not found')
            }
            if(note.user.toString() !== req.user.id){
                res.status(401).send('not allowed')
            }
        
            note = await Note.findByIdAndDelete(req.params.id )
            res.json({"success": "note deleted successfully"})
        
    } catch (error) {
        res.status(500).send('some error occured')
        console.log(error)
    }

})
module.exports = router