const express = require('express')
const router = express.Router()
const User = require("../User")
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtsec = "Mynameisehtashamakmalandiamamernstackdeveloper"

router.post('/createuser', [
    body('email', 'incorrect email').isEmail(),
    body("name", 'incorrect name').isLength({ min: 5 }),
    body("password", 'incorrect password').isLength({ min: 5 })]

    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

          const salt = await bcrypt.genSalt(10);
          let securepass = await bcrypt.hash(req.body.password, salt)
        try {

            await User.create({

                name: req.body.name,
                password: securepass,
                email: req.body.email,
                location: req.body.location
            })

            res.json({ success: true });

        }
        catch (error) {
            console.log(error);
            res.json({ success: false });
        }




    })


router.post('/login', [
    body('email', 'incorrect email').isEmail(),
    body("password", 'incorrect password').isLength({ min: 5 })]

    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;

        try {

            let userdata = await User.findOne({ email });
            if (!userdata) {
                return res.status(400).json({ errors: "Try logging with Correct Data" })
            }
            // res.json({ success: true });

            const pcom = await bcrypt.compare(req.body.password,userdata.password)
            if (!pcom) {
                return res.status(400).json({ errors: "Try logging with Correct Data" })
            }
const data = {
    user:{
        id:userdata.id
    }
}
const authToken = jwt.sign(data,jwtsec)
            return res.json({ success: true, authToken:authToken });

        }
        catch (error) {
            console.log(error);
            res.json({ success: false });
        }




    })

module.exports = router;