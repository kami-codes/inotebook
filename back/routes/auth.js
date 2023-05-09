const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/getuser')


const jwt_sceret = 'thisIsMySecert'
// ROUTE 1 -- creating the user
router.post('/create-user', [
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 }),
    body('email').isEmail()
  ], async (req, res) => {
    let success = false
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, error: errors.array() })
    }
    try {
      let user = await User.findOne({ email: req.body.email })
      if (user) {
        return res.status(400).json({ success, error: 'A user with this email already exists' })
      }
      const salt = await bcrypt.genSalt(10)
      const secPass = await bcrypt.hash(req.body.password, salt)
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email
      })
      const data = {
        user: {
          id: user.id
        }
      }
      success = true
      const authToken = jwt.sign(data, jwt_sceret)
      res.send({ success, authToken })
    } catch (error) {
      console.error(error)
      res.status(500).send({ success, error: 'Something went wrong' })
    }
  })
  
// ROUTE 2 --> getting user logged in (/auth/api/login) - no log in required   
router.post('/login', [
    body('password').exists(),
    body('email').isEmail()
], async (req, res) => {

    let success = true;

    //if user entered anything wrong then show bad request
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        success = false
        return res.status(400).json({success, error: errors.array() })
        
    }

    const { password, email } = req.body

    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            success = false
            res.status(400).json({success, error: 'please enter correct details' })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)

        if (!passwordCompare) {
            success = false
            res.status(400).json({success, error: 'please enter correct details' })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const name1 = user.name
        success = true
        const authToken = jwt.sign(data, jwt_sceret)
        console.log(authToken)
        // res.send(user)
        res.send({success ,authToken, name1})

    } catch (error) {
        success = false
        res.status(500).send(success,'some error occured')
        console.log(error)
    }

})

// ROUTE 3 --> getting user details from auth token in (/auth/api/getuser) -  log in required

router.post('/getuser',fetchuser, async (req, res) => {
     try {
        const userid = req.user.id
        const user = await User.findById(userid).select('-password')
        res.send(user)
     } catch (error) {
        res.status(500).send('some error occured')
        console.log(error)
    }
})
module.exports = router